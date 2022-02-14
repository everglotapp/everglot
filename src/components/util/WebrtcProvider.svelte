<script lang="ts" context="module">
    import type { Readable } from "svelte/store"
    export const WEBRTC_CONTEXT = {}
    export interface WebrtcContext {
        outgoing: Readable<IMicrophoneAudioTrack | null>
        remoteUsers: Readable<IAgoraRTCRemoteUser[]>
        isInCall: Readable<boolean>
        joinedRoom: Readable<string | null>
        joining: Readable<boolean>
        init: () => Promise<void>
        joinRoom: (roomId: string, userId: string) => Promise<boolean>
        leaveRoom: () => Promise<boolean>
    }
</script>

<script lang="ts">
    import { onDestroy, setContext } from "svelte"
    import { writable } from "svelte/store"

    import type {
        IAgoraRTC,
        IAgoraRTCClient,
        IAgoraRTCRemoteUser,
        IMicrophoneAudioTrack,
    } from "agora-rtc-sdk-ng"

    import { AGORA_APP_ID } from "../../constants"

    let AgoraRTC: IAgoraRTC

    const outgoing = writable<IMicrophoneAudioTrack | null>(null)
    const remoteUsers = writable<IAgoraRTCRemoteUser[]>([])
    const joinedRoom = writable<string | null>(null)
    const joining = writable<boolean>(false)

    const isInCall = writable(false)
    $: isInCall.set($outgoing !== null)

    setContext<WebrtcContext>(WEBRTC_CONTEXT, {
        outgoing,
        remoteUsers,
        isInCall,
        joinedRoom,
        joining,
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

    async function createClientIfNotExists() {
        if (typeof client !== "undefined") {
            return
        }
        if (typeof window === "undefined") {
            return
        }
        await init()
        client = AgoraRTC.createClient({
            mode: "rtc",
            codec: "vp8",
        })
    }

    async function joinRoom(roomId: string, userId: string): Promise<boolean> {
        if (typeof window === "undefined") {
            return false
        }
        if (!client) {
            await createClientIfNotExists()
        }

        if ($joining) {
            return false
        } else {
            $joining = true
        }

        if ($joinedRoom) {
            await leaveRoom()
        }

        client!.on("user-published", async (user, mediaType) => {
            if (!client) {
                return
            }
            try {
                // Subscribe to a remote user.
                await client.subscribe(user, mediaType)
            } catch (_e) {
                return
            }

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
            try {
                await client.unsubscribe(user, mediaType)
            } catch (_e) {}
        })

        const rtcToken = await getAgoraToken(roomId)
        if (!rtcToken) {
            $joining = false
            return false
        }
        try {
            const uid = await client!.join(
                AGORA_APP_ID,
                roomId,
                rtcToken,
                userId
            )
            if (!uid) {
                $joining = false
                return false
            }
        } catch (e) {
            $joining = false
            return false
        }

        if (!AgoraRTC) {
            // @ts-ignore
            AgoraRTC = await import("agora-rtc-sdk-ng")
        }
        try {
            $outgoing = await AgoraRTC.createMicrophoneAudioTrack()
            // Publish the local audio track to the channel.
            await client!.publish([$outgoing!])
        } catch (e) {
            $joining = false
            try {
                await client!.leave()
            } catch (_e) {
                return false
            }
            return false
        }

        $joinedRoom = roomId
        $joining = false

        return true
    }

    async function leaveRoom(): Promise<boolean> {
        if (!client) {
            return false
        }
        if (!$joinedRoom) {
            return false
        }
        let unsubscribedFromAllRemoteUsers = true
        if ($remoteUsers) {
            for (const remoteUser of $remoteUsers) {
                try {
                    await client.unsubscribe(remoteUser, "audio")
                } catch (e) {
                    unsubscribedFromAllRemoteUsers = false
                }
                remoteUser.audioTrack?.stop()
            }
        }
        if ($outgoing) {
            await client.unpublish([$outgoing])
            $outgoing.stop()
            $outgoing.close()
            $outgoing = null
        }
        await client.leave()
        $joinedRoom = null
        return unsubscribedFromAllRemoteUsers
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
