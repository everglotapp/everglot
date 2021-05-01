<script lang="ts">
    import type Peer from "peerjs"
    import type { MediaConnection } from "peerjs"

    import { setContext, onDestroy } from "svelte"
    import { currentUser } from "../../../stores"
    import type { User } from "../../../types/generated/graphql"

    let Peer
    let peer: object | null = null

    const WEBRTC_CONTEXT = {}

    setContext(WEBRTC_CONTEXT, {
        connectToServer,
    })

    export const connectedToServer = () => peer !== null
    $: inCall = incoming.length || Object.values(outgoing).some(Boolean)
    export const callInProgress = () => inCall

    export let outgoing: Record<User["uuid"], MediaStream | null> = {}
    export let incoming: MediaStream[] = []
    let listeningForCalls: boolean = false

    export async function connectToServer() {
        if (peer !== null) {
            return peer
        }
        // @ts-ignore see https://github.com/peers/peerjs/issues/552#issuecomment-770401843
        window.parcelRequire = undefined
        const module = await import("peerjs")

        // @ts-ignore
        Peer = module.peerjs.Peer as typeof module.default

        if ($currentUser) {
            peer = new Peer($currentUser.uuid, {
                host: "/",
                port: Number(window.location.port),
                path: "/webrtc",
                config: {
                    iceServers: [{ urls: "stun:stun.t-online.de:3478" }],
                    sdpSemantics: "unified-plan",
                },
            })

            if (peer) {
                peer.on("error", function (err) {
                    console.log(err)
                })
                peer.on("disconnected", function (err) {
                    peer = null
                })
            }
        }

        return peer
    }

    export function isListeningForCalls() {
        return listeningForCalls
    }

    export async function listenForCalls() {
        if (listeningForCalls) {
            return
        }
        const peer = await connectToServer()
        if (!peer) {
            return
        }
        peer.on("call", async (call: MediaConnection) => {
            const stream = await navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .catch((err) => {
                    console.error("Failed to get local stream", err)
                    return null
                })
            if (!stream) {
                return
            }
            call.answer(stream)
            call.on("stream", (remoteStream) => {
                incoming = [...incoming, remoteStream]
                console.log("Answered", { remoteStream })
            })
        })
        listeningForCalls = true
    }

    export async function handleCall(otherUserUuids: string[]) {
        const peer = await connectToServer()
        if (!peer) {
            return
        }
        for (const otherUuid of otherUserUuids) {
            // TODO: call user and put into outgoing
            if (Object.keys(outgoing).includes(otherUserUuids)) {
                continue
            }
            const stream = await navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .catch((err) => {
                    console.error("Failed to get local stream", err)
                    return null
                })
            if (!stream) {
                continue
            }
            const call: MediaConnection = peer.call(otherUuid, stream)
            if (!call) {
                continue
            }
            outgoing = { ...outgoing, [otherUuid]: null }
            call.on("stream", (remoteStream) => {
                outgoing[otherUuid] = remoteStream
                console.log("Called", { [otherUuid]: remoteStream })
            })
        }
    }

    onDestroy(() => {
        if (peer) {
            peer.disconnect()
        }
        if (peer) {
            peer.destroy()
        }
        peer = null
    })
</script>

<slot />
