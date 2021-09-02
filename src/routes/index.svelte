<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { goto } from "@sapper/app"

    import { query } from "@urql/svelte"
    import { scale } from "svelte/transition"
    import {
        XCircleIcon,
        ZapIcon,
        ChevronDownIcon,
        ChevronUpIcon,
    } from "svelte-feather-icons"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import { userHasCompletedProfile } from "../stores"
    import { allPostsStore, allPosts } from "../stores/feed"
    import { currentUserStore } from "../stores/currentUser"

    import Post from "../comp/feed/Post.svelte"
    import PostForm from "../comp/feed/PostForm.svelte"
    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import BrowserTitle from "../comp/layout/BrowserTitle.svelte"

    import { PromptType } from "../types/generated/graphql"
    import type { Language } from "../types/generated/graphql"
    import { languageCodeMappings } from "../stores"
    import { SUPPORTED_LOCALES, PROMPT_LOCALES } from "../constants"
    import type { SupportedLocale } from "../constants"

    query(languageCodeMappings)

    query(allPostsStore)
    query(currentUserStore)

    let languagePicker: HTMLSelectElement | undefined
    let languagePickerFocused: boolean = false
    let pickedLocale: SupportedLocale | undefined = "en"
    $: pickedLanguage = pickedLocale
        ? languages.find((language) => language.alpha2 === pickedLocale)
        : null

    $: promptsSupportedForPickedLocale = (
        PROMPT_LOCALES as readonly string[]
    ).includes(pickedLocale as string)

    let languages: Pick<Language, "englishName" | "alpha2">[] = []
    $: if (!$languageCodeMappings.fetching && $languageCodeMappings.data) {
        languages =
            $languageCodeMappings.data?.languages?.nodes
                .filter(Boolean)
                .map((node) => node!) || []
    }
    type LanguageItem = { value: string; label: string }
    let items: LanguageItem[] = []
    $: items = languages
        .filter((language) =>
            (SUPPORTED_LOCALES as readonly string[]).includes(
                language.alpha2.toLowerCase()
            )
        )
        .map(({ alpha2, englishName }) => ({
            value: alpha2,
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

    onMount(() => {
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
    })

    onDestroy(() => {
        clearRedirectTimeout()
    })

    $: posts = $allPosts
        ? $allPosts
              .filter((post) => post && !post.parentPost)
              .filter((post) =>
                  pickedLocale
                      ? post!.language && post!.language.alpha2 === pickedLocale
                      : true
              )
              .map((post) => post!)
        : []

    $: {
        if (languagePicker) {
            if (languagePickerFocused) {
                languagePicker.focus()
            } else {
                languagePicker.blur()
            }
        }
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
    const refreshPosts = () => {
        $allPostsStore.context = {
            ...$allPostsStore.context,
            paused: true,
        }
        $allPostsStore.context = {
            ...$allPostsStore.context,
            paused: false,
        }
    }

    function handlePostSuccess() {
        refreshPosts()
        unsetPrompt()
    }
</script>

<Localized id="index-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

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
                    on:click={handleShuffle}
                    ><ZapIcon size="24" class="mr-2" /><span
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
                on:focus={() => (languagePickerFocused = true)}
                on:blur={() => (languagePickerFocused = false)}
                bind:this={languagePicker}
                bind:value={pickedLocale}
            >
                {#each items as item}
                    <option value={item.value}
                        ><Localized id={`locale-${item.value}`} /></option
                    >
                {/each}
            </select>
            <ButtonSmall
                on:click={() =>
                    (languagePickerFocused = !languagePickerFocused)}
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
                    {#if languagePickerFocused}
                        <ChevronUpIcon size="18" />
                    {:else}
                        <ChevronDownIcon size="18" />
                    {/if}
                </div>
            </ButtonSmall>
        </div>
    </div>
    {#if shownPrompt && promptsSupportedForPickedLocale}
        <div
            class="pt-8 pb-4 px-4 font-secondary relative"
            in:scale={{ duration: 200 }}
            out:scale={{ duration: 200 }}
        >
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
                on:click={() => unsetPrompt()}
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
    handleSuccess={handlePostSuccess}
/>
<div class="container max-w-2xl py-2 px-3 sm:px-0 gap-y-1">
    {#each posts as post (post.uuid)}
        {#if post.author}
            <div class="post">
                <Post
                    uuid={post.uuid}
                    body={post.body}
                    author={post.author}
                    likes={post.likes}
                    replies={post.replies}
                    recordings={post.recordings}
                    createdAt={post.createdAt}
                    prompt={post.prompt}
                    language={post.language}
                />
            </div>
        {/if}
    {/each}
</div>

<style>
    [placeholder]:empty::before {
        content: attr(placeholder);

        @apply text-gray;
    }

    [placeholder]:empty:focus::before {
        content: "";
    }

    .post:not(:last-child) {
        @apply border-b;
        @apply border-gray-200;
    }

    .language-select-wrapper {
        @apply relative;

        width: 8rem;
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
