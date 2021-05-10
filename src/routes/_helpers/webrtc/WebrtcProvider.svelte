<script lang="ts">
    import { onDestroy } from "svelte"

    import type { LocalStream, RemoteStream } from "ion-sdk-js"
    import type { IonConnector } from "ion-sdk-js/lib/ion"

    let connector: IonConnector | undefined
    let outgoing: LocalStream | undefined
    export let incoming: MediaStreamTrack[] = []
    let joinedRoom: string | undefined = undefined
    let joinedUserId: string | undefined

    $: inCall = incoming.length > 0 || typeof outgoing !== "undefined"

    export async function init(uri: string) {
        if (connector) {
            return
        }

        if (typeof window === "undefined") {
            return
        }
        const { IonConnector } = await import("ion-sdk-js/lib/ion")

        connector = new IonConnector(uri)
    }

    export async function joinRoom(
        roomId: string,
        userId: string
    ): Promise<boolean> {
        if (!connector) {
            throw new Error("Not initialized")
        }

        if (outgoing) {
            console.log("Failed to join call: already in call")
            return false
        }

        const peerInfo = new Map()
        const token = undefined
        const joinResult = await connector.join(roomId, userId, peerInfo, token)
        if (!joinResult.success) {
            console.log(`Failed to join call: ${joinResult.reason}`)
            return false
        }
        joinedRoom = roomId
        joinedUserId = userId

        if (!connector.sfu) {
            console.log("Failed to join call: no client")
            return false
        }

        const { LocalStream } = await import("ion-sdk-js")
        // Setup handlers
        connector.sfu.ontrack = (
            track: MediaStreamTrack,
            stream: RemoteStream
        ) => {
            if (!stream.audio) {
                console.log("Incoming stream is not an audio stream", stream)
                return
            }
            if (track.kind !== "audio") {
                console.log("Incoming track is not an audio track", track)
                return
            }
            console.log("Got audio track", track)

            stream.mute("audio")
            stream.unmute("audio")

            incoming.push(track)
        }

        outgoing = await LocalStream.getUserMedia({
            audio: true,
            video: false,
            simulcast: true, // enable simulcast
            codec: "opus",
            resolution: "qvga",
        }).catch((e: Error) => {
            console.log("Failed to get user media:", e.message)
            return undefined
        })

        if (!outgoing) {
            console.log("Failed to get user media")
            return false
        }

        console.log("Got outgoing audio stream", outgoing)

        outgoing.mute("audio")
        connector.sfu.publish(outgoing)
        return true
    }

    export async function leaveRoom(): Promise<boolean> {
        let res = true
        if (connector) {
            if (joinedUserId && !(await connector.leave(joinedUserId))) {
                console.log("Failed to leave room")
                res = false
            }
            connector = undefined
            joinedRoom = undefined
        }
        for (const incomingTrack of incoming) {
            incomingTrack.stop()
        }
        incoming = []
        if (outgoing) {
            stopStreamTracks(outgoing)
            outgoing.unpublish()
            outgoing = undefined
        } else {
            res = false
        }
        return res
    }

    function stopStreamTracks(stream: MediaStream) {
        const tracks = stream.getTracks()
        for (const track of tracks) {
            track.stop()
        }
    }

    onDestroy(() => {
        leaveRoom()
    })
</script>

<slot {inCall} {incoming} />
