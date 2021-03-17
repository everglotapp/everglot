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

    export let segment: string | undefined
    const FULLSCREEN_SEGMENTS = ["chat"]
    const SHOWNAV_SEGMENTS = [
        "profile",
        "chat",
        "languages",
        "global",
        "groups",
    ]

    // @ts-ignore (left side of comma operator isn't ignored by svelte)
    $: segment, change()
    $: fullscreen = segment ? FULLSCREEN_SEGMENTS.includes(segment) : false
    $: showNav = segment ? SHOWNAV_SEGMENTS.includes(segment) : false
    // const showNav = true

    onMount(() => {
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

{#if showNav}
    <MainNav {segment} />
{/if}

{#if transitionTriggeringSwitch}
    <main
        in:scale={{ duration: timeout, delay: timeout }}
        out:scale={{ duration: timeout }}
        class:fullscreen
    >
        <slot />
    </main>
    {#if !fullscreen}
        <Footer />
    {/if}
{:else}
    <main
        in:scale={{ duration: timeout, delay: timeout }}
        out:scale={{ duration: timeout }}
        class:fullscreen
    >
        <slot />
    </main>
    {#if !fullscreen}
        <Footer />
    {/if}
{/if}

<style>
    main {
        position: relative;
        background-color: white;
        box-sizing: border-box;
    }

    main.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
