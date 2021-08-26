<script lang="ts">
    import { tick, getContext } from "svelte"
    import { scale } from "svelte/transition"
    import { goto } from "@sapper/app"

    import {
        LogOutIcon,
        CheckCircleIcon,
        AlertCircleIcon,
    } from "svelte-feather-icons"
    import { query } from "@urql/svelte"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import { MenuIcon, MicIcon } from "svelte-feather-icons"

    import Avatar from "../users/Avatar.svelte"

    import ButtonSmall from "../util/ButtonSmall.svelte"
    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"
    import Modal from "../util/Modal.svelte"
    import { WEBRTC_CONTEXT } from "../util/WebrtcProvider.svelte"
    import type { WebrtcContext } from "../util/WebrtcProvider.svelte"

    import {
        userHasCompletedProfile,
        groupUuid,
        userAgentIsMobileApp,
    } from "../../stores"
    import { currentUser, currentUserStore } from "../../stores/currentUser"
    import { allGroupsStore, privateGroups } from "../../stores/groups"
    import {
        showChatSidebarDrawer,
        currentGroupIsGlobal,
    } from "../../stores/chat"
    import {
        EVERGLOT_WEBSITE_BASE_URL,
        SIDEBAR_MENU_ICON_BUTTON_ID,
    } from "../../constants"

    query(currentUserStore)
    query(allGroupsStore)

    export let segment: string | undefined

    const webrtc = getContext<WebrtcContext>(WEBRTC_CONTEXT)
    const { joinedRoom: joinedCallRoom } = webrtc

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

    $: userHasPrivateGroups = $privateGroups.length

    function handleClickGroups(event: MouseEvent) {
        event.preventDefault()
        if (userHasPrivateGroups) {
            showGroupsDropdown = !showGroupsDropdown
            return
        }
        if (userHasCompletedProfile) {
            goto("/signup/success", { replaceState: false })
            return
        }
        goto("/signup", { replaceState: false })
    }

    $: inviteToken = $currentUser?.inviteTokens?.nodes[0]?.inviteToken || null
    $: inviteLink =
        inviteToken && typeof window !== "undefined"
            ? `${EVERGLOT_WEBSITE_BASE_URL}/?token=${inviteToken}`
            : null
    let showInviteModal = false
    let copiedInviteLink: boolean | null = null
    let resetCopiedTimeout: number | undefined

    function handleFocusInviteLink(event: FocusEvent) {
        if (event.target && inviteLink && inviteLink.length) {
            const element = event.target as Node
            const range = document.createRange()
            range.selectNodeContents(element)
            const sel = window.getSelection()
            sel?.removeAllRanges()
            sel?.addRange(range)
        }
    }
    const reset = () => (copiedInviteLink = null)
    const debounceReset = () => {
        clearTimeout(resetCopiedTimeout)
        setTimeout(reset, 5000)
    }
    async function handleCopyClipboard(event: MouseEvent): Promise<void> {
        event.preventDefault()
        clearTimeout(resetCopiedTimeout)
        if (navigator?.clipboard && inviteLink) {
            try {
                await navigator.clipboard.writeText(inviteLink)
                if (copiedInviteLink === true) {
                    // If it succeeded before, make sure there is a transition so
                    // that the user can see the new success happening
                    copiedInviteLink = null
                    await tick()
                }
                copiedInviteLink = true
            } catch (e) {
                if (copiedInviteLink === false) {
                    // If it failed before, make sure there is a transition so
                    // that the user can see the new failure happening
                    copiedInviteLink = null
                    await tick()
                }
                copiedInviteLink = false
            } finally {
                debounceReset()
            }
        }
    }

    $: showSidebarMenuIcon = segment === "chat"
</script>

