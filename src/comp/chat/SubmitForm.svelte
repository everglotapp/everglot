<script lang="ts">
    import { getContext } from "svelte"
    import { v4 as uuidv4 } from "uuid"
    import { scale } from "svelte/transition"
    import EmojiSelector from "svelte-emoji-selector"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import {
        MicIcon,
        MicOffIcon,
        ChevronsRightIcon,
        CornerRightUpIcon,
    } from "svelte-feather-icons"
    import { mutation } from "@urql/svelte"

    import ButtonLarge from "../util/ButtonLarge.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"
    import Spinner from "../util/Spinner.svelte"
    import { CHAT_CONTEXT } from "../util/ChatProvider.svelte"
    import type { ChatContext } from "../util/ChatProvider.svelte"
    import { WEBRTC_CONTEXT } from "../util/WebrtcProvider.svelte"
    import type { WebrtcContext } from "../util/WebrtcProvider.svelte"

    import { groupUuid } from "../../stores"
    import { currentUserUuid } from "../../stores/currentUser"
    import {
        groupChatStore,
        currentUserIsGroupMember,
        currentGroupIsGlobal,
        fetchGroupMetadata,
    } from "../../stores/chat"

    import type {
        JoinGlobalGroupMutation,
        Maybe,
    } from "../../types/generated/graphql"
    import { JoinGlobalGroup } from "../../types/generated/graphql"
    import type { ChatMessage } from "../../types/chat"

    let msg = ""
    export let isOwnMessage: (message: ChatMessage) => boolean
    export let messages: ChatMessage[] = []
    export let mic: boolean
    export let handleToggleGames: () => void
    export let handleToggleVoice: () => void
    export let handleJoinCall: () => Promise<boolean>
    export let handleLeaveCall: () => Promise<boolean>

    const { joinedRoom: joinedChatRoom, sendMessage } =
        getContext<ChatContext>(CHAT_CONTEXT)

    const { joinedRoom: joinedCallRoom, joining: joiningCall } =
        getContext<WebrtcContext>(WEBRTC_CONTEXT)

    const joinGlobalGroup = mutation<JoinGlobalGroupMutation>({
        query: JoinGlobalGroup,
    })

    const voicePopupId = uuidv4()
    let showVoicePopup = false

    function handleEmoji(event: CustomEvent) {
        const input = getChatMessageInput()
        if (input && typeof input.selectionStart !== "undefined") {
            const { selectionStart: start, selectionEnd: end } = input
            if (start !== null && end !== null) {
                // Replace text selection by selected emoji.
                msg = `${msg.slice(0, start)}${event.detail}${msg.slice(end)}`
                focusChatMessageInput()
                // Move cursor to after selection. (Doesnt work)
                // input.selectionStart = input.selectionEnd = end
                return
            }
        }
        msg = `${msg || ""}${event.detail}`
        focusChatMessageInput()
    }
    const getChatMessageInput = () =>
        document.getElementById("send-msg-input") as HTMLInputElement | null
    function focusChatMessageInput(): void {
        const element = getChatMessageInput()
        if (element) {
            element.focus()
        }
    }

    function handleSendMessage(): void {
        focusChatMessageInput()
        const trimmedMsg = msg.trim()

        if (!trimmedMsg) {
            msg = ""
            return
        }
        const sent = sendMessage(trimmedMsg, $currentUserUuid)
        if (sent) {
            msg = ""
        }
    }

    const HISTORY_MAX = 1
    let history: ChatMessage[] = []
    $: {
        const HISTORY_CHECK_MAX = 50
        const res = []
        for (
            let i = 0;
            i < HISTORY_CHECK_MAX &&
            i < messages.length &&
            res.length < HISTORY_MAX;
            ++i
        ) {
            const toCheck = messages[messages.length - i - 1]
            if (!isOwnMessage(toCheck)) {
                continue
            }
            res.push(toCheck)
        }
        history = res
    }
    let historyMessage: Maybe<ChatMessage> = null
    let origMsg: string = ""
    function handleMessageInputKeydown(event: KeyboardEvent): void {
        if (event.key === "ArrowUp") {
            if (!historyMessage) {
                const olderMsg = history[0]
                if (olderMsg) {
                    historyMessage = olderMsg
                    origMsg = msg
                    msg = historyMessage.text
                }
            }
        }
        if (event.key === "ArrowDown") {
            historyMessage = null
            msg = origMsg
        }
    }
