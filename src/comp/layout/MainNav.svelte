<script lang="ts">
    import { scale } from "svelte/transition"
    import { goto } from "@sapper/app"

    import { LogOutIcon } from "svelte-feather-icons"
    import { query } from "@urql/svelte"

    import Avatar from "../users/Avatar.svelte"

    import ButtonSmall from "../util/ButtonSmall.svelte"
    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"

    import { currentUser, allGroups } from "../../stores"
    import type { AllGroupsQuery } from "../../types/generated/graphql"

    query(currentUser)
    query(allGroups)

    type GroupNode = NonNullable<
        NonNullable<AllGroupsQuery["groups"]>["nodes"][0]
    >

    let groups: GroupNode[] = []
    $: if (!$allGroups.fetching && !$allGroups.error) {
        groups =
            $allGroups.data?.groups?.nodes
                .filter((group) => group && groupIsPrivate(group))
                .map((group) => group!) || []
    }
    const groupIsPrivate = (group: GroupNode) => group.global === false

    export let segment: string | undefined

    async function handleLogout() {
        await fetch("/logout", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            redirect: "follow", // if user isn't signed in anymore
        })
        return goto("/login?signedout=1")
    }

    let showSettingsDropdown = false
    let showGroupsDropdown = false

    $: hasPrivateGroups = !$allGroups.fetching && groups.length
    function handleClickGroups(event: MouseEvent) {
        event.preventDefault()
        if (hasPrivateGroups) {
            showGroupsDropdown = true
            return
        }
        if (!$currentUser.fetching && $currentUser.data?.currentUser) {
            const user = $currentUser.data.currentUser
            if (user.username !== null && user.userLanguages.totalCount) {
                goto("/profile/success", { replaceState: false })
                return
            }
        }
        goto("/profile", { replaceState: false })
    }
</script>

