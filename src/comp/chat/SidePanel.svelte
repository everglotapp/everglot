<script lang="ts">
    import { getContext } from "svelte"
    import { scale } from "svelte/transition"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import ButtonLarge from "../util/ButtonLarge.svelte"

    import Hangman from "./activities/Hangman.svelte"
    import WouldYouRather from "./activities/WouldYouRather.svelte"

    import { currentUserIsGroupMember } from "../../stores/chat"

    import { GroupActivityKind } from "../../types/activities"
    import type { GroupActivity } from "../../types/activities"

    import { groupUuid } from "../../stores"

    const chat = getContext("CHAT")

    export let activity: GroupActivity | null = null
    let startingActivity = false
    // @ts-ignore
    $: activity, (startingActivity = false)
</script>

<div>
    {#key $groupUuid}
        {#if activity === null}
            <div
                class="px-16 py-8 md:py-24"
                in:scale={{ duration: 200, delay: 250 }}
            >
                <div
                    class="relative flex justify-end"
                    style="padding-right: 190px;"
                >
                    <div
                        class="squirrel-bubble bg-primary-lightest p-4 max-w-sm font-bold text-lg text-gray-bitdark"
                    >
                        <Localized id="chat-side-panel-bubble" />
                    </div>
                    <img
                        src="/squirrel.png"
                        alt="Squirrel"
                        class="squirrel absolute right-4 top-4"
                    />
                </div>
                <div class="flex flex-col items-center pt-32">
                    <div class="menu-item">
                        <ButtonLarge
                            tag="button"
                            className="w-full justify-center"
                            color="SECONDARY"
                            variant="OUTLINED"
                            disabled={startingActivity ||
                                !$currentUserIsGroupMember}
                            on:click={() => {
                                chat.emit("startGroupActivity", {
                                    kind: GroupActivityKind.Hangman,
                                })
                                startingActivity = true
                            }}
                            ><Localized
                                id="chat-side-panel-menu-hangman"
                            /></ButtonLarge
                        >
                    </div>
                    <div class="menu-item">
                        <ButtonLarge
                            tag="button"
                            className="w-full justify-center"
                            color="SECONDARY"
                            variant="OUTLINED"
                            disabled={startingActivity ||
                                !$currentUserIsGroupMember}
                            on:click={() => {
                                chat.emit("startGroupActivity", {
                                    kind: GroupActivityKind.WouldYouRather,
                                })
                                startingActivity = true
                            }}
                            ><Localized
                                id="chat-side-panel-menu-would-you-rather"
                            /></ButtonLarge
                        >
                    </div>
                    <div class="menu-item">
                        <ButtonLarge
                            tag="button"
                            className="w-full justify-center"
                            color="SECONDARY"
                            variant="OUTLINED"
                            disabled={!$currentUserIsGroupMember}
                            on:click={() => console.log("Random q")}
                            ><Localized
                                id="chat-side-panel-menu-random-question"
                            /></ButtonLarge
                        >
                    </div>
                </div>
            </div>
        {:else if activity.kind === GroupActivityKind.Hangman}
            <Hangman
                on:quit={() => chat.emit("endGroupActivity")}
                over={activity.state.over}
                pickedLetters={activity.state.pickedLetters}
                word={activity.state.currentWord}
                solution={activity.state.solution}
            />
        {:else if activity.kind === GroupActivityKind.WouldYouRather}
            <WouldYouRather on:quit={() => chat.emit("endGroupActivity")} />
        {/if}
    {/key}
</div>

<style>
    .squirrel {
        transform: rotateY(180deg);
        max-width: 154px;
        right: 9px;
        top: max(35px, calc(400px - 24vw));
    }

    .squirrel-bubble {
        position: relative;
        border-radius: 0.4rem;
    }

    .squirrel-bubble::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 10%;
        width: 0;
        height: 0;
        border: 1.5rem solid transparent;
        border-left-color: theme("colors.primary.lightest");
        border-right: 0;
        border-bottom: 0;
        margin-top: -0.75rem;
        margin-right: -1.5rem;
    }

    .menu-item {
        max-width: 280px;
        width: 100%;

        @apply mb-2;
    }
</style>
