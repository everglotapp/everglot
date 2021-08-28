<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { goto } from "@sapper/app"

    import { query } from "@urql/svelte"

    import { userHasCompletedProfile } from "../stores"
    import { allPostsStore, allPosts } from "../stores/feed"
    import { currentUserStore } from "../stores/currentUser"

    import Post from "../comp/feed/Post.svelte"
    import PostForm from "../comp/feed/PostForm.svelte"

    query(allPostsStore)
    query(currentUserStore)

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
              .map((post) => post!)
        : []
</script>

<PostForm />
<div class="container max-w-2xl p-2 gap-y-1">
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

    :global(.recording) {
        @apply px-2 !important;
    }
</style>
