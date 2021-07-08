<script lang="ts">
    import { getContext } from "svelte"
    import { SplitScreen24 } from "carbon-icons-svelte"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { MicIcon } from "svelte-feather-icons"

    import GroupMembers from "./GroupMembers.svelte"

    import Headline3 from "../typography/Headline3.svelte"
    import ButtonLarge from "../util/ButtonLarge.svelte"
    import Spinner from "../util/Spinner.svelte"
    import { WEBRTC_CONTEXT } from "../util/WebrtcProvider.svelte"
    import type { WebrtcContext } from "../util/WebrtcProvider.svelte"

    import { groupUuid } from "../../stores"
    import { currentUserIsGroupMember } from "../../stores/chat"

    import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng"

    const {
        isInCall,
        joinedRoom: joinedCallRoom,
        joining: joiningCall,
    } = getContext<WebrtcContext>(WEBRTC_CONTEXT)

    export let handleToggleSplit: () => void
    export let handleToggleMic: () => void
    export let handleToggleAudio: () => void
    export let handleWantsToJoinCall: () => void
    export let handleJoinCall: () => Promise<boolean>
    export let handleLeaveCall: () => Promise<boolean>
    export let split = false
    $: showGamesOnMobile = !split
    export let mic = false
    export let audio = false
    export let remoteUsers: IAgoraRTCRemoteUser[] = []

    let volume = 100
    let previousVolume = 100

    function handleSliderChange(event: Event) {
        for (const remoteUser of remoteUsers) {
            const { audioTrack } = remoteUser
            if (!audioTrack) {
                continue
            }
            audioTrack.setVolume(
                Number((<HTMLInputElement>event.currentTarget).value)
            )
        }
    }

    function handleToggleAudioButton() {
        const disabling = audio
        if (disabling) {
            previousVolume = volume
        }
        handleToggleAudio()
        if (disabling) {
            volume = 0
        } else {
            volume = previousVolume
        }
    }
</script>