<div class="nav-container">
    <nav class="flex container mx-auto px-2">
        <div class="flex flex-grow-0 self-center">
            <a
                aria-current={segment === undefined ? "page" : undefined}
                class="logo font-bold uppercase tracking-wide"
                href="/">Everglot</a
            >
        </div>
        <div
            class="flex flex-1 mx-auto justify-end items-center"
            style="max-width: 820px;"
        >
            <div class="hidden md:flex justify-center items-center">
                <!-- TODO: Search -->
            </div>
            <div class="flex justify-center">
                <div class="flex">
                    <a
                        aria-current={segment === "global" ? "page" : undefined}
                        href="/global"
                        class="nav-item-with-icon"
                        ><span>Global</span>
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 52 51"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path
                                    d="M43.6672 4.16666H21.445V11.1111H24.2228V6.94443H43.6672C44.5005 6.94443 45.0561 7.49999 45.0561 8.33332V23.6111C45.0561 24.4444 44.5005 25 43.6672 25H25.6117V34.7222H18.2505L13.1117 38.75V34.7222H8.94499C8.11165 34.7222 7.5561 34.1667 7.5561 33.3333V18.0555C7.5561 17.2222 8.11165 16.6667 8.94499 16.6667H27.0005V13.8889H8.94499C6.58388 13.8889 4.77832 15.6944 4.77832 18.0555V33.3333C4.77832 35.6944 6.58388 37.5 8.94499 37.5H10.3339V44.5833L19.0839 37.5H28.3894V27.7778H43.6672C46.0283 27.7778 47.8339 25.9722 47.8339 23.6111V8.33332C47.8339 5.97221 46.0283 4.16666 43.6672 4.16666Z"
                                    fill="#45CDCD"
                                />
                                <path
                                    d="M10.6113 31.8056H13.9447L14.778 29.5833H19.0835L19.9169 31.8056H23.2502L18.528 19.4445H15.1947L10.6113 31.8056ZM16.8613 22.9167L18.2502 27.2222H15.4724L16.8613 22.9167Z"
                                    fill="#45CDCD"
                                />
                                <path
                                    d="M29.7783 23.6111C31.3061 23.6111 33.3894 23.1945 35.3339 22.2222C37.2783 23.1945 39.5005 23.6111 40.8894 23.6111V20.8333C40.8894 20.8333 39.5005 20.8333 37.9728 20.2778C39.6394 18.6111 40.8894 16.1111 40.8894 12.5V11.1111H36.7228V8.33334H33.945V11.1111H29.7783V13.8889H37.9728C37.695 16.3889 36.5839 17.9167 35.3339 18.8889C34.5005 18.1945 33.6672 17.2222 33.1117 15.9722H30.195C30.7505 17.7778 31.5839 19.1667 32.695 20.2778C31.3061 20.8333 30.0561 20.8333 29.7783 20.8333V23.6111Z"
                                    fill="#45CDCD"
                                />
                            </g>
                        </svg>
                    </a>
                    {#if !$allGroups.fetching}
                        {#if showGroupsDropdown}
                            <ClickAwayListener
                                elementId="groups-dropdown-clickaway"
                                on:clickaway={() =>
                                    (showGroupsDropdown = false)}
                            />
                            <EscapeKeyListener
                                on:keydown={() => (showGroupsDropdown = false)}
                            />
                            <div
                                class="relative"
                                in:scale={{ duration: 200, delay: 0 }}
                                out:scale={{ duration: 200, delay: 0 }}
                                aria-label={`Groups`}
                            >
                                <div
                                    class="dropdown groups-dropdown"
                                    style="top: calc(100% + 2px);"
                                >
                                    <div style="z-index: 1;">
                                        {#if $allGroups.error}
                                            error
                                        {:else}
                                            {#each groups as group (group.uuid)}
                                                <div class="my-auto">
                                                    <ButtonSmall
                                                        variant="TEXT"
                                                        color="SECONDARY"
                                                        href={`/chat?group=${group.uuid}`}
                                                        >{group.groupName}</ButtonSmall
                                                    >
                                                </div>
                                            {/each}
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        {/if}
                    {/if}
                    <a
                        aria-current={segment === "chat" || segment === "groups"
                            ? "page"
                            : undefined}
                        href=""
                        tag="button"
                        id="groups-dropdown-clickaway"
                        class="nav-item-with-icon"
                        on:click={handleClickGroups}
                        ><span>Groups</span>
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 58 53"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path
                                    d="M28.8612 22.4398C32.6112 22.4398 35.5279 19.6898 35.5279 16.3148C35.5279 12.9398 32.4723 10.3148 28.7223 10.3148C24.9723 10.3148 22.0557 13.0648 22.0557 16.3148C22.0557 19.6898 25.1112 22.4398 28.8612 22.4398ZM28.7223 12.8148C28.8612 12.8148 28.8612 12.8148 28.7223 12.8148C30.9446 12.8148 32.7501 14.4398 32.7501 16.4398C32.7501 18.4398 30.9446 19.9398 28.7223 19.9398C26.5001 19.9398 24.8334 18.3148 24.8334 16.4398C24.8334 14.4398 26.639 12.8148 28.7223 12.8148Z"
                                    fill="#45CDCD"
                                />
                                <path
                                    d="M49.4163 21.6898C46.7775 19.5648 43.3052 18.4398 39.6941 18.5648H38.583C38.3052 19.5648 37.8886 20.4398 37.333 21.1898C38.1663 21.0648 38.8608 21.0648 39.6941 21.0648C42.333 20.9398 44.9719 21.6898 47.0552 23.0648V32.0648H49.833V22.0648L49.4163 21.6898Z"
                                    fill="#45CDCD"
                                />
                                <path
                                    d="M36.5001 10.5648C37.1946 9.06482 39.139 8.31482 40.9446 8.93982C42.6112 9.56482 43.4446 11.3148 42.7501 12.9398C42.1946 14.0648 40.9446 14.8148 39.6946 14.8148C39.4168 14.8148 39.0001 14.8148 38.7223 14.6898C38.8612 15.3148 38.8612 15.9398 38.8612 16.4398V17.1898C39.139 17.1898 39.4168 17.3148 39.6946 17.3148C43.1668 17.3148 45.9446 14.8148 45.9446 11.8148C45.9446 8.68982 43.1668 6.18982 39.8334 6.18982C37.6112 6.18982 35.6668 7.18982 34.5557 8.93982C35.2501 9.31482 35.9446 9.81482 36.5001 10.5648Z"
                                    fill="#45CDCD"
                                />
                                <path
                                    d="M20.667 21.3148C20.1114 20.5648 19.6948 19.6898 19.417 18.6898H18.3059C14.6948 18.5648 11.2225 19.6898 8.58366 21.6898L8.16699 22.0648V32.0648H10.9448V23.0648C13.167 21.6898 15.667 20.9398 18.3059 21.0648C19.1392 21.0648 19.9725 21.1898 20.667 21.3148Z"
                                    fill="#45CDCD"
                                />
                                <path
                                    d="M18.3051 17.1898C18.5829 17.1898 18.8607 17.1898 19.1385 17.0648V16.3148C19.1385 15.6898 19.1385 15.0648 19.2773 14.5648C18.9996 14.6898 18.5829 14.6898 18.3051 14.6898C16.4996 14.6898 14.9718 13.3148 14.9718 11.6898C14.9718 10.0648 16.4996 8.68984 18.3051 8.68984C19.694 8.68984 20.944 9.43984 21.4996 10.5648C22.0551 9.93984 22.8885 9.31484 23.5829 8.81484C21.7773 6.18984 18.0273 5.31484 15.1107 6.93984C12.194 8.56484 11.2218 11.9398 13.0273 14.5648C14.1385 16.1898 16.0829 17.1898 18.3051 17.1898Z"
                                    fill="#45CDCD"
                                />
                                <path
                                    d="M40.2498 29.1898L39.972 28.8148C37.1942 26.0648 33.3053 24.4398 29.1387 24.5648C24.972 24.4398 20.9442 26.0648 18.1664 28.8148L17.8887 29.1898V38.6898C17.8887 39.8148 18.8609 40.8148 20.2498 40.8148H38.0276C39.2776 40.8148 40.3887 39.8148 40.3887 38.6898V29.1898H40.2498ZM37.472 38.3148H20.6664V30.0648C22.8887 28.0648 25.9442 27.0648 29.1387 27.0648C32.1942 26.9398 35.2498 28.0648 37.472 30.0648V38.3148Z"
                                    fill="#45CDCD"
                                />
                                <rect
                                    x="5.5"
                                    y="2.31482"
                                    width="47"
                                    height="42"
                                    stroke="#45CDCD"
                                    stroke-width="3"
                                />
                            </g>
                        </svg>
                    </a>
                    {#if showSettingsDropdown}
                        <ClickAwayListener
                            elementId="settings-dropdown-clickaway"
                            on:clickaway={() => (showSettingsDropdown = false)}
                        />
                        <EscapeKeyListener
                            on:keydown={() => (showSettingsDropdown = false)}
                        />
                        <div
                            class="relative"
                            in:scale={{ duration: 200, delay: 0 }}
                            out:scale={{ duration: 200, delay: 0 }}
                            aria-label={`Settings`}
                        >
                            <div
                                class="dropdown settings-dropdown"
                                style="top: calc(100% + 2px);"
                            >
                                <div style="z-index: 1;">
                                    <div class="my-auto">
                                        <ButtonSmall
                                            variant="TEXT"
                                            color="SECONDARY"
                                            tag="button"
                                            href=""
                                            on:click={handleLogout}
                                            ><span class="mr-1">Logout</span
                                            ><LogOutIcon
                                                size="24"
                                            /></ButtonSmall
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/if}
                    <button
                        aria-current={segment === "profile"
                            ? "page"
                            : undefined}
                        on:click={() =>
                            (showSettingsDropdown = !showSettingsDropdown)}
                        class="nav-item-with-icon justify-center cursor-pointer"
                        id="settings-dropdown-clickaway"
                    >
                        {#if !$currentUser.fetching}
                            <Avatar
                                url={currentUser.data?.currentUser?.avatarUrl ||
                                    ""}
                                username={currentUser.data?.currentUser
                                    ?.username || ""}
                                size={42}
                            />
                        {:else}
                            <div
                                class="bg-gray-lightest"
                                style="border-radius: 50%; width: 50px; height: 50px;"
                            />
                        {/if}</button
                    >
                </div>
            </div>
        </div>
    </nav>
</div>

<style>
    .nav-container {
        @apply shadow-md;
        @apply bg-white;

        position: relative;
        z-index: 10;
        max-height: 58px;

        @screen md {
            max-height: 76px;
        }
    }

    a[aria-current],
    button[aria-current] {
        position: relative;
    }

    a[aria-current]::after,
    button[aria-current]::after {
        position: absolute;
        content: "";
        height: 2px;
        display: block;
        bottom: 0;
        left: 0;
        right: 0;

        @apply bg-accent;
    }

    a[aria-current].logo::after {
        background-color: transparent;
    }

    a,
    button {
        display: flex;
        padding: 0.5rem 0.75rem;
        margin: 0;
        text-decoration: none;

        @apply text-gray-bitdark;
        @apply text-center;

        @screen md {
            padding: 0.5rem 2rem;
        }
    }

    a.logo {
        @apply text-black;
    }

    a:hover,
    button:hover {
        @apply text-primary;
        @apply bg-gray-lightest;
    }

    .nav-item-with-icon {
        @apply flex;
        @apply flex-col;
        @apply items-center;
        @apply gap-y-1;
        @apply justify-center;
    }

    .nav-item-with-icon span {
        @apply hidden;
        @apply md:inline;
    }

    .nav-item-with-icon svg {
        width: 36px;

        @screen md {
            width: 32px;
        }
    }

    .avatar {
        border-radius: 50%;
        width: 42px;
        height: 42px;

        @apply bg-gray-light;
        @apply overflow-hidden;
        @apply flex;
        @apply justify-center;
        @apply items-center;
    }

    .avatar > .initial {
        height: 1.625rem;
    }

    .dropdown {
        @apply absolute;
    }

    .dropdown > div {
        @apply fixed;
        @apply bg-white;
        @apply shadow-lg;
        @apply rounded-md;
        @apply right-2;

        @screen md {
            right: unset;
        }
    }
</style>
