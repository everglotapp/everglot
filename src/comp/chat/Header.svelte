<script lang="ts">
    import { groupUuid } from "../../stores"
    import {
        groupChatStore,
        language,
        languageSkillLevel,
        groupName,
    } from "../../stores/chat"
</script>

<header>
    {#key $groupUuid}
        {#if $groupChatStore.data && !$groupChatStore.error}
            <span class="text-xl py-2 font-bold text-gray-lightest"
                >{$groupName || ""}</span
            >
            <div
                class="inline"
                style="min-width: 5px; margin: 0 1rem; height: 42px; border-left: 1px solid white; border-right: 1px solid white;"
            />
            <span class="text-xl py-2"
                >{$language?.englishName || ""}
                {$languageSkillLevel?.name || ""}</span
            >
        {:else if $groupChatStore.error}
            error
        {/if}
    {/key}
</header>

<style>
    header {
        @apply relative;
        @apply w-full;
        @apply flex;
        @apply items-center;
        @apply bg-primary;
        @apply text-white;
        @apply shadow-sm;
        @apply p-0;

        @screen md {
            @apply py-4;
            @apply px-8;
        }
    }
</style>
