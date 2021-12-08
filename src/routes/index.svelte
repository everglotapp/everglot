<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { scale } from "svelte/transition"
    import { goto } from "@sapper/app"

    import { query } from "@urql/svelte"
    import { v4 as uuidv4 } from "uuid"
    import {
        XCircleIcon,
        ZapIcon,
        ChevronDownIcon,
        ChevronUpIcon,
    } from "svelte-feather-icons"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import { userHasCompletedProfile } from "../stores"
    import {
        feedPostsStore,
        feedPosts,
        singlePostStore,
        singlePost,
    } from "../stores/feed"
    import { currentUser, currentUserStore } from "../stores/currentUser"

    import Post from "../components/feed/Post.svelte"
    import PostForm from "../components/feed/PostForm.svelte"
    import ButtonSmall from "../components/util/ButtonSmall.svelte"
    import ClickAwayListener from "../components/util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../components/util/EscapeKeyListener.svelte"
    import Spinner from "../components/util/Spinner.svelte"
    import BrowserTitle from "../components/layout/BrowserTitle.svelte"

    import {
        FeedPostsQueryVariables,
        PromptType,
    } from "../types/generated/graphql"
    import type { Language } from "../types/generated/graphql"
    import { languageCodeMappings } from "../stores"
    import { SUPPORTED_LOCALES, PROMPT_LOCALES } from "../constants"
    import type { SupportedLocale } from "../constants"
    import { feedLocale } from "../stores/locales"
    import { localeIsSupported } from "../helpers/locales"
    import { trackEvent } from "./_helpers/analytics"

    query(languageCodeMappings)

    query(feedPostsStore)
    query(singlePostStore)
    query(currentUserStore)

    let languageButtonFocused: boolean = false
    let pickedLocale: SupportedLocale | undefined = "en"

    $: promptsSupportedForPickedLocale = (
        PROMPT_LOCALES as readonly string[]
    ).includes(pickedLocale as string)

    let languages: Pick<Language, "englishName" | "alpha2">[] = []
    $: if (!$languageCodeMappings.fetching && $languageCodeMappings.data) {
        languages =
            ($languageCodeMappings.data?.languages?.nodes.filter(
                Boolean
            ) as Pick<Language, "englishName" | "alpha2">[]) || []
    }
    type LanguageItem = { value: SupportedLocale; label: string }
    let items: LanguageItem[] = []
    $: items = languages
        .filter(({ alpha2 }) => localeIsSupported(alpha2.toLowerCase()))
        .map(({ alpha2, englishName }) => ({
            value: alpha2 as SupportedLocale,
            label: englishName,
        }))

    interface Prompt {
        type: PromptType
        content: string
        uuid: string
    }
    let prompt: Record<SupportedLocale, Prompt | null> = Object.fromEntries(
        SUPPORTED_LOCALES.map((locale) => [locale, null])
    ) as Record<SupportedLocale, null>

    let redirectTimeout: number | null = null

    function clearRedirectTimeout(): void {
        if (redirectTimeout) {
            clearTimeout(redirectTimeout)
            redirectTimeout = null
        }
    }
    $: if ($userHasCompletedProfile) {
        clearRedirectTimeout()
    }

    let languageButtonId: string
    let languageButtonDropdownId: string
    onMount(() => {
        $feedLocale = pickedLocale || "en"
        if ($currentUserStore.stale) {
            if (redirectTimeout === null) {
                redirectTimeout = window.setTimeout(() => {
                    if (!$userHasCompletedProfile) {
                        goto("/signup", { replaceState: true, noscroll: false })
                        clearRedirectTimeout()
                    }
                }, 800)
            }
        }
        languageButtonId = uuidv4()
        languageButtonDropdownId = uuidv4()
    })

    onDestroy(() => {
        clearRedirectTimeout()
    })

    let postsFetchedBeforeByLocale: Partial<Record<SupportedLocale, boolean>> =
        {}
    $: postsFetchedBeforeForLocale =
        $feedLocale === null
            ? false
            : Boolean(postsFetchedBeforeByLocale[$feedLocale])
    $: if (
        !$feedPostsStore.fetching &&
        $feedPostsStore.data &&
        $feedPostsStore.variables?.locale === $feedLocale &&
        !postsFetchedBeforeByLocale[$feedLocale]
    ) {
        postsFetchedBeforeByLocale[$feedLocale] = true
    }
    const postsByLocale: Partial<
        Record<
            SupportedLocale,
            NonNullable<
                NonNullable<
                    NonNullable<
                        NonNullable<
                            NonNullable<
                                typeof $feedPostsStore["data"]
                            >["feedPosts"]
                        >["edges"][number]
                    >["node"]
                >[]
            >
        >
    > = {}
    $: if (
        $feedPosts &&
        !$feedPostsStore.fetching &&
        $feedPostsStore.variables?.locale &&
        localeIsSupported($feedPostsStore.variables.locale)
    ) {
        const fetchedForLocale = $feedPostsStore.variables
            .locale as SupportedLocale
        const previous = postsByLocale[fetchedForLocale] || []
        const arriving = $feedPosts

        let dirty = false
        const next = []
        for (const post of previous) {
            const idxToReplace = arriving.findIndex(
                (arrivingPost) => arrivingPost.uuid === post!.uuid
            )
            if (idxToReplace !== -1) {
                next.push(arriving[idxToReplace])
                arriving.splice(idxToReplace, 1)
                dirty = true
            } else {
                next.push(post)
            }
        }
        for (const post of arriving) {
            dirty = true
            next.push(post)
        }

        if (dirty) {
            postsByLocale[fetchedForLocale] = next
        }
    }
    $: posts = $feedLocale === null ? [] : postsByLocale[$feedLocale] || []

    let feedLocaleInitialized = false
    $: if (
        !$currentUserStore.fetching &&
        $currentUser !== null &&
        !feedLocaleInitialized
    ) {
        if ($currentUser.preference?.feedLanguage?.alpha2) {
            if (
                localeIsSupported($currentUser.preference.feedLanguage.alpha2)
            ) {
                pickedLocale = $currentUser.preference.feedLanguage
                    .alpha2 as SupportedLocale
                $feedLocale = pickedLocale
            }
        }
        feedLocaleInitialized = true
    }

    let previouslyPickedLocale: SupportedLocale | undefined = "en"
    $: if (pickedLocale && pickedLocale !== previouslyPickedLocale) {
        if (feedLocaleInitialized) {
            trackEvent("Feed", "PickLocale", pickedLocale)
        }
        fetch(`/preferences/update`, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ feedLocale: pickedLocale }),
        })
        previouslyPickedLocale = pickedLocale
        $feedLocale = pickedLocale
        if ($feedLocale !== null) {
            // just for good measure, initialize this
            if (!postsFetchedBeforeByLocale.hasOwnProperty($feedLocale)) {
                postsFetchedBeforeByLocale[$feedLocale] = false
            }
        }
    }
    function handlePickLocale(locale: SupportedLocale) {
        pickedLocale = locale
        languageButtonFocused = false
    }

    async function handleShuffle() {
        if (
            !pickedLocale ||
            !(PROMPT_LOCALES as readonly string[]).includes(
                pickedLocale as string
            )
        ) {
            return
        }
        const response = await fetch(`/prompts/get?locale=${pickedLocale}`, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        const res = await response.json()
        if (!res.hasOwnProperty("success")) {
            return
        }
        if (res.success !== true || !res.data) {
            return
        }
        prompt[pickedLocale] = res.data.prompt
    }

    $: shownPrompt = pickedLocale ? prompt[pickedLocale] : null

    function unsetPrompt() {
        if (pickedLocale) {
            prompt[pickedLocale] = null
        }
    }
    const fetchFeedPosts = (variables?: Partial<FeedPostsQueryVariables>) => {
        $feedPostsStore.context = {
            ...$feedPostsStore.context,
            pause: true,
        }
        $feedPostsStore.variables = {
            locale: $feedLocale || "",
            afterUuid: null,
            ...(variables || {}),
        }
        if ($feedLocale !== null) {
            $feedPostsStore.context = {
                ...$feedPostsStore.context,
                pause: false,
            }
        }
    }
    // Refresh posts whenever user changes locale.
    $: if (feedLocaleInitialized && $feedLocale) {
        fetchFeedPosts()
    }

    function refreshSinglePost(snowflakeId: string) {
        $singlePostStore.context = {
            pause: true,
        }
        $singlePostStore.variables = {
            snowflakeId,
        }
        $singlePostStore.context = {
            pause: false,
        }
    }
    $: if (
        !$singlePostStore.fetching &&
        $singlePost &&
        $singlePost.language?.alpha2 &&
        localeIsSupported($singlePost.language?.alpha2)
    ) {
        const fetchedForLocale = $singlePost.language.alpha2 as SupportedLocale
        const previous = postsByLocale[fetchedForLocale] || []
        const arriving = $singlePost

        const next = [...previous]
        const idxToReplace = previous.findIndex(
            (previousPost) => previousPost.uuid === arriving.uuid
        )
        if (idxToReplace === -1) {
            next.unshift(arriving)
        } else {
            next[idxToReplace] = arriving
        }
        postsByLocale[fetchedForLocale] = next
    }

    type PostEvent = CustomEvent<{ post: { snowflakeId: string } }>

    function handlePostSuccess(event: PostEvent) {
        refreshSinglePost(event.detail.post.snowflakeId)
        unsetPrompt()
    }
    function handlePostReplySuccess(event: PostEvent) {
        refreshSinglePost(event.detail.post.snowflakeId)
    }
    function handlePostLikeSuccess(event: PostEvent) {
        refreshSinglePost(event.detail.post.snowflakeId)
    }
    function handlePostUnlikeSuccess(event: PostEvent) {
        refreshSinglePost(event.detail.post.snowflakeId)
    }
    function handlePostGameAnswerSuccess(event: PostEvent) {
        refreshSinglePost(event.detail.post.snowflakeId)
    }
    function handlePostCorrectSuccess(event: PostEvent) {
        refreshSinglePost(event.detail.post.snowflakeId)
    }

    $: lastUuid = posts.length ? posts[posts.length - 1].uuid : null
    const fetchOlderPosts = () => fetchFeedPosts({ afterUuid: lastUuid })

    // Older posts don't exist if posts fetched and empty
    // Older posts exist if posts havent been fetched yet
    $: olderPostsCouldExistForLocale =
        !postsFetchedBeforeForLocale ||
        (postsFetchedBeforeForLocale && lastUuid !== null)

    let scrollY: number
    let innerHeight: number
    const FETCH_OLDER_MAX_SCROLL_BOTTOM_PX = 1500
    let fetchOlderPostsTimeout: number | undefined
    const fetchOlderPostsIfNecessary = () => {
        if (olderPostsCouldExistForLocale) {
            fetchOlderPosts()
        }
        fetchOlderPostsTimeout = undefined
    }
    const debounceFetchOlderPostsIfNecessary = () => {
        window.clearTimeout(fetchOlderPostsTimeout)
        fetchOlderPostsTimeout = window.setTimeout(
            fetchOlderPostsIfNecessary,
            250
        )
    }
    function handleWindowScroll() {
        setTimeout(() => {
            const { scrollHeight } = document.body
            const windowScrollTop = scrollY + innerHeight
            const scrollDistanceFromBottom = scrollHeight - windowScrollTop
            if (scrollDistanceFromBottom < FETCH_OLDER_MAX_SCROLL_BOTTOM_PX) {
                debounceFetchOlderPostsIfNecessary()
            }
        }, 15)
    }
</script>

<svelte:window bind:scrollY bind:innerHeight on:scroll={handleWindowScroll} />

<Localized id="index-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

{#if feedLocaleInitialized}
    <div class="container max-w-2xl pt-4 px-2">
        <div
            class="flex flex-row items-center justify-between w-full flex-nowrap mb-2"
        >
            <div>
                {#if promptsSupportedForPickedLocale}
                    <ButtonSmall
                        className="items-center"
                        tag="button"
                        variant={shownPrompt ? "OUTLINED" : "FILLED"}
                        on:click={() => {
                            trackEvent(
                                "Feed",
                                shownPrompt
                                    ? "ClickShufflePrompts"
                                    : "ClickShufflePromptsInitial"
                            )
                            handleShuffle()
                        }}
                        ><ZapIcon size="20" class="mr-2" /><span
                            class="hidden sm:inline"
                            >{#if shownPrompt}
                                <Localized
                                    id="index-shuffle-prompts-button-prompt-shown"
                                />
                            {:else}
                                <Localized
                                    id="index-shuffle-prompts-button-initial"
                                />
                            {/if}</span
                        ><span class="inline sm:hidden"
                            >{#if shownPrompt}
                                <Localized
                                    id="index-shuffle-prompts-button-prompt-shown-mobile"
                                />
                            {:else}
                                <Localized
                                    id="index-shuffle-prompts-button-initial-mobile"
                                />
                            {/if}</span
                        ></ButtonSmall
                    >
                {/if}
            </div>
            <div class="language-select-wrapper">
                <select
                    class="language-select rounded-lg"
                    bind:value={pickedLocale}
                    aria-labelledby={languageButtonId}
                >
                    {#each items as item}
                        <option value={item.value}
                            ><Localized id={`locale-${item.value}`} /></option
                        >
                    {/each}
                </select>
                <ButtonSmall
                    id={languageButtonId}
                    on:click={() => {
                        languageButtonFocused = !languageButtonFocused
                        trackEvent(
                            "Feed",
                            languageButtonFocused
                                ? "ClickOpenLocaleDropdown"
                                : "ClickCloseLocaleDropdown"
                        )
                    }}
                    variant="TEXT"
                    tag="button"
                    color="SECONDARY"
                    className="language-button flex items-center text-gray-bitdark font-secondary font-bold relative"
                >
                    <span class="overflow-hidden overflow-ellipsis">
                        {#if pickedLocale}
                            <Localized id={`locale-${pickedLocale}`} />
                        {:else}
                            Pick …
                        {/if}</span
                    >
                    <div class="pl-5 flex items-center">
                        {#if languageButtonFocused}
                            <ChevronUpIcon size="18" />
                        {:else}
                            <ChevronDownIcon size="18" />
                        {/if}
                    </div>
                </ButtonSmall>
                {#if languageButtonFocused}
                    <div
                        id={languageButtonDropdownId}
                        class="relative language-button-dropdown"
                    >
                        <ul>
                            {#each items as item}
                                <li
                                    value={item.value}
                                    aria-selected={item.value === pickedLocale}
                                    on:click={() => {
                                        handlePickLocale(item.value)
                                    }}
                                >
                                    <div class="py-1 px-3">
                                        <Localized
                                            id={`locale-${item.value}`}
                                        />
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    </div>
                    <ClickAwayListener
                        elementId={[languageButtonDropdownId, languageButtonId]}
                        on:clickaway={() => {
                            trackEvent("Feed", "ClickAwayCloseLocaleDropdown")
                            languageButtonFocused = false
                        }}
                    />
                    <EscapeKeyListener
                        on:keydown={() => {
                            trackEvent("Feed", "EscapeCloseLocaleDropdown")
                            languageButtonFocused = false
                        }}
                    />
                {/if}
            </div>
        </div>
        {#if shownPrompt && promptsSupportedForPickedLocale}
            <div class="pt-8 pb-4 px-4 font-secondary relative">
                {#if shownPrompt.type === PromptType.Question}
                    <div class="font-bold text-2xl text-center">
                        {shownPrompt.content}
                    </div>
                {:else if shownPrompt.type === PromptType.Word}
                    <div class="font-bold text-4xl text-center mb-2">
                        {shownPrompt.content}
                    </div>
                    <div class="text-lg text-gray text-center">
                        <Localized id="index-prompt-instruction-word" />
                    </div>
                {/if}
                <ButtonSmall
                    tag="button"
                    variant="TEXT"
                    on:click={() => {
                        trackEvent("Feed", "ClickClosePrompt")
                        unsetPrompt()
                    }}
                    className="close-prompt-button"
                >
                    <XCircleIcon size="32" strokeWidth={1} />
                </ButtonSmall>
            </div>
        {/if}
    </div>
    <PostForm
        shownPromptUuid={shownPrompt ? shownPrompt.uuid : null}
        locale={pickedLocale || null}
        eventCategory="Feed_PostForm"
        on:postSuccess={handlePostSuccess}
    />
    <div class="container max-w-2xl py-2 pl-3 pr-2 sm:px-0 gap-y-1">
        {#each posts as post (post.uuid)}
            {#if post.author}
                <div class="post">
                    <Post
                        uuid={post.uuid}
                        snowflakeId={post.snowflakeId}
                        body={post.body}
                        author={post.author}
                        likes={post.likes}
                        replies={post.replies}
                        games={post.games}
                        recordings={post.recordings}
                        corrections={post.corrections}
                        createdAt={post.createdAt}
                        prompt={post.prompt}
                        language={post.language}
                        on:replySuccess={handlePostReplySuccess}
                        on:likeSuccess={handlePostLikeSuccess}
                        on:unlikeSuccess={handlePostUnlikeSuccess}
                        on:gameAnswerSuccess={handlePostGameAnswerSuccess}
                        on:correctSuccess={handlePostCorrectSuccess}
                    />
                </div>
            {/if}
        {/each}
        {#if $feedPostsStore.fetching}
            <div
                class={`flex items-center justify-center py-2${
                    $feedLocale === null ||
                    postsFetchedBeforeByLocale[$feedLocale]
                        ? ""
                        : " md:py-8"
                }`}
                in:scale={{ duration: 100 }}
            >
                <Spinner />
            </div>
        {/if}
    </div>
{/if}

<style>
    .post:not(:last-child) {
        @apply border-b;
        @apply border-gray-200;
    }

    .language-select-wrapper {
        @apply relative;

        width: 9rem;
        height: 2.7rem;
    }

    :global(.language-button),
    .language-select {
        @apply absolute;
        @apply left-0;
        @apply top-0;
        @apply right-0;
        @apply bottom-0;
        @apply w-full;
        @apply h-full;
    }

    :global(.language-button) {
        border: 0;
        border-bottom-width: 3px !important;
        border-bottom-style: solid !important;

        @apply border-gray-bitdark !important;
        @apply rounded-none !important;
        @apply py-1 !important;
        @apply hidden !important;
        @apply justify-between !important;
        @apply bg-white;
        @apply px-1 !important;
    }

    .language-select {
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
        background-repeat: no-repeat;
        background-position-x: calc(100% - 0.5rem);
        background-position-y: 0.5rem;
        padding: 0 2.15rem 0 0.5rem;
        border: 0 none;
    }

    @media (hover: hover) {
        :global(.language-button) {
            @apply flex !important;
        }
        .language-select:focus + :global(.language-button) {
            @apply hidden !important;
        }
    }

    .language-button-dropdown {
        max-height: calc(min(280px, 50vh));
        bottom: -2px;
        top: 100%;

        @apply w-full;
        @apply z-10;
        @apply overflow-y-auto;
        @apply overflow-x-hidden;
        @apply border;
        @apply border-gray-light;
        @apply shadow-sm;
        @apply rounded-b-md;
    }

    .language-button-dropdown ul {
        @apply w-full;
    }

    .language-button-dropdown ul li {
        @apply bg-white;
        @apply cursor-pointer;
        @apply font-bold;
        @apply relative;
        @apply text-gray-bitdark;
        @apply font-secondary;
        @apply text-base;

        padding-top: 2px;
        padding-bottom: 2px;
    }

    .language-button-dropdown ul li:hover {
        @apply bg-primary-lightest;
    }

    .language-button-dropdown ul li[aria-selected="true"] {
        @apply font-bold;
        @apply text-primary;
    }

    .language-button-dropdown ul li[aria-selected="true"]::before {
        @apply bg-primary;
        @apply inline-flex;
        @apply absolute;
        @apply top-0;
        @apply bottom-0;

        width: 3px;
        content: "";
    }

    :global(.close-prompt-button) {
        top: -0.25rem;
        right: -0.5rem;

        @apply text-gray;
        @apply absolute;
    }

    :global(.close-prompt-button:hover) {
        @apply bg-transparent !important;
    }
</style>