{#key $groupUuid}
    <div class="sidebar">
        <div class="users-container py-3 px-4 text-lg w-full mb-4">
            <Headline3><Localized id="chat-sidebar-members" /></Headline3>
            <GroupMembers />
        </div>
        <div
            class="controls py-3 px-4 text-lg font-bold w-full text-gray-dark mb-4"
        >
            <Headline3><Localized id="chat-sidebar-controls" /></Headline3>
            <div class="toggle-row hidden md:flex">
                <SplitScreen24 fill="currentColor" class="text-primary" />
                <button on:click={handleToggleSplit} class="font-bold"
                    ><Localized id="chat-sidebar-controls-display" /></button
                >
                <div class="toggle" on:click={handleToggleSplit}>
                    <div aria-selected={split}>
                        <Localized id="chat-sidebar-controls-toggle-on" />
                    </div>
                    <div aria-selected={!split}>
                        <Localized id="chat-sidebar-controls-toggle-off" />
                    </div>
                </div>
            </div>
            <div class="toggle-row flex md:hidden">
                <SplitScreen24 fill="currentColor" class="text-primary" />
                <button on:click={handleToggleSplit} class="font-bold"
                    ><Localized id="chat-sidebar-controls-games" /></button
                >
                <div class="toggle" on:click={handleToggleSplit}>
                    <div aria-selected={showGamesOnMobile}>
                        <Localized id="chat-sidebar-controls-toggle-on" />
                    </div>
                    <div aria-selected={!showGamesOnMobile}>
                        <Localized id="chat-sidebar-controls-toggle-off" />
                    </div>
                </div>
            </div>
            {#if $joiningCall}
                <div class="flex justify-center pt-3 pb-2"><Spinner /></div>
            {:else if $isInCall && $joinedCallRoom === $groupUuid}
                <div class="toggle-row flex">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 40 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clip-path="url(#clip0)">
                            <path
                                d="M20.001 1.45786C18.6749 1.45786 17.4031 1.91879 16.4654 2.73926C15.5278 3.55974 15.001 4.67253 15.001 5.83286V17.4995C15.001 18.6598 15.5278 19.7726 16.4654 20.5931C17.4031 21.4136 18.6749 21.8745 20.001 21.8745C21.3271 21.8745 22.5988 21.4136 23.5365 20.5931C24.4742 19.7726 25.001 18.6598 25.001 17.4995V5.83286C25.001 4.67253 24.4742 3.55974 23.5365 2.73926C22.5988 1.91879 21.3271 1.45786 20.001 1.45786V1.45786Z"
                                stroke="#45CDCD"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M31.6683 14.5828V17.4994C31.6683 20.2069 30.4391 22.8034 28.2512 24.7178C26.0633 26.6323 23.0958 27.7078 20.0016 27.7078C16.9074 27.7078 13.94 26.6323 11.752 24.7178C9.56412 22.8034 8.33496 20.2069 8.33496 17.4994V14.5828"
                                stroke="#45CDCD"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M20.001 27.7083V33.5416"
                                stroke="#45CDCD"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M13.335 33.5419H26.6683"
                                stroke="#45CDCD"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect
                                    width="40"
                                    height="35"
                                    fill="white"
                                    transform="translate(0.000976562)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                    <button on:click={handleToggleMic} class="font-bold"
                        ><Localized id="chat-sidebar-controls-mic" /></button
                    >
                    <div class="toggle" on:click={handleToggleMic}>
                        <div aria-selected={mic}>
                            <Localized id="chat-sidebar-controls-toggle-on" />
                        </div>
                        <div aria-selected={!mic}>
                            <Localized id="chat-sidebar-controls-toggle-off" />
                        </div>
                    </div>
                </div>
                <div class="toggle-row flex">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 22 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.4501 5.48748C16.9089 6.16725 18.158 7.33383 19.0371 8.83745C19.9162 10.3411 20.3853 12.1131 20.384 13.9261C20.3852 15.7389 19.9162 17.5109 19.037 19.0144C18.1579 20.5179 16.9088 21.6843 15.4501 22.364V24.2623C17.3381 23.5459 18.9815 22.1609 20.1459 20.3047C21.3103 18.4486 21.9362 16.2163 21.9343 13.9261C21.9343 9.1047 19.2174 5.01206 15.4501 3.58378V5.48748ZM15.4501 9.96927C15.9466 10.4577 16.3449 11.0646 16.6177 11.7479C16.8905 12.4312 17.0311 13.1746 17.0299 13.9268C17.0312 14.6788 16.8906 15.4222 16.6178 16.1054C16.345 16.7886 15.9466 17.3953 15.4501 17.8836V19.8151C17.2127 18.6395 18.3975 16.4424 18.3975 13.9268C18.3979 12.7336 18.1257 11.5613 17.6084 10.5277C17.091 9.49411 16.3467 8.63559 15.4501 8.03841V9.96927ZM1.89242 19.3655H6.60815L11.9133 26.8465C12.5028 27.8245 13.8822 27.7504 14.2712 26.6414V1.26648C13.7932 0.158087 12.5388 0.0691165 11.9133 1.00704L6.60815 8.51383H1.89242C0.382799 8.51383 0.124023 8.82692 0.124023 10.5269V17.3266C0.124023 18.9852 0.418757 19.3655 1.89242 19.3655Z"
                            fill="#45CDCD"
                        />
                    </svg>
                    <button on:click={handleToggleAudioButton} class="font-bold"
                        ><Localized id="chat-sidebar-controls-audio" /></button
                    >
                    <div class="toggle" on:click={handleToggleAudioButton}>
                        <div aria-selected={audio}>
                            <Localized id="chat-sidebar-controls-toggle-on" />
                        </div>
                        <div aria-selected={!audio}>
                            <Localized id="chat-sidebar-controls-toggle-off" />
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center mt-3">
                    <input
                        type="range"
                        min={0}
                        max={200}
                        on:change={handleSliderChange}
                        bind:value={volume}
                        style="max-width: 150px;"
                        disabled={!audio}
                    />
                    <span class="text-base pl-2 text-gray-bitdark text-md"
                        >{Math.floor(volume / 2)}%</span
                    >
                </div>
                <div class="flex justify-center">
                    <ButtonLarge
                        tag="button"
                        on:click={handleLeaveCall}
                        variant="TEXT"
                        ><Localized id="chat-sidebar-leave-call" /></ButtonLarge
                    >
                </div>
            {:else if $isInCall && $joinedCallRoom !== $groupUuid}
                {#if $currentUserIsGroupMember}
                    <div class="flex justify-center">
                        <ButtonLarge
                            tag="button"
                            on:click={handleWantsToJoinCall}
                            variant="TEXT"
                            ><MicIcon size="24" class="mr-2" /><Localized
                                id="chat-sidebar-start-call"
                            /></ButtonLarge
                        >
                    </div>
                {/if}
            {:else if $currentUserIsGroupMember}
                <div class="flex justify-center">
                    <ButtonLarge
                        tag="button"
                        on:click={handleJoinCall}
                        variant="TEXT"
                        ><MicIcon size="24" class="mr-2" /><Localized
                            id="chat-sidebar-start-call"
                        /></ButtonLarge
                    >
                </div>
            {/if}
        </div>
    </div>
{/key}

<style>
    .sidebar {
        @apply overflow-y-scroll;
        @apply rounded-tl-md;
        @apply flex;
        @apply flex-col;
        @apply flex-1;
        @apply justify-between;
        @apply fixed;
        @apply top-0;
        @apply bottom-0;
        @apply right-0;
        @apply left-0;
    }

    .users-container {
        flex: 1 1 100%;

        @apply overflow-hidden;
        @apply overflow-y-scroll;
        @apply my-4;
    }

    .controls {
        flex: 1 0 auto;
    }

    .toggle-row {
        max-width: 200px;

        @apply items-center;
        @apply justify-between;
        @apply mx-auto;
        @apply py-1;
    }

    .toggle {
        @apply cursor-pointer;
        @apply border-2;
        @apply rounded-lg;
        @apply border-primary;
        @apply uppercase;
        @apply text-sm;
        @apply flex;
    }

    .toggle div {
        @apply rounded-md;
        @apply p-1;
        @apply text-xs;

        transition: background-color 100ms ease-in;
    }

    .toggle div[aria-selected="true"] {
        @apply bg-primary;

        transition: background-color 100ms ease-in;
    }
</style>