</script>

<div class="wrapper rounded-bl-md rounded-br-md grid items-center relative">
    {#if showVoicePopup}
        <div id={voicePopupId} class="voice-popup" role="tooltip">
            <div class="inner origin-bottom" in:scale={{ duration: 100 }}>
                {#if $joinedCallRoom === null}
                    <ButtonLarge
                        tag="button"
                        variant="FILLED"
                        color="PRIMARY"
                        on:click={() => {
                            showVoicePopup = false
                            handleJoinCall()
                        }}
                        className="w-full justify-center items-center"
                        ><Localized id="chat-submit-form-voice-join-call" />
                    </ButtonLarge>
                {:else}<ButtonLarge
                        tag="button"
                        variant="TEXT"
                        color="DANGER"
                        on:click={() => {
                            showVoicePopup = false
                            handleLeaveCall()
                        }}
                        className="w-full justify-center items-center"
                        ><Localized id="chat-submit-form-voice-leave-call" />
                    </ButtonLarge>{#if $joinedCallRoom !== $groupUuid}<ButtonLarge
                            tag="button"
                            variant="TEXT"
                            color="PRIMARY"
                            on:click={() => {
                                showVoicePopup = false
                                handleToggleVoice()
                            }}
                            className="w-full justify-center items-center"
                            ><Localized
                                id="chat-submit-form-voice-switch-call"
                            />
                        </ButtonLarge>{/if}<ButtonLarge
                        tag="button"
                        variant="FILLED"
                        color="PRIMARY"
                        on:click={() => {
                            showVoicePopup = false
                            handleToggleVoice()
                        }}
                        className="w-full justify-center items-center"
                        >{#if mic}<MicOffIcon
                                size="18"
                                class="mr-2"
                            /><Localized
                                id="chat-submit-form-voice-mute"
                            />{:else}<MicIcon
                                size="18"
                                class="mr-2"
                            /><Localized
                                id="chat-submit-form-voice-unmute"
                            />{/if}
                    </ButtonLarge>{/if}
            </div>
        </div>
    {/if}
    <form
        on:submit|preventDefault={handleSendMessage}
        class="submit-form justify-end items-center"
    >
        {#if $groupChatStore.data && $currentGroupIsGlobal && !$currentUserIsGroupMember}
            <ButtonLarge
                className="ml-4 px-6 w-full justify-center"
                tag="button"
                on:click={async () => {
                    const res = await joinGlobalGroup({
                        groupUuid: $groupUuid,
                    })
                    if (res.data) {
                        fetchGroupMetadata({
                            groupUuid: $groupUuid,
                        })
                    } else {
                        // TODO: Show error feedback
                    }
                }}
                ><Localized id="chat-submit-form-join-group" />
            </ButtonLarge>
        {:else if $joinedChatRoom}
            <div class="flex sm:hidden">
                <ButtonSmall
                    tag="button"
                    variant="FILLED"
                    color="PRIMARY"
                    on:click={handleToggleGames}
                    className="m-0 ml-0 mr-0 items-center toggle-games-button"
                    ><svg
                        width="32"
                        height="32"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M31.8 11C30.6 9 28.4 8 26 8H14C11.6 8 9.4 9 8.2 11C3.6 18 2.6 28.6 5.8 30.8C9 33 16.2 23.4 20 23.4C23.8 23.4 30.8 33 34.2 30.8C37.4 28.6 36.4 18 31.8 11ZM16 18H14V20H12V18H10V16H12V14H14V16H16V18ZM26.8 19C26.8 20 26 20.8 25 20.8C24 20.8 23.2 20 23.2 19C23.2 18 24 17.2 25 17.2C26 17.2 26.8 18 26.8 19ZM30.6 15C30.6 16 29.8 16.8 28.8 16.8C27.8 16.8 27 16 27 15C27 14 27.8 13.2 28.8 13.2C29.8 13.2 30.6 14 30.6 15Z"
                            fill="currentColor"
                        />
                    </svg>
                </ButtonSmall>
                <ButtonSmall
                    tag="button"
                    variant="TEXT"
                    color={$joinedCallRoom === null ? "SECONDARY" : "PRIMARY"}
                    on:click={() => {
                        if ($joiningCall) {
                            return
                        }
                        showVoicePopup = !showVoicePopup
                    }}
                    aria-describedby={voicePopupId}
                    className="m-0 ml-1 mr-0 relative items-center"
                >
                    {#if $joiningCall}
                        <Spinner size={20} />
                    {:else}
                        {#if mic || $joinedCallRoom === null}
                            <MicIcon
                                size="22"
                                strokeWidth={$joinedCallRoom === null ? 2 : 3}
                            />
                        {:else}
                            <MicOffIcon size="22" />
                        {/if}{#if $joinedCallRoom !== null && $joinedCallRoom !== $joinedChatRoom}<div
                                class="absolute right-1 top-0"
                            >
                                <CornerRightUpIcon size="16" />
                            </div>{/if}
                    {/if}
                </ButtonSmall>
            </div>
            <Localized id="chat-submit-form-input" let:attrs>
                <input
                    id="send-msg-input"
                    type="text"
                    placeholder={attrs.placeholder}
                    required
                    autocomplete="off"
                    class="border-none shadow-md px-2 py-1 sm:px-4 sm:py-2 w-full rounded-md ml-1 sm:ml-0"
                    bind:value={msg}
                    in:scale={{
                        duration: 200,
                    }}
                    on:keydown={handleMessageInputKeydown}
                    enterkeyhint="send"
                    mozactionhint="send"
                    autocapitalize="sentences"
                />
                <span class="hidden md:inline">
                    <EmojiSelector on:emoji={handleEmoji} />
                </span>
            </Localized>
            <ButtonSmall
                className="send-msg-button"
                tag="button"
                variant="TEXT"
                color="SECONDARY"
                on:click={handleSendMessage}
                ><ChevronsRightIcon size="28" /></ButtonSmall
            >
        {:else}
            <div
                class="w-full h-full font-bold text-center text-lg text-gray-bitdark"
            >
                <Localized id="chat-submit-form-connecting" />
            </div>
        {/if}
    </form>
</div>

<style>
    .wrapper {
        box-shadow: -2px -2px 4px rgba(220, 220, 220, 0.5);
        padding: 4px 0 4px 10px;

        @apply bg-gray-lightest;
        @apply absolute;
        @apply bottom-0;
        @apply left-0;
        @apply right-0;

        @screen sm {
            padding: 12px 18px;
        }
    }

    .wrapper form {
        display: flex;
    }

    #send-msg-input {
        @apply mr-3;
    }

    .wrapper :global(.send-msg-button) {
        @apply px-2 !important;

        @media (max-width: theme("screens.sm")) {
            display: none;
        }
    }

    .wrapper :global(.send-msg-button:hover) {
        @apply text-primary !important;
    }

    .wrapper :global(.svelte-emoji-picker__trigger) {
        @apply text-sm;
        @apply px-2;
        @apply py-2;
        @apply text-gray-bitdark;
        @apply hover:text-primary;
    }

    .wrapper :global(.svelte-emoji-picker__trigger svg) {
        width: 1.4rem;
        height: 1.4rem;
    }

    :global(.toggle-games-button) {
        @apply px-2 !important;
        @apply py-1 !important;
    }

    .voice-popup {
        @apply absolute;

        bottom: 50px;
        left: 0;
        right: 0;
    }

    .voice-popup .inner {
        @apply py-2;
        @apply px-2;
        @apply rounded-md;
        @apply flex;
        @apply flex-col;
        @apply items-center;
        @apply justify-center;
        @apply w-full;
        @apply bg-white;
    }

    @media (max-width: 700px) {
        .wrapper {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>
