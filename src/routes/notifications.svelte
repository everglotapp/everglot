<script lang="ts">
    import { onMount } from "svelte"
    import { query } from "@urql/svelte"
    // import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import {
        currentUserInAppNotificationsStore,
        inAppNotifications,
    } from "../stores/notifications"

    import Notification from "../components/notifications/Notification.svelte"

    query(currentUserInAppNotificationsStore)
    onMount(() => {
        refreshNotifications()
    })

    function refreshNotifications() {
        currentUserInAppNotificationsStore.context = {
            ...currentUserInAppNotificationsStore.context,
            pause: true,
        }
        currentUserInAppNotificationsStore.context = {
            ...currentUserInAppNotificationsStore.context,
            pause: false,
        }
    }
</script>

<div class="container max-w-2xl sm:py-8">
    {#if $inAppNotifications}
        {#if !$inAppNotifications.length}
            <div
                class="py-4 px-8 bg-primary-lightest font-secondary text-gray-bitdark font-bold"
            >
                You're up to date
            </div>
        {/if}
        {#each $inAppNotifications as notification (notification.uuid)}
            <Notification
                metadata={notification.metadata}
                type={notification.type}
                createdAt={notification.createdAt}
            />
        {/each}
    {/if}
</div>
