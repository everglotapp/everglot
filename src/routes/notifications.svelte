<script lang="ts">
    import { onMount } from "svelte"
    import { query } from "@urql/svelte"
    import {
        currentUserInAppNotificationsStore,
        inAppNotifications,
    } from "../stores/notifications"

    query(currentUserInAppNotificationsStore)
    onMount(() => {
        currentUserInAppNotificationsStore.context = {
            ...currentUserInAppNotificationsStore.context,
            pause: false,
        }
    })
</script>

<div class="container max-w-3xl py-8">
    {#if $inAppNotifications}
        {#each $inAppNotifications as notification (notification.uuid)}
            <div>{JSON.stringify(notification)}</div>
        {/each}
    {/if}
</div>
