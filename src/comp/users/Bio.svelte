<script lang="ts">
    import { chatUsers } from "../../stores/chat"

    import Avatar from "./Avatar.svelte"
    import type { User } from "../../types/generated/graphql"

    export let userUuid: User["uuid"] | null

    $: user = userUuid
        ? $chatUsers.find((u) => u?.uuid === userUuid) || null
        : null

    $: languages = user
        ? [
              ...new Set(
                  user.userLanguages.nodes
                      .map(
                          (userLanguage) =>
                              userLanguage?.language?.englishName || null
                      )
                      .filter(Boolean)
              ),
          ]
        : []

    enum ActiveStatus {
        ACTIVE = "online",
        IDLE = "idle",
        OFFLINE = "offline",
    }
    $: activeStatus = user ? getActiveStatus(new Date(user.lastActiveAt)) : null
    const getActiveStatus = (lastActiveDate: Date): ActiveStatus => {
        const now = Date.now()
        const lastActive = lastActiveDate.getTime()
        const THREE_MINS = 3 * 60 * 1000
        const ONE_HOUR = 60 * 60 * 1000
        if (now - lastActive < THREE_MINS) {
            return ActiveStatus.ACTIVE
        } else if (now - lastActive < ONE_HOUR) {
            return ActiveStatus.IDLE
        }
        return ActiveStatus.OFFLINE
    }
</script>

<div class="wrapper">
    {#if !user}
        <span class="text-sm italic">error</span>
    {:else}
        <div class="flex flex-row font-medium gap-x-6">
            <div class="relative">
                <span class="font-bold text-gray-bitdark">{user.username}</span>
                {#if activeStatus}
                    <div class={`active-status ${activeStatus}`} />
                {/if}
                <div class="mx-auto mt-1" style="width: 64px; height: 64px;">
                    <Avatar
                        username={user.username || ""}
                        url={user.avatarUrl || ""}
                        size={64}
                    />
                </div>
            </div>
            <div class="pt-8">
                <span>Languages</span>
                <div class="pl-2 pt-1">
                    {#each languages as language}
                        <div class="text-primary">{language}</div>
                    {/each}
                </div>
            </div>
        </div>
        <div>{user.bio}</div>
    {/if}
</div>

<style>
    .wrapper {
        text-align: initial;
        cursor: initial;
        color: initial;

        @apply text-base;
        @apply py-6;
        @apply px-3;
    }

    .active-status {
        top: 32px;
        right: 10px;
        width: 10px;
        height: 10px;
        border-radius: 50%;

        @apply absolute;
    }

    .active-status.online {
        background: #82ed93;
    }

    .active-status.idle {
        background: #f9ef0a;
    }

    .active-status.offline {
        background: #e5e5e5;
    }
</style>
