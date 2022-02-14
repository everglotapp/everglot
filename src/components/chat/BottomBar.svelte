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
    export let messages: ChatMessage[] = []
    export let mic: boolean
    export let gamesMode: boolean
    export let showTextInput: boolean
    export let handleSubmit: (message: string) => boolean
    export let handleToggleGamesMode: () => void
    export let handleToggleVoice: () => void
    export let handleJoinCall: () => Promise<boolean>
    export let handleLeaveCall: () => Promise<boolean>
    export let isOwnMessage: (message: ChatMessage) => boolean = () => {
        return false
    }
    export let textInputLocalizationId = "chat-submit-form-input"
    export let className: string = ""
    export let historySizeMax: number = 1
    export let historyCheckMax: number = 50

    const { joinedRoom: joinedChatRoom } = getContext<ChatContext>(CHAT_CONTEXT)

    const { joinedRoom: joinedCallRoom, joining: joiningCall } =
        getContext<WebrtcContext>(WEBRTC_CONTEXT)

    const joinGlobalGroup = mutation<JoinGlobalGroupMutation>({
        query: JoinGlobalGroup,
    })

    const voicePopupId = uuidv4().substring(0, 8)
    let showVoicePopup = false

    const sendMessageInputId = uuidv4().substring(0, 8)

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
        document.getElementById(sendMessageInputId) as HTMLInputElement | null
    function focusChatMessageInput(): void {
        const element = getChatMessageInput()
        if (element) {
            element.focus()
        }
    }

    function handleFormSubmit() {
        focusChatMessageInput()
        const trimmedMsg = msg.trim()
        if (!trimmedMsg) {
            msg = ""
            return
        }
        if (handleSubmit(trimmedMsg)) {
            msg = ""
        }
    }

    let history: ChatMessage[] = []
    $: {
        const res = []
        for (
            let i = 0;
            i < historyCheckMax &&
            i < messages.length &&
            res.length < historySizeMax;
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

<div
    class={`wrapper rounded-bl-md rounded-br-md grid items-center relative ${className}`}
>
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
                        className="w-full justify-center items-center mt-1"
                        ><Localized id="chat-submit-form-voice-leave-call" />
                    </ButtonLarge>{#if $joinedCallRoom !== $groupUuid}<ButtonLarge
                            tag="button"
                            variant="TEXT"
                            color="PRIMARY"
                            on:click={() => {
                                showVoicePopup = false
                                handleToggleVoice()
                            }}
                            className="w-full justify-center items-center mt-1"
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
        on:submit|preventDefault={handleFormSubmit}
        class={`submit-form items-center ${
            showTextInput ? "justify-end" : "justify-around"
        }`}
    >
        {#if $groupChatStore.data && $currentGroupIsGlobal && !$currentUserIsGroupMember}
            <ButtonLarge
                className="ml-4 mt-1 px-6 w-full justify-center"
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
            <div class="flex sm:hidden" class:w-full={!showTextInput}>
                <ButtonSmall
                    tag="button"
                    variant="FILLED"
                    color="PRIMARY"
                    on:click={() => {
                        if (showVoicePopup) {
                            showVoicePopup = false
                        }
                        handleToggleGamesMode()
                    }}
                    className={`m-0 ml-0 mr-0 toggle-games-button items-center justify-center flex flex-row${
                        showTextInput ? "" : " w-full"
                    }`}
                    ><div class="grid" style="width: 32px; height: 32px;">
                        {#if gamesMode}<svg
                                width="32"
                                height="32"
                                viewBox="0 0 36 36"
                                style="padding-top: 3px; padding-bottom: 3px;"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 2.5C9.18 2.5 2 8.78 2 16.5C2 24.22 9.18 30.5 18 30.5C19.6501 30.4981 21.2922 30.2693 22.88 29.82L28.41 33.34C28.561 33.4369 28.7352 33.4913 28.9145 33.4977C29.0937 33.5041 29.2714 33.4621 29.4289 33.3762C29.5863 33.2903 29.7178 33.1637 29.8095 33.0095C29.9012 32.8554 29.9497 32.6794 29.95 32.5V25.77C31.2012 24.5697 32.1997 23.1312 32.8867 21.5392C33.5736 19.9472 33.9352 18.2338 33.95 16.5C34 8.78 26.82 2.5 18 2.5ZM26 16.5C26 16.7652 25.8946 17.0196 25.7071 17.2071C25.5196 17.3946 25.2652 17.5 25 17.5H11C10.7348 17.5 10.4804 17.3946 10.2929 17.2071C10.1054 17.0196 10 16.7652 10 16.5C10 16.2348 10.1054 15.9804 10.2929 15.7929C10.4804 15.6054 10.7348 15.5 11 15.5H25C25.2652 15.5 25.5196 15.6054 25.7071 15.7929C25.8946 15.9804 26 16.2348 26 16.5ZM22.75 21.5C22.75 21.7652 22.6446 22.0196 22.4571 22.2071C22.2696 22.3946 22.0152 22.5 21.75 22.5H14.25C13.9848 22.5 13.7304 22.3946 13.5429 22.2071C13.3554 22.0196 13.25 21.7652 13.25 21.5C13.25 21.2348 13.3554 20.9804 13.5429 20.7929C13.7304 20.6054 13.9848 20.5 14.25 20.5H21.75C22.0152 20.5 22.2696 20.6054 22.4571 20.7929C22.6446 20.9804 22.75 21.2348 22.75 21.5ZM10.28 11.5C10.28 11.2348 10.3854 10.9804 10.5729 10.7929C10.7604 10.6054 11.0148 10.5 11.28 10.5H24.72C24.9852 10.5 25.2396 10.6054 25.4271 10.7929C25.6146 10.9804 25.72 11.2348 25.72 11.5C25.72 11.7652 25.6146 12.0196 25.4271 12.2071C25.2396 12.3946 24.9852 12.5 24.72 12.5H11.28C11.0148 12.5 10.7604 12.3946 10.5729 12.2071C10.3854 12.0196 10.28 11.7652 10.28 11.5Z"
                                    fill="currentColor"
                                />
                            </svg>
                        {:else}<svg
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
                            </svg>{/if}
                    </div>
                    {#if !showTextInput}<span class="ml-1"
                            ><Localized id="chat-submit-form-chat" /></span
                        >{/if}
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
                    className={`m-0 ${
                        showTextInput ? "mr-0" : " mr-1"
                    } ml-1 mt-1 relative justify-center items-center${
                        showTextInput ? "" : " w-full"
                    }`}
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
                    {#if !showTextInput}<span class="ml-1"
                            ><Localized id="chat-submit-form-voice" /></span
                        >{/if}
                </ButtonSmall>
            </div>
            {#if showTextInput}
                <Localized id={textInputLocalizationId} let:attrs>
                    <input
                        id={sendMessageInputId}
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
                </Localized>
                <span class="hidden sm:inline">
                    <EmojiSelector on:emoji={handleEmoji} />
                </span>
                <ButtonSmall
                    className="send-button"
                    tag="button"
                    variant="TEXT"
                    color="SECONDARY"
                    on:click={handleFormSubmit}
                    ><ChevronsRightIcon size="28" /></ButtonSmall
                >
            {/if}
        {:else}
            <div
                class="w-full h-full font-bold text-center text-lg text-gray-bitdark font-secondary"
                style="padding-top: 7px; padding-bottom: 7px;"
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

    input {
        @apply mr-3;
    }

    .wrapper :global(.send-button) {
        @apply px-2 !important;

        @media (max-width: theme("screens.sm")) {
            display: none;
        }
    }

    .wrapper :global(.send-button:hover) {
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

    :global(.toggle-games-button svg) {
        grid-column: 1/2;
        grid-row: 1/2;
    }

    .voice-popup {
        @apply absolute;

        bottom: 50px;
        left: 0;
        right: 0;

        --tw-shadow: -4px -4px 15px -3px rgba(0, 0, 0, 0.1),
            -4px -4px 6px -2px rgba(0, 0, 0, 0.05);

        box-shadow: var(--tw-ring-offset-shadow, 0 0 transparent),
            var(--tw-ring-shadow, 0 0 transparent), var(--tw-shadow);
    }

    .voice-popup .inner {
        @apply pt-1;
        @apply pb-2;
        @apply px-2;
        @apply flex;
        @apply flex-col;
        @apply items-center;
        @apply justify-center;
        @apply w-full;
        @apply bg-gray-lightest;
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
