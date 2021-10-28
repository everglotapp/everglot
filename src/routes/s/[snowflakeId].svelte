<script lang="ts">
    import { onMount } from "svelte"
    import { stores, goto } from "@sapper/app"
    import { query } from "@urql/svelte"

    import Post from "../../components/feed/Post.svelte"
    import Spinner from "../../components/util/Spinner.svelte"
    import ErrorMessage from "../../components/util/ErrorMessage.svelte"
    import ButtonSmall from "../../components/util/ButtonSmall.svelte"

    import { singlePost, singlePostStore } from "../../stores/feed"

    const { page } = stores()

    let snowflakeId: string = $page.params.snowflakeId

    query(singlePostStore)

    let initialized = false
    onMount(() => {
        $singlePostStore.variables = {
            snowflakeId,
        }
        refreshPost()
        initialized = true
    })

    $: post = $singlePost

    $: if ($page.params.snowflakeId !== snowflakeId) {
        snowflakeId = $page.params.snowflakeId
        if (snowflakeId) {
            singlePostStore.variables = {
                snowflakeId,
            }
            refreshPost()
        }
    }

    const refreshPost = () => {
        $singlePostStore.context = {
            ...$singlePostStore.context,
            pause: true,
        }
        $singlePostStore.context = {
            ...$singlePostStore.context,
            pause: false,
        }
    }

    function handlePostReplySuccess() {
        refreshPost()
    }

    function handlePostLikeSuccess() {
        refreshPost()
    }
    function handlePostUnlikeSuccess() {
        refreshPost()
    }
    function handlePostGameAnswerSuccess() {
        refreshPost()
    }
    function handlePostCorrectSuccess() {
        refreshPost()
    }
</script>

{#if snowflakeId}
    <div class="container max-w-2xl pt-4 pb-2 px-2">
        <ButtonSmall
            tag="a"
            href="/"
            color="PRIMARY"
            variant="OUTLINED"
            on:click={() => goto("/", { replaceState: false })}
            >Back</ButtonSmall
        >
    </div>
    {#if post === null}
        {#if !initialized || $singlePostStore.fetching}
            <div
                class="container max-w-2xl my-16 flex items-center justify-center"
            >
                <Spinner />
            </div>
        {:else if !$singlePostStore.data || $singlePostStore.error}
            <div class="container max-w-2xl my-4">
                <ErrorMessage>Post not found.</ErrorMessage>
            </div>
        {/if}
    {:else}
        <div class="container max-w-2xl pt-4 px-3 sm:px-0 gap-y-1">
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
                        createdAt={post.createdAt}
                        prompt={post.prompt}
                        corrections={post.corrections}
                        language={post.language}
                        forceShowReplies={true}
                        on:replySuccess={handlePostReplySuccess}
                        on:likeSuccess={handlePostLikeSuccess}
                        on:unlikeSuccess={handlePostUnlikeSuccess}
                        on:gameAnswerSuccess={handlePostGameAnswerSuccess}
                        on:correctSuccess={handlePostCorrectSuccess}
                    />
                </div>
            {/if}
        </div>
    {/if}
{/if}
