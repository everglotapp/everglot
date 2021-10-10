<script lang="ts">
    import { stores } from "@sapper/app"
    import { operationStore, query } from "@urql/svelte"

    import Post from "../../comp/feed/Post.svelte"
    import Spinner from "../../comp/util/Spinner.svelte"
    import ErrorMessage from "../../comp/util/ErrorMessage.svelte"

    import { SinglePost } from "../../types/generated/graphql"
    import type { SinglePostQuery } from "../../types/generated/graphql"

    const { page } = stores()

    let snowflakeId: string = $page.params.snowflakeId

    const singlePostStore = operationStore<SinglePostQuery>(SinglePost)
    singlePostStore.variables = {
        snowflakeId,
    }
    query(singlePostStore)

    $: post =
        $singlePostStore.data && !$singlePostStore.error
            ? $singlePostStore.data.posts?.nodes[0] || null
            : null

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
            paused: true,
        }
        $singlePostStore.context = {
            ...$singlePostStore.context,
            paused: false,
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
</script>

{#if snowflakeId}
    {#if post === null}
        {#if $singlePostStore.fetching}
            <div
                class="container max-w-2xl my-16 flex items-center justify-center"
            >
                <Spinner />
            </div>
        {:else}
            <div class="container max-w-2xl my-4">
                <ErrorMessage>Post not found.</ErrorMessage>
            </div>
        {/if}
    {:else}
        <div class="container max-w-2xl pt-4 sm:py-8 px-3 sm:px-0 gap-y-1">
            {#if post.author}
                <div class="post">
                    <Post
                        uuid={post.uuid}
                        body={post.body}
                        author={post.author}
                        likes={post.likes}
                        replies={post.replies}
                        games={post.games}
                        recordings={post.recordings}
                        createdAt={post.createdAt}
                        prompt={post.prompt}
                        language={post.language}
                        forceShowReplies={true}
                        on:replySuccess={handlePostReplySuccess}
                        on:likeSuccess={handlePostLikeSuccess}
                        on:unlikeSuccess={handlePostUnlikeSuccess}
                    />
                </div>
            {/if}
        </div>
    {/if}
{/if}
