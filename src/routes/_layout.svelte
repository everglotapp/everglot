<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"
    import { goto } from "@sapper/app"
    import { v4 as uuidv4 } from "uuid"

    import { setupUrql } from "./_helpers/urql"
    import { query } from "@urql/svelte"

    import { currentUserStore } from "../stores/currentUser"
    import { allGroupsStore } from "../stores/groups"

    import LocaleProvider from "../comp/util/LocaleProvider.svelte"
    import MainNav from "../comp/layout/MainNav.svelte"
    import WebrtcProvider from "../comp/util/WebrtcProvider.svelte"
    import ChatProvider from "../comp/util/ChatProvider.svelte"
    import { showChatSidebarDrawer } from "../stores/chat"
    import { showSwitchCallModal } from "../stores/call"
    import { MOBILE_APP_USER_AGENTS } from "../constants"
    import { userAgentIsMobileApp } from "../stores"

    setupUrql()

    query(currentUserStore)
    query(allGroupsStore)

    export let segment: string | undefined = undefined

    $: {
        segment // dependency
        handlePageChange()
    }

    $: showMainNav = segment !== "login" && segment !== "join"
    $: noscroll = segment === "chat"

    onMount(() => {
        // TODO: is this really necessary?
        segment = window.location.pathname.split("/")[1]

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

<LocaleProvider {segment}>
    <WebrtcProvider>
        <ChatProvider>
            <div id="app" class:noscroll class:with-main-nav={showMainNav}>
                {#if showMainNav}
                    <MainNav {segment} />
                {/if}

                <main>
                    {#key transitionId}
                        <div
                            class="main-inner"
                            in:scale={{ duration: timeout, delay: timeout }}
                            out:scale={{ duration: timeout }}
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
