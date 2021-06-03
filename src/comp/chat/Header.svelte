<script lang="ts">
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { groupUuid } from "../../stores"
    import {
        groupChatStore,
        languageSkillLevel,
        groupName,
    } from "../../stores/chat"
    import { currentGroupLocale } from "../../stores/locales"
</script>

<header>
    {#key $groupUuid}
        {#if $groupChatStore.data && !$groupChatStore.error}
            <span class="text-xl py-2 font-bold text-gray-lightest"
                >{$groupName || ""}</span
            >
            <span class="text-xl py-2">
                {#if $currentGroupLocale !== null}
                    <Localized id={`locale-${$currentGroupLocale}`} />
                {/if}
                {#if $languageSkillLevel && languageSkillLevel.name}
                    &nbsp;{$languageSkillLevel.name}
                {/if}</span
            >
        {:else if $groupChatStore.error}
            error
        {/if}
    {/key}
</header>

<style>
    header {
        background: #47aaaa;

        @apply relative;
        @apply w-full;
        @apply flex;
        @apply justify-between;
        @apply items-center;
        @apply text-white;
        @apply shadow-sm;
        @apply p-0;

        @screen md {
            @apply py-4;
            @apply px-8;
        }
    }
</style>