<div class="nav-container">
    <nav class="flex container mx-auto px-2">
        {#if $userHasCompletedProfile}
            <div class="hidden md:flex flex-grow-0 self-center">
                <a
                    aria-current={segment === undefined ? "page" : undefined}
                    class="logo font-bold uppercase tracking-wide"
                    href="/"
                    ><img
                        src="/logo-192.png"
                        alt="Everglot"
                        style="max-height: 28px;"
                    /></a
                >
            </div>
        {:else if !$currentUserStore.fetching && $currentUserStore.data && segment !== "signup"}
            <div
                class="flex self-center pt-1 items-center h-full justify-center"
            >
                <ButtonSmall
                    variant="FILLED"
                    color="PRIMARY"
                    className="w-full"
                    href="/"
                    ><span><Localized id="main-nav-continue" /></span
                    ></ButtonSmall
                >
            </div>
        {/if}
        {#if showSidebarMenuIcon}
            <div
                class="flex justify-center md:hidden"
                id={SIDEBAR_MENU_ICON_BUTTON_ID}
            >
                <ButtonSmall
                    variant="TEXT"
                    color="SECONDARY"
                    tag="button"
                    on:click={() =>
                        ($showChatSidebarDrawer = !$showChatSidebarDrawer)}
                    className="w-full justify-between items-center"
                >
                    <MenuIcon size="24" />
                </ButtonSmall>
            </div>
        {/if}
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
                        aria-current={typeof segment === "undefined" ||
                        segment === ""
                            ? "page"
                            : undefined}
                        href="/"
                        class="nav-item-with-icon"
                        ><span><Localized id="main-nav-feed" /></span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            width="24"
                            height="24"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                            style="height: 32px; padding-bottom: 4px; padding-top: 4px;"
                            ><path
                                d="M18.377 3.49c-1.862-.31-3.718.62-4.456 2.095c-.428.857-.691 1.624-.728 2.361c-.035.71.138 1.444.67 2.252c.644.854 1.199 1.913 1.608 3.346a.75.75 0 1 1-1.442.412c-.353-1.236-.82-2.135-1.372-2.865l-.008-.01c-.53-.698-1.14-1.242-1.807-1.778a50.724 50.724 0 0 0-.667-.524C9.024 7.884 7.71 6.863 6.471 5.16c-.59.287-1.248.798-1.806 1.454c-.665.78-1.097 1.66-1.158 2.446c.246.36.685.61 1.246.715c.643.12 1.278.015 1.633-.182a.75.75 0 1 1 .728 1.311c-.723.402-1.728.516-2.637.346c-.916-.172-1.898-.667-2.398-1.666L2 9.427V9.25c0-1.323.678-2.615 1.523-3.607c.7-.824 1.59-1.528 2.477-1.917V2.75a.75.75 0 1 1 1.5 0v1.27c1.154 1.67 2.363 2.612 3.568 3.551c.207.162.415.323.621.489c.001-.063.003-.126.006-.188c.052-1.034.414-2.017.884-2.958c1.06-2.118 3.594-3.313 6.044-2.904c1.225.204 2.329.795 3.125 1.748C22.546 4.713 23 5.988 23 7.5c0 1.496-.913 3.255-2.688 3.652c.838 1.699 1.438 3.768 1.181 5.697c-.269 2.017-1.04 3.615-2.582 4.675C17.409 22.558 15.288 23 12.5 23H4.75a.75.75 0 0 1 0-1.5h2.322c-.58-.701-.998-1.578-1.223-2.471c-.327-1.3-.297-2.786.265-4.131c-.92.091-1.985-.02-3.126-.445a.75.75 0 1 1 .524-1.406c1.964.733 3.428.266 4.045-.19c.068-.06.137-.12.208-.18a.745.745 0 0 1 .861-.076a.746.746 0 0 1 .32.368a.752.752 0 0 1-.173.819c-.077.076-.16.15-.252.221c-1.322 1.234-1.62 3.055-1.218 4.654c.438 1.737 1.574 2.833 2.69 2.837H12.5c2.674 0 4.429-.433 5.56-1.212c1.094-.752 1.715-1.904 1.946-3.637c.236-1.768-.445-3.845-1.407-5.529a.576.576 0 0 1-.012-.02a3.557 3.557 0 0 1-1.553-.94c-.556-.565-.89-1.243-1.012-1.73a.75.75 0 0 1 1.456-.364c.057.231.26.67.626 1.043c.35.357.822.623 1.443.623c1.172 0 1.953-1.058 1.953-2.234c0-1.205-.357-2.127-.903-2.78c-.547-.654-1.318-1.08-2.22-1.23z"
                                fill="#45CDCD"
                            /></svg
                        >
                    </a>
                    {#if false}
                        {#if $userHasCompletedProfile}
                            <a
                                aria-current={segment === "global" ||
                                (segment === "chat" && $currentGroupIsGlobal)
                                    ? "page"
                                    : undefined}
                                href="/global"
                                class="nav-item-with-icon"
                                ><span><Localized id="main-nav-global" /></span>
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
                        {/if}{/if}
                    {#if !$allGroupsStore.fetching}
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
                                aria-label={`Groups`}
                                style="top: 100%; height: 0; width: 0;"
                            >
                                <div
                                    class="dropdown groups-dropdown"
                                    style="top: 2px;"
                                >
                                    <div
                                        class="dropdown-inner groups-dropdown-inner"
                                        in:scale={{ duration: 200, delay: 0 }}
                                        out:scale={{ duration: 200, delay: 0 }}
                                    >
                                        {#if $allGroupsStore.error}
                                            error
                                        {:else}
                                            {#each $privateGroups as group (group.uuid)}
                                                <div
                                                    aria-current={group.uuid ===
                                                        $groupUuid &&
                                                    segment === "chat"
                                                        ? "page"
                                                        : undefined}
                                                    class="group"
                                                >
                                                    <ButtonSmall
                                                        variant="TEXT"
                                                        color="SECONDARY"
                                                        href={`/chat?group=${group.uuid}`}
                                                        className="w-full justify-between items-center"
                                                    >
                                                        <span class="font-sans"
                                                            >{group.groupName ||
                                                                ""}
                                                            ({group.language
                                                                ? group.language.alpha2.toUpperCase() ||
                                                                  ""
                                                                : ""}
                                                            {group.languageSkillLevel
                                                                ? group
                                                                      .languageSkillLevel
                                                                      .name ||
                                                                  ""
                                                                : ""})
                                                            {#if group.uuid === $joinedCallRoom}<MicIcon
                                                                    size="18"
                                                                    class="text-gray-bitdark ml-2"
                                                                />{/if}
                                                        </span>
                                                    </ButtonSmall>
                                                </div>
                                            {/each}
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        {/if}
                    {/if}
                    {#if $userHasCompletedProfile && !$allGroupsStore.fetching && !$allGroupsStore.error && $privateGroups.length}
                        <button
                            aria-current={segment === "chat" &&
                            !$currentGroupIsGlobal
                                ? "page"
                                : undefined}
                            id="groups-dropdown-clickaway"
                            class="nav-item-with-icon"
                            on:click={handleClickGroups}
                            ><span><Localized id="main-nav-groups" /></span>
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
                                </g>
                            </svg>
                        </button>
                    {/if}
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
                            aria-label={`Settings`}
                            style="top: 100%; height: 0; width: 0;"
                        >
                            <div
                                class="dropdown settings-dropdown"
                                style="top: 2px;"
                            >
                                <div
                                    class="dropdown-inner settings-dropdown-inner"
                                    in:scale={{ duration: 200, delay: 0 }}
                                    out:scale={{ duration: 200, delay: 0 }}
                                >
                                    <div class="my-auto pt-2">
                                        {#if $currentUser && $currentUser.username && $currentUser.username.length}
                                            <span
                                                class="px-4 pb-2 text-gray-bitdark font-bold"
                                                >{$currentUser.username}</span
                                            >
                                            <hr class="mt-2" />
                                        {/if}
                                        {#if $joinedCallRoom && (segment !== "chat" || $groupUuid !== $joinedCallRoom)}
                                            <div>
                                                <ButtonSmall
                                                    variant="TEXT"
                                                    color="PRIMARY"
                                                    className="w-full justify-between items-center"
                                                    href={`/chat?group=${$joinedCallRoom}`}
                                                    ><span class="mr-1"
                                                        ><Localized
                                                            id="main-nav-go-to-call"
                                                        /></span
                                                    ><MicIcon
                                                        size="18"
                                                        class="text-primary"
                                                    /></ButtonSmall
                                                >
                                            </div>
                                        {/if}
                                        {#if $userHasCompletedProfile}
                                            <div>
                                                <ButtonSmall
                                                    variant="TEXT"
                                                    color="SECONDARY"
                                                    className="w-full"
                                                    href="/profile"
                                                    ><span
                                                        ><Localized
                                                            id="main-nav-profile"
                                                        /></span
                                                    ></ButtonSmall
                                                >
                                            </div>
                                        {/if}
                                        {#if $userHasCompletedProfile && inviteToken}
                                            <div>
                                                <ButtonSmall
                                                    variant="TEXT"
                                                    color="SECONDARY"
                                                    className="w-full"
                                                    tag="button"
                                                    on:click={() => {
                                                        showInviteModal = true
                                                    }}
                                                    ><span
                                                        ><Localized
                                                            id="main-nav-invite-friends"
                                                        /></span
                                                    ></ButtonSmall
                                                >
                                            </div>
                                        {/if}
                                        {#if !$userAgentIsMobileApp}
                                            <hr class="mt-2" />
                                            <div>
                                                <ButtonSmall
                                                    variant="TEXT"
                                                    color="SECONDARY"
                                                    className="w-full"
                                                    href="https://testflight.apple.com/join/ZvjofjHo"
                                                    target="_blank"
                                                    ><svg
                                                        fill="#000000"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 30 30"
                                                        width="24"
                                                        height="24"
                                                        class="mr-1"
                                                    >
                                                        <path
                                                            d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z"
                                                        /></svg
                                                    ><span
                                                        ><Localized
                                                            id="main-nav-download-app-ios"
                                                        /></span
                                                    ></ButtonSmall
                                                >
                                            </div>
                                            <div>
                                                <ButtonSmall
                                                    variant="TEXT"
                                                    color="SECONDARY"
                                                    className="w-full"
                                                    href="https://play.google.com/store/apps/details?id=com.everglot"
                                                    target="_blank"
                                                >
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                                        viewBox="-147 -70 294 345"
                                                        class="mr-1"
                                                    >
                                                        <g fill="#a4c639">
                                                            <use
                                                                stroke-width="14.4"
                                                                xlink:href="#b"
                                                                stroke="#FFF"
                                                            />
                                                            <use
                                                                xlink:href="#a"
                                                                transform="scale(-1,1)"
                                                            />
                                                            <g
                                                                id="a"
                                                                stroke="#FFF"
                                                                stroke-width="7.2"
                                                            >
                                                                <rect
                                                                    rx="6.5"
                                                                    transform="rotate(29)"
                                                                    height="86"
                                                                    width="13"
                                                                    y="-86"
                                                                    x="14"
                                                                />
                                                                <rect
                                                                    id="c"
                                                                    rx="24"
                                                                    height="133"
                                                                    width="48"
                                                                    y="41"
                                                                    x="-143"
                                                                />
                                                                <use
                                                                    y="97"
                                                                    x="85"
                                                                    xlink:href="#c"
                                                                />
                                                            </g>
                                                            <g id="b">
                                                                <ellipse
                                                                    cy="41"
                                                                    rx="91"
                                                                    ry="84"
                                                                />
                                                                <rect
                                                                    rx="22"
                                                                    height="182"
                                                                    width="182"
                                                                    y="20"
                                                                    x="-91"
                                                                />
                                                            </g>
                                                        </g>
                                                        <g
                                                            stroke="#FFF"
                                                            stroke-width="7.2"
                                                            fill="#FFF"
                                                        >
                                                            <path
                                                                d="m-95 44.5h190"
                                                            /><circle
                                                                cx="-42"
                                                                r="4"
                                                            /><circle
                                                                cx="42"
                                                                r="4"
                                                            />
                                                        </g>
                                                    </svg><span
                                                        ><Localized
                                                            id="main-nav-download-app-android"
                                                        /></span
                                                    ></ButtonSmall
                                                >
                                            </div>
                                        {/if}
                                        <hr />
                                        <div>
                                            <ButtonSmall
                                                variant="TEXT"
                                                color="PRIMARY"
                                                tag="a"
                                                className="w-full"
                                                href="https://survey.everglot.com/index.php/381849"
                                                target={$userAgentIsMobileApp
                                                    ? "_blank"
                                                    : "_self"}
                                                ><span class="mr-1"
                                                    ><Localized
                                                        id="main-nav-feedback"
                                                    /></span
                                                ></ButtonSmall
                                            >
                                        </div>
                                        <div>
                                            <ButtonSmall
                                                variant="TEXT"
                                                color="SECONDARY"
                                                tag="a"
                                                className="w-full"
                                                href="/privacy"
                                                ><span class="mr-1"
                                                    ><Localized
                                                        id="main-nav-privacy"
                                                    /></span
                                                ></ButtonSmall
                                            >
                                        </div>
                                        <div>
                                            <ButtonSmall
                                                variant="TEXT"
                                                color="SECONDARY"
                                                tag="button"
                                                className="w-full"
                                                on:click={handleLogout}
                                                ><span class="mr-1"
                                                    ><Localized
                                                        id="main-nav-logout"
                                                    /></span
                                                ><LogOutIcon
                                                    size="24"
                                                /></ButtonSmall
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/if}
                    <button
                        on:click={() =>
                            (showSettingsDropdown = !showSettingsDropdown)}
                        class="nav-item-with-icon justify-center cursor-pointer relative"
                        id="settings-dropdown-clickaway"
                    >
                        {#if !$currentUserStore.fetching}
                            <Avatar
                                url={$currentUser
                                    ? $currentUser.avatarUrl || ""
                                    : ""}
                                username={$currentUser
                                    ? $currentUser.username || ""
                                    : ""}
                                size={42}
                            />
                            {#if $joinedCallRoom}
                                <MicIcon
                                    size="16"
                                    class="text-primary absolute mic-icon"
                                />
                            {/if}
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
{#if showInviteModal && typeof window !== "undefined"}
    <EscapeKeyListener on:keydown={() => (showInviteModal = false)} />
    <Modal>
        <div class="py-4 px-4 md:py-8 md:px-10 bg-white shadow-lg rounded-lg">
            <p class="mb-6 text-center">
                <Localized id="invite-modal-msg" />
            </p>

            <div
                class="py-3 px-6 border border-gray-400 rounded-lg hover:bg-gray-lightest"
            >
                <span
                    role="textbox"
                    aria-readonly="true"
                    contenteditable
                    on:cut|preventDefault
                    on:paste|preventDefault
                    on:keydown={(event) => {
                        if (!event.metaKey && !event.ctrlKey) {
                            // Allow copying and selecting, prevent changing the content
                            event.preventDefault()
                        }
                    }}
                    on:focus|self={handleFocusInviteLink}
                    class="rounded-lg font-bold text-sm text-gray-bitdark cursor-pointer focus:cursor-text outline-none break-all"
                    style="overflow-wrap: anywhere;"
                >
                    {inviteLink}
                </span>
            </div>

            <div class="flex justify-end mt-6">
                <ButtonSmall
                    tag="button"
                    on:click={() => (showInviteModal = false)}
                    variant="TEXT"
                    color="PRIMARY"
                    className="mr-1"
                    ><Localized id="invite-modal-close" /></ButtonSmall
                >
                <ButtonSmall tag="button" on:click={handleCopyClipboard}
                    ><Localized id="invite-modal-copy" /></ButtonSmall
                >
            </div>
            {#if copiedInviteLink !== null}
                <div
                    class="absolute bottom-8 left-8 md:bottom-10 md:left-10"
                    in:scale={{ delay: 200, duration: 100 }}
                    out:scale={{ duration: 100 }}
                >
                    <div
                        class={`flex relative items-center font-secondary ${
                            copiedInviteLink
                                ? "text-primary"
                                : "text-primary-dark"
                        }`}
                    >
                        {#if copiedInviteLink}
                            <span class="mr-2 font-bold"
                                ><Localized
                                    id="invite-modal-copy-success"
                                /></span
                            >
                            <CheckCircleIcon size="24" strokeWidth="3" />
                        {:else}
                            <span class="mr-2 font-bold"
                                ><Localized
                                    id="invite-modal-copy-failed"
                                /></span
                            >
                            <AlertCircleIcon size="24" strokeWidth="3" />
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    </Modal>
{/if}

<style>
    .nav-container {
        @apply shadow-md;
        @apply bg-white;
        @apply relative;
        @apply z-30;

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
        height: 3px;
        border-top-left-radius: 200px;
        border-top-right-radius: 200px;
        display: block;
        bottom: 0;
        left: 0.5rem;
        right: 0.5rem;

        @apply bg-accent;

        @screen md {
            left: 1.5rem;
            right: 1.5rem;
            bottom: unset;
            top: 0;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-left-radius: 200px;
            border-bottom-right-radius: 200px;
            height: 3px;
        }
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
        @apply font-bold;
        @apply text-center;
        @apply font-secondary;

        @screen md {
            padding: 0.5rem 2rem;
        }
    }

    a.logo {
        padding: 0.75rem 1rem;

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

    .dropdown-inner {
        z-index: 1;
    }

    .dropdown-inner :global(a) {
        margin: 0;
    }

    .groups-dropdown-inner {
        transform-origin: top right;

        @screen md {
            transform-origin: top left;
        }
    }

    .settings-dropdown-inner {
        transform-origin: top right;

        @screen md {
            transform-origin: top left;
        }
    }

    .group {
        min-width: 150px;

        @apply font-normal;
    }

    .group[aria-current] {
        @apply font-bold;
        @apply text-primary;
        @apply bg-primary-lightest;
    }

    .group :global(a) {
        @apply m-0;
    }

    #settings-dropdown-clickaway :global(.mic-icon) {
        right: 18px;
        bottom: 10px;
    }
</style>
