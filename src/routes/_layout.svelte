<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"

    import fetch from "cross-fetch"
    import {
        initClient as initUrqlClient,
        dedupExchange,
        fetchExchange,
        cacheExchange,
    } from "@urql/svelte"
    import { persistedFetchExchange } from "@urql/exchange-persisted-fetch"
    import persistedOperations from "../graphql.client.json"

    import MainNav from "../comp/layout/MainNav.svelte"
    import Footer from "../comp/layout/Footer.svelte"
    import type { DocumentNode, OperationDefinitionNode } from "graphql"

    export let segment: string | undefined = undefined
    // @ts-ignore (left side of comma operator isn't ignored by svelte)
    $: segment, change()

    $: showMainNav = segment !== "login" && segment !== "join"
    $: showFooter = segment !== "chat"
    $: noscroll = segment === "chat"

    onMount(() => {
        // TODO: is this really necessary?
        segment = window.location.pathname.split("/")[1]
    })

    initUrqlClient({
        url: "/graphql",
        fetch,
        exchanges: [
            dedupExchange,
            cacheExchange,
            persistedFetchExchange({
                // Disable until PostGraphile supports queries via GET
                // https://github.com/graphile/postgraphile/issues/442
                preferGetForPersistedQueries: false,
                enforcePersistedQueries: true,
                async generateHash(
                    _query: string,
                    document: DocumentNode
                ): Promise<string> {
                    // Note that we're assuming that the first definition is a operation
                    // definition rather than a FragmentDefinitionNode.
                    // Also we're ignoring the query variable meaning that we
                    // cannot just use raw query strings. To change that, return its hash.
                    const operationName = (document
                        ?.definitions[0] as OperationDefinitionNode)?.name
                        ?.value
                    if (operationName) {
                        return persistedOperations[
                            operationName as keyof typeof persistedOperations
                        ]
                    }
                    throw new Error(
                        "Failed to resolve persisted operation hash"
                    )
                },
            }),
            fetchExchange,
        ],
    })

    const timeout = 150
    let transitionTriggeringSwitch = true

    const change = () => {
        transitionTriggeringSwitch = !transitionTriggeringSwitch
    }
</script>

<div id="app" class:noscroll class:with-main-nav={showMainNav}>
    {#if showMainNav}
        <MainNav {segment} />
    {/if}

    <main>
        {#if transitionTriggeringSwitch}
            <div
                class="main-inner"
                in:scale={{ duration: timeout, delay: timeout }}
                out:scale={{ duration: timeout }}
            >
                <slot />
            </div>
        {:else}
            <div
                class="main-inner"
                in:scale={{ duration: timeout, delay: timeout }}
                out:scale={{ duration: timeout }}
            >
                <slot />
            </div>
        {/if}
    </main>

    {#if showFooter}
        <Footer />
    {/if}
</div>

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
    }

    #app.noscroll.with-main-nav {
        grid-template-rows: 84px 1fr;
    }

    #app.noscroll main {
        height: 100%;
    }

    .main-inner {
        display: flex;
        height: 100%;
    }
</style>
