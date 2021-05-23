<script lang="ts">
    import { onDestroy } from "svelte"

    import type {
        IAgoraRTC,
        IAgoraRTCClient,
        IAgoraRTCRemoteUser,
        IMicrophoneAudioTrack,
        IRemoteUser,
    } from "agora-rtc-sdk-ng"

    import { AGORA_APP_ID } from "../../../constants"

    let AgoraRTC: IAgoraRTC

    let outgoing: IMicrophoneAudioTrack | undefined
    let remoteUsers: IAgoraRTCRemoteUser[] = []

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
                remoteUsers = [...remoteUsers, user]
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

        const rtcToken = await getAgoraToken(roomId)
        if (!rtcToken) {
            return false
        }
        const uid = await client.join(AGORA_APP_ID, roomId, rtcToken, userId)
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
        if (client && remoteUsers) {
            for (const remoteUser of remoteUsers) {
                await client.unsubscribe(remoteUser, "audio")
                remoteUser.audioTrack?.stop()
            }
        }
        if (client && outgoing) {
            await client.unpublish([outgoing])
            outgoing.stop()
            outgoing.close()
            outgoing = undefined
        }
        if (client) {
            client.leave()
        }
        return false
    }

    async function getAgoraToken(roomId: string): Promise<string | false> {
        const response = await fetch(`/groups/rtc-token/${roomId}`, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        const res = await response.json()
        if (!res.hasOwnProperty("success")) {
            return false
        }
        if (res.success !== true) {
            return false
        }
        return res.token
    }

    onDestroy(() => {
        leaveRoom()
    })
</script>

<slot {inCall} {remoteUsers} />
