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
