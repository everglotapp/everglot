<script lang="ts">
    import { onDestroy } from "svelte"

    import type {
        IAgoraRTC,
        IAgoraRTCClient,
        IMicrophoneAudioTrack,
        IRemoteAudioTrack,
    } from "agora-rtc-sdk-ng"

    let AgoraRTC: IAgoraRTC
    const AGORA_APP_ID = "38aefcc1e5254b578fb65665fe227ed5"
    const AGORA_TOKEN =
        "00638aefcc1e5254b578fb65665fe227ed5IAAu6G2JERjs8k1pO9qdwnJj/dftw+qDqN/x3ZtIhOa6dAx+f9gAAAAAEABZxLUYcUKpYAEAAQBxQqlg"

    let outgoing: IMicrophoneAudioTrack | undefined
    export let incoming: IRemoteAudioTrack[] = []

    let client: IAgoraRTCClient | undefined

    $: inCall = typeof outgoing !== "undefined"

    export async function init() {
        if (typeof window === "undefined") {
            return
        }

        if (!AgoraRTC) {
            // @ts-ignore
            AgoraRTC = await import("agora-rtc-sdk-ng")
        }

        client = AgoraRTC.createClient({
            mode: "rtc",
            codec: "vp8",
        })
    }

    export async function joinRoom(
        roomId: string,
        userId: string
    ): Promise<boolean> {
        if (!client) {
            throw new Error("Not initialized")
        }

        if (outgoing) {
            console.log("Failed to join call: already in call")
            return false
        }

        client.on("user-published", async (user, mediaType) => {
            if (!client) {
                return
            }
            // Subscribe to a remote user.
            await client.subscribe(user, mediaType)
            console.log("subscribe success")

            // If the subscribed track is audio.
            if (mediaType === "audio") {
                // Get `RemoteAudioTrack` in the `user` object.
                const remoteAudioTrack = user.audioTrack
                if (!remoteAudioTrack) {
                    return
                }
                incoming = [...incoming, remoteAudioTrack]
                // Play the audio track. No need to pass any DOM element.
                remoteAudioTrack.play()
            }
        })
        client.on("user-unpublished", async (user, mediaType) => {
            console.log("user unpublished", user)
            if (!client) {
                return
            }
            await client.unsubscribe(user, mediaType)
        })

        const uid = await client.join(AGORA_APP_ID, "test", AGORA_TOKEN, userId)
        if (!uid) {
            return false
        }

        if (!AgoraRTC) {
            // @ts-ignore
            AgoraRTC = await import("agora-rtc-sdk-ng")
        }
        outgoing = await AgoraRTC.createMicrophoneAudioTrack()
        // Publish the local audio track to the channel.
        await client.publish([outgoing])

        console.log("publish success!")
        return true
    }

    export async function leaveRoom(): Promise<boolean> {
        if (client && outgoing) {
            await client.unpublish([outgoing])
            await client.leave()
            outgoing = undefined
            return true
        }
        return false
    }

    onDestroy(() => {
        leaveRoom()
    })
</script>

<slot {inCall} {incoming} />
