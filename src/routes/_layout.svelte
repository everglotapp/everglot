<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"
    import { goto, stores } from "@sapper/app"
    import { v4 as uuidv4 } from "uuid"

    import { setupUrql } from "./_helpers/urql"
    import { query } from "@urql/svelte"

    import { currentUserStore } from "../stores/currentUser"
    import { allGroupsStore } from "../stores/groups"

    import LocaleProvider from "../components/util/LocaleProvider.svelte"
    import MainNav from "../components/layout/MainNav.svelte"
    import WebrtcProvider from "../components/util/WebrtcProvider.svelte"
    import ChatProvider from "../components/util/ChatProvider.svelte"
    import { showChatSidebarDrawer } from "../stores/chat"
    import { showSwitchCallModal } from "../stores/call"
    import { MOBILE_APP_USER_AGENTS } from "../constants"
    import { currentPage, userAgentIsMobileApp } from "../stores"
    import { currentGroupLocale, feedLocale } from "../stores/locales"
    import { getPage, Page } from "./_helpers/routing"

    setupUrql()

    query(currentUserStore)
    query(allGroupsStore)

    const { page } = stores()
    $: path = $page.path

    $: {
        $currentPage = getPage(path)
        handlePageChange()
    }

    $: showMainNav =
        $currentPage !== Page.Join &&
        $currentPage !== Page.Login &&
        $currentPage !== Page.ResetPassword &&
        $currentPage !== Page.ResetPasswordToken
    $: noscroll = $currentPage === Page.Chat

    $: navigatorLocales =
        typeof navigator === "undefined" ? [] : navigator.languages
    $: preferredLocales =
        $currentPage === Page.Feed && $feedLocale !== null
            ? [$feedLocale, ...navigatorLocales]
            : $currentGroupLocale
            ? [$currentGroupLocale, ...navigatorLocales]
            : navigatorLocales

    $: siteLocale = preferredLocales[0] || "en"
    $: {
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("lang", siteLocale)
        }
    }

    onMount(() => {
        window.addEventListener(
            "everglotGoto",
            (event: CustomEvent<{ path: string }>) => {
                if (!event || !event.detail || !event.detail.path) {
                    return
                }
                const { path } = event.detail
                if (typeof path !== "string" || !path.length) {
                    return
                }
                goto(path)
            }
        )

        if (
            typeof navigator !== "undefined" &&
            navigator &&
            navigator.userAgent
        ) {
            $userAgentIsMobileApp = (
                MOBILE_APP_USER_AGENTS as readonly string[]
            ).includes(navigator.userAgent)
        }
    })

    const timeout = 150

    let transitionId = uuidv4()
    const doTransition = () => {
        transitionId = uuidv4()
    }
    const handlePageChange = () => {
        doTransition()
        $currentUserStore.context = {
            requestPolicy: "cache-and-network",
            transitionId, // This forces a re-execution by changing the object contents.
        }
        $showChatSidebarDrawer = false
        $showSwitchCallModal = false
    }
</script>

<LocaleProvider {preferredLocales}>
    <WebrtcProvider>
        <ChatProvider>
            <div id="app" class:noscroll class:with-main-nav={showMainNav}>
                {#if showMainNav}
                    <MainNav />
                {/if}

                <main>
                    {#key transitionId}
                        <div
                            class="main-inner"
                            in:scale|local={{
                                duration: timeout,
                                delay: timeout,
                            }}
                            out:scale|local={{ duration: timeout }}
                        >
                            <slot />
                        </div>
                    {/key}
                </main>
            </div>
        </ChatProvider>
    </WebrtcProvider>
</LocaleProvider>

<style>
    #app {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        @screen md {
            font-size: 18px;
        }
    }

    main {
        position: relative;
        background-color: white;
        box-sizing: border-box;
        min-height: 70vh;

        @screen md {
            min-height: 75vh;
        }

        @screen xl {
            min-height: 80vh;
        }
    }

    #app.noscroll {
        position: fixed;
        display: grid;
        grid-template-rows: 1fr;
        height: 100%;
    }

    #app.noscroll.with-main-nav {
        grid-template-rows: 58px 1fr;

        @screen md {
            grid-template-rows: 76px 1fr;
        }
    }

    #app.noscroll main {
        height: 100%;
    }

    .main-inner {
        display: flex;
        height: 100%;
        flex-flow: column;
    }
</style>
