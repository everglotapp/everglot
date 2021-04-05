<script lang="ts">
    import Avatar from "./Avatar.svelte"

    import type { ChatUsersQuery } from "../../types/generated/graphql"

    export let user: NonNullable<
        ChatUsersQuery["groupByUuid"]
    >["usersByGroupUserGroupIdAndUserId"]["nodes"][0]
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
        const now = new Date()
        if (now - lastActiveDate < 60000) {
            return ActiveStatus.ACTIVE
        } else if (now - lastActiveDate < 300000) {
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
            <div class="pt-8">
                <span>Languages</span>
                <div class="pl-2 pt-1">
                    {#each languages as language}
                        <div class="text-primary">{language}</div>
                    {/each}
                </div>
            </div>
            <div>
                <span class="font-bold text-gray-bitdark">{user.username}</span>
                {#if activeStatus}
                    <div class={`active-status ${activeStatus}`} />
                {/if}
                <div class="mx-auto mt-1" style="width: 64px; height: 64px;">
                    <Avatar
                        username={user.username || undefined}
                        url={user.avatarUrl || undefined}
                        size={64}
                    />
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
        top: 56px;
        right: 16px;
        width: 10px;
        height: 10px;
        border-radius: 50%;

        @apply absolute;
    }

    .active-status.online {
        background: green;
    }

    .active-status.idle {
        @apply bg-gray;
    }

    .active-status.offline {
        background: red;
    }
</style>
