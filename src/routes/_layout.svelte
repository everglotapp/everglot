<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"
    import { v4 as uuidv4, validate as uuidValidate } from "uuid"

    import fetch from "cross-fetch"
    import {
        initClient as initUrqlClient,
        dedupExchange,
        fetchExchange,
        cacheExchange,
        query,
    } from "@urql/svelte"
    import { persistedFetchExchange } from "@urql/exchange-persisted-fetch"
    import persistedOperations from "../graphql.client.json"

    import { currentUserStore, groupUuid } from "../stores"

    import MainNav from "../comp/layout/MainNav.svelte"
    import Footer from "../comp/layout/Footer.svelte"

    import type { DocumentNode, OperationDefinitionNode } from "graphql"

    import {
        fromValue,
        fromPromise,
        filter,
        merge,
        mergeMap,
        pipe,
        share,
        takeUntil,
    } from "wonka"

    import { makeFetchBody } from "@urql/core/internal"
    import { persistedMutationFetchExchange } from "../persistedMutationFetchExchange"

    async function generateHash(
        _query: string,
        document: DocumentNode
    ): Promise<string> {
        // Note that we're assuming that the first definition is a operation
        // definition rather than a FragmentDefinitionNode.
        // Also we're ignoring the query variable meaning that we
        // cannot just use raw query strings. To change that, return its hash.
        const operationName = (document
            ?.definitions[0] as OperationDefinitionNode)?.name?.value
        if (operationName) {
            return persistedOperations[
                operationName as keyof typeof persistedOperations
            ]
        }
        throw new Error("Failed to resolve persisted operation hash")
    }

    initUrqlClient({
        url: "/graphql",
        fetch,
        exchanges: [
            dedupExchange,
            cacheExchange,
            persistedMutationFetchExchange({
                // Disable until PostGraphile supports queries via GET
                // https://github.com/graphile/postgraphile/issues/442
                preferGetForPersistedQueries: false,
                enforcePersistedQueries: true,
                generateHash,
            }),
            persistedFetchExchange({
                // Disable until PostGraphile supports queries via GET
                // https://github.com/graphile/postgraphile/issues/442
                preferGetForPersistedQueries: false,
                enforcePersistedQueries: true,
                generateHash,
            }),
            fetchExchange,
        ],
    })

    query(currentUserStore)

    export let segment: string | undefined = undefined
    segment = segment // get rid of unused prop warning
    // @ts-ignore (left side of comma operator isn't ignored by svelte)
    $: segment, handlePageChange()

    $: showMainNav = segment !== "login" && segment !== "join"
    $: showFooter = segment !== "chat"
    $: noscroll = segment === "chat"

    onMount(() => {
        // TODO: is this really necessary?
        segment = window.location.pathname.split("/")[1]
        const group = new URL(window.location.href).searchParams.get("group")
        if (group && group.length && uuidValidate(group)) {
            $groupUuid = group
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
            requestPolicy: "network-only",
            transitionId, // This forces a re-execution by changing the object contents.
        }
    }
</script>

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
