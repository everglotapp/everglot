<script lang="ts">
    import { onDestroy, setContext } from "svelte"
    import { writable } from "svelte/store"

    import type {
        IAgoraRTC,
        IAgoraRTCClient,
        IAgoraRTCRemoteUser,
        IMicrophoneAudioTrack,
    } from "agora-rtc-sdk-ng"

    import { AGORA_APP_ID } from "../../../constants"

    let AgoraRTC: IAgoraRTC

    const outgoing = writable<IMicrophoneAudioTrack | null>(null)
    const remoteUsers = writable<IAgoraRTCRemoteUser[]>([])
    const joinedRoom = writable<string | null>(null)

    const isInCall = writable(false)
    $: isInCall.set($outgoing !== null)

    export let contextKey: string
    setContext(contextKey, {
        outgoing,
        remoteUsers,
        isInCall,
        joinedRoom,
        init,
        joinRoom,
        leaveRoom,
    })

    let client: IAgoraRTCClient | undefined

    async function init() {
        if (typeof window === "undefined") {
            return
        }

        if (!AgoraRTC) {
            // @ts-ignore
            AgoraRTC = await import("agora-rtc-sdk-ng")
        }
    }
    init()

    function createClientIfNotExists() {
        if (typeof client !== "undefined") {
            return
        }
        if (typeof window === "undefined") {
            return
        }
        client = AgoraRTC.createClient({
            mode: "rtc",
            codec: "vp8",
        })
    }

    async function joinRoom(roomId: string, userId: string): Promise<boolean> {
        if (!client) {
            createClientIfNotExists()
        }

        if ($joinedRoom) {
            await leaveRoom()
        }

        $joinedRoom = roomId

        client!.on("user-published", async (user, mediaType) => {
            if (!client) {
                return
            }
            // Subscribe to a remote user.
            await client.subscribe(user, mediaType)

            // If the subscribed track is audio.
            if (mediaType === "audio") {
                // Get `RemoteAudioTrack` in the `user` object.
                const remoteAudioTrack = user.audioTrack
                if (!remoteAudioTrack) {
                    return
                }
                $remoteUsers = [...$remoteUsers, user]
                // Play the audio track. No need to pass any DOM element.
                remoteAudioTrack.play()
            }
        })
        client!.on("user-unpublished", async (user, mediaType) => {
            if (!client) {
                return
            }
            await client.unsubscribe(user, mediaType)
        })

        const rtcToken = await getAgoraToken(roomId)
        if (!rtcToken) {
            return false
        }
        const uid = await client!.join(AGORA_APP_ID, roomId, rtcToken, userId)
        if (!uid) {
            return false
        }

        if (!AgoraRTC) {
            // @ts-ignore
            AgoraRTC = await import("agora-rtc-sdk-ng")
        }
        $outgoing = await AgoraRTC.createMicrophoneAudioTrack()
        // Publish the local audio track to the channel.
        await client!.publish([$outgoing!])

        return true
    }

    async function leaveRoom(): Promise<boolean> {
        if (!client) {
            return false
        }
        if ($remoteUsers) {
            for (const remoteUser of $remoteUsers) {
                await client.unsubscribe(remoteUser, "audio")
                remoteUser.audioTrack?.stop()
            }
        }
        if ($outgoing) {
            await client.unpublish([$outgoing])
            $outgoing.stop()
            $outgoing.close()
            $outgoing = null
        }
        client.leave()
        return true
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

<slot />
