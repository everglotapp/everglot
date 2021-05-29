<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"
    import { v4 as uuidv4 } from "uuid"

    import { setupUrql } from "./_helpers/urql"
    import { query } from "@urql/svelte"

    import { currentUserStore } from "../stores"
    import { allGroupsStore } from "../stores/groups"

    import LocaleProvider from "./_helpers/locales/LocaleProvider.svelte"
    import MainNav from "../comp/layout/MainNav.svelte"
    import Footer from "../comp/layout/Footer.svelte"
    import WebrtcProvider from "./_helpers/webrtc/WebrtcProvider.svelte"
    import ChatProvider from "./_helpers/chat/ChatProvider.svelte"

    setupUrql()

    query(currentUserStore)
    query(allGroupsStore)

    export let segment: string | undefined = undefined
    segment = segment // get rid of unused prop warning
    // @ts-ignore (left side of comma operator isn't.
    $: segment, handlePageChange()

    $: showMainNav = segment !== "login" && segment !== "join"
    $: showFooter = segment !== "chat"
    $: noscroll = segment === "chat"

    onMount(() => {
        // TODO: is this really necessary?
        segment = window.location.pathname.split("/")[1]
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
    }
</script>

<LocaleProvider {segment}>
    <WebrtcProvider contextKey="WEBRTC">
        <ChatProvider contextKey="CHAT">
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

                {#if showFooter}
                    <Footer />
                {/if}
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
    }
</style>
