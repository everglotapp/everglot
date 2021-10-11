<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte"
    import { scale } from "svelte/transition"
    import { svelteTime } from "svelte-time"
    import { v4 as uuidv4 } from "uuid"
    import {
        HeartIcon,
        MessageCircleIcon,
        XIcon,
        SendIcon,
        ZapIcon,
        ChevronUpIcon,
        ChevronDownIcon,
        EyeOffIcon,
        EyeIcon,
    } from "svelte-feather-icons"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { query } from "@urql/svelte"

    import RangeOptionsDropdown from "./RangeOptionsDropdown.svelte"
    import Avatar from "../users/Avatar.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"
    import ButtonLarge from "../util/ButtonLarge.svelte"
    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"

    import {
        currentUser,
        currentUserStore,
        currentUserUuid,
    } from "../../stores/currentUser"

    import type {
        AllPostsQuery,
        GrammaticalCase,
        GrammaticalGender,
    } from "../../types/generated/graphql"
    import { PromptType, PostGameType } from "../../types/generated/graphql"
    import { createPost } from "../../routes/_helpers/posts"
    import {
        BodyPartType,
        GuessCaseOption,
        GuessCaseRange,
        GuessGenderOption,
        GuessGenderRange,
        GUESS_CASE_OPTIONS,
        GUESS_GENDER_OPTIONS,
        PostGameRange,
        SupportedLocale,
    } from "../../constants"
    import { USER_UPLOADED_RECORDINGS_BASE_PATH } from "../../constants"
    import { getBodyParts } from "../../routes/_helpers/posts/selections"
    import { createPostGameAnswer } from "../../routes/_helpers/posts/games"

    query(currentUserStore)

    type PostNode = NonNullable<NonNullable<AllPostsQuery["posts"]>["nodes"][0]>

    export let uuid: string
    export let body: string
    export let createdAt: Date
    export let author: NonNullable<PostNode["author"]>
    export let likes: PostNode["likes"]
    export let replies: PostNode["replies"]
    export let recordings: PostNode["recordings"]
    export let prompt: PostNode["prompt"]
    export let language: PostNode["language"]
    export let games: PostNode["games"]
    export let linkToAuthorProfile: boolean = true
    export let forceShowReplies: boolean = false

    const dispatch = createEventDispatcher()

    let bodyNode: HTMLElement
    let bodyId: string
    let rangeOptionsDropdownId: string
    onMount(() => {
        bodyId = uuidv4()
        rangeOptionsDropdownId = uuidv4()
    })

    $: replyNodes = replies.nodes.filter(Boolean).map((reply) => reply!)

    $: liked =
        likes &&
        likes.nodes &&
        likes.nodes.some(
            (node) => node && node.user && $currentUserUuid === node.user.uuid
        )

    async function handleReply() {
        if (!newReplyBody || !newReplyBody.length) {
            return
        }
        if (!language) {
            return
        }
        const res = await createPost({
            body: newReplyBody,
            locale: language.alpha2 as SupportedLocale,
            parentPostUuid: uuid,
            promptUuid: null,
            gameType: null,
            ranges: null,
        })
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                // success
                newReplyBody = ""
                dispatch("replySuccess")
            } else {
                dispatch("replyFailure")
            }
        } else {
            dispatch("replyFailure")
        }
    }
    let showReplies: boolean = false
    let newReplyBody: string | undefined

    async function handleLike() {
        if (tmpLiked || tmpUnliked) {
            return
        }
        const endpoint = liked ? `/posts/${uuid}/unlike` : `/posts/${uuid}/like`
        if (liked) {
            tmpUnliked = true
        } else {
            tmpLiked = true
        }
        const res = await fetch(endpoint, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        const onSuccess = () =>
            dispatch(tmpLiked ? "likeSuccess" : "unlikeSuccess")
        const onFailure = () =>
            dispatch(tmpLiked ? "likeFailure" : "unlikeFailure")
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                onSuccess()
                setTimeout(() => {
                    tmpLiked = false
                    tmpUnliked = false
                }, 250)
                return
            } else {
                onFailure()
            }
        } else {
            onFailure()
        }
        tmpLiked = false
        tmpUnliked = false
    }
    let tmpLiked = false
    let tmpUnliked = false

    $: game = games.nodes.length ? games.nodes[0] : null
    $: currentUserCreatedGame =
        game === null || $currentUserUuid === null
            ? null
            : $currentUserUuid === author.uuid

    let rangeByUuid: Record<
        string,
        NonNullable<NonNullable<typeof game>["ranges"]["nodes"][number]>
    >
    $: rangeByUuid =
        game?.ranges.nodes.filter(Boolean).reduce(
            (uuidToRange, range) => ({
                ...uuidToRange,
                [range!.uuid]: range,
            }),
            {}
        ) || {}

    $: bodyParts = getBodyParts(
        body,
        Object.values(rangeByUuid).map((range) => ({
            start: range.startIndex,
            end: range.endIndex,
            uuid: range.uuid,
        })) || []
    )

    $: currentUserAnswers =
        game === null
            ? []
            : game.answersByCurrentUser.nodes
                  .filter(Boolean)
                  .map((node) => node!)
    let currentUserAnswerByRangeUuid: Record<
        string,
        NonNullable<
            NonNullable<typeof game>["answersByCurrentUser"]["nodes"][number]
        >
    >
    $: currentUserAnswerByRangeUuid =
        currentUserAnswers === null
            ? {}
            : currentUserAnswers
                  .filter((answer) => answer.range !== null)
                  .map((answer) => ({ ...answer, range: answer.range! }))
                  .reduce(
                      (uuidToAnswer, answer) => ({
                          ...uuidToAnswer,
                          [answer.range.uuid]: answer,
                      }),
                      {}
                  )
    $: currentUserHasAnsweredOrRevealed =
        game === null
            ? null
            : currentUserAnswers.length || game.revealedByCurrentUser
    $: currentUserCanAnswer =
        !currentUserCreatedGame && !currentUserHasAnsweredOrRevealed
    $: correctAnswers =
        game === null || !game.correctAnswers.nodes.length
            ? null
            : game.correctAnswers.nodes.filter(Boolean).map((node) => node!)
    let correctAnswerByRangeUuid: Record<
        string,
        NonNullable<NonNullable<typeof game>["correctAnswers"]["nodes"][number]>
    >
    $: correctAnswerByRangeUuid =
        correctAnswers === null
            ? {}
            : correctAnswers.reduce(
                  (uuidToAnswer, answer) => ({
                      ...uuidToAnswer,
                      [answer.rangeUuid]: answer,
                  }),
                  {}
              )
    let displayedAnswerByRangeUuid: Record<
        string,
        | NonNullable<
              NonNullable<typeof game>["answersByCurrentUser"]["nodes"][number]
          >
        | NonNullable<
              NonNullable<typeof game>["correctAnswers"]["nodes"][number]
          >
    >
    $: displayedAnswerByRangeUuid =
        game === null
            ? {}
            : Object.keys(rangeByUuid).reduce(
                  (uuidToAnswer, uuid) => ({
                      ...uuidToAnswer,
                      [uuid]: game!.revealedByCurrentUser
                          ? correctAnswerByRangeUuid[uuid]
                          : currentUserAnswerByRangeUuid[uuid] ||
                            correctAnswerByRangeUuid[uuid],
                  }),
                  {}
              )

    let answerRangeUuid: string | null = null
    let answerRanges: Record<string, PostGameRange | null> = {}
    function handleAnswerRange(uuid: string) {
        answerRangeUuid = uuid
    }
    function handlePickAnswer(range: PostGameRange) {
        if (answerRangeUuid === null) {
            return
        }
        answerRanges[answerRangeUuid] = range
    }
    function handleRemoveAnswer() {
        if (answerRangeUuid === null) {
            return
        }
        delete answerRanges[answerRangeUuid]
        answerRanges = answerRanges
    }
    $: answerRangeElement =
        answerRangeUuid === null
            ? null
            : document.getElementById(answerRangeUuid)
    function handlePickGuessCaseOption(
        event: CustomEvent<{ option: { value: keyof GuessCaseOption } }>
    ) {
        const { option } = event.detail
        if (answerRangeUuid === null) {
            return
        }
        const range = rangeByUuid[answerRangeUuid] || null
        if (range === null) {
            handleRemoveAnswer()
        } else {
            handlePickAnswer({
                start: range.startIndex,
                end: range.endIndex,
                uuid: answerRangeUuid,
                option: option.value,
            } as GuessCaseRange)
        }
        answerRangeUuid = null
    }

    function handlePickGuessGenderOption(
        event: CustomEvent<{ option: { value: keyof GuessGenderOption } }>
    ) {
        const { option } = event.detail
        if (answerRangeUuid === null) {
            return
        }
        const range = rangeByUuid[answerRangeUuid] || null
        if (range === null) {
            handleRemoveAnswer()
        } else {
            handlePickAnswer(
                (answerRanges[answerRangeUuid] = {
                    start: range.startIndex,
                    end: range.endIndex,
                    uuid: answerRangeUuid,
                    option: option.value,
                } as GuessGenderRange)
            )
        }
        answerRangeUuid = null
    }

    async function handleSubmitAnswers() {
        if (!game) {
            return
        }
        showCorrectAnswers = !showCorrectAnswers
        if (currentUserCreatedGame) {
            // Just show answers, cannot answer own game.
            return
        }
        if (currentUserHasAnsweredOrRevealed) {
            // No need to submit, we already know the correct answers.
            return
        }
        let answers: {
            rangeUuid: string
            caseOption?: GrammaticalCase
            genderOption?: GrammaticalGender
            clozeAnswer?: string | undefined
        }[] = []
        if (game.gameType === PostGameType.GuessCase) {
            answers = Object.entries(answerRanges)
                .filter(([_uuid, range]) => Boolean(range))
                .map(([uuid, range]) => ({
                    rangeUuid: uuid,
                    caseOption: (range! as GuessCaseRange).option,
                }))
        } else if (game.gameType === PostGameType.GuessGender) {
            answers = Object.entries(answerRanges)
                .filter(([_uuid, range]) => Boolean(range))
                .map(([uuid, range]) => ({
                    rangeUuid: uuid,
                    genderOption: (range! as GuessGenderRange).option,
                }))
        } else if (game.gameType === PostGameType.Cloze) {
        } else {
            return
        }
        const onSuccess = () => dispatch("gameAnswerSuccess")
        const onFailure = () => {
            dispatch("gameAnswerFailure")
            if (showCorrectAnswers) {
                showCorrectAnswers = false
            }
        }
        const res = await createPostGameAnswer({ gameUuid: game.uuid, answers })
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                onSuccess()
            } else {
                onFailure()
            }
        } else {
            onFailure()
        }
    }
    // TOOD: Check for Cloze as well
    $: anyRangeAnswered = Object.values(answerRanges).some(Boolean)
    let showCorrectAnswers: boolean = false
</script>

<div
    class="root py-3 sm:py-4 sm:px-3 gap-y-1"
    class:liked={liked || tmpLiked}
    class:not-liked={!liked || tmpUnliked}
    in:scale={{ duration: 200 }}
>
    <div class="flex flex-row">
        <div class="pr-3 sm:pr-4">
            {#if linkToAuthorProfile}
                <a href={`/u/${author.username}`}
                    ><Avatar
                        username={author.username}
                        url={author.avatarUrl}
                    /></a
                >
            {:else}
                <Avatar username={author.username} url={author.avatarUrl} />
            {/if}
        </div>
        <div class="w-full">
            <div class="flex items-center justify-between">
                {#if linkToAuthorProfile}
                    <a href={`/u/${author.username}`}
                        ><span class="text-gray-bitdark font-bold"
                            >{author.displayName || author.username}</span
                        ></a
                    >
                {:else}
                    <span class="text-gray-bitdark font-bold"
                        >{author.displayName || author.username}</span
                    >
                {/if}
                <time
                    use:svelteTime={{
                        timestamp: createdAt,
                        format:
                            new Date(createdAt).getDate() ===
                            new Date().getDate()
                                ? "h:mm A"
                                : new Date(createdAt).getFullYear() ===
                                  new Date().getFullYear()
                                ? "D MMM h:mm A"
                                : "D MMM YYYY h:mm A",
                    }}
                    title={createdAt.toLocaleString()}
                    class="text-sm text-gray-bitdark"
                />
            </div>
            {#if prompt}
                <div
                    class="prompt-note text-gray font-bold text-sm flex flex-nowrap items-center"
                >
                    {#if prompt.type === PromptType.Word}
                        <ZapIcon size="18" class="mr-2 self-start" /><span
                            ><Localized
                                id="post-prompt-note-word"
                                args={{ word: prompt.content }}
                            /></span
                        >
                    {:else if prompt.type === PromptType.Question}
                        <ZapIcon size="18" class="mr-2 self-start" />
                        <span>{prompt.content}</span>
                    {/if}
                </div>
            {/if}
            {#if game}
                <div
                    class="game-note flex flex-nowrap items-center text-sm text-gray font-bold"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        class="mr-2"
                        role="img"
                        width="18"
                        height="18"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 16 16"
                        ><g fill="currentColor"
                            ><path
                                d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"
                            /><path
                                d="M5.5 4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm-4-4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z"
                            /></g
                        ></svg
                    >{#if currentUserCreatedGame}<span
                            ><Localized
                                id="post-game-note-own"
                                args={{ gameType: game.gameType }}
                            />
                        </span>{:else}<span
                            ><Localized
                                id="post-game-note-other"
                                args={{
                                    username:
                                        author.displayName || author.username,
                                    gameType: game.gameType,
                                }}
                            />
                        </span>{/if}
                </div>
            {/if}
            <div id={bodyId} bind:this={bodyNode} class="body mt-1">
                {#if game && answerRangeUuid !== null && language?.alpha2}
                    <RangeOptionsDropdown
                        id={rangeOptionsDropdownId}
                        anchor={answerRangeElement}
                        container={bodyNode || null}
                        locale={language.alpha2}
                        gameType={game.gameType}
                        editedRange={answerRanges[answerRangeUuid] || null}
                        on:cancel={() => (answerRangeUuid = null)}
                        on:remove={() => {
                            if (answerRangeUuid !== null) {
                                if (
                                    answerRanges.hasOwnProperty(answerRangeUuid)
                                ) {
                                    answerRanges[answerRangeUuid] = null
                                }
                                answerRangeUuid = null
                            }
                        }}
                        showRemove={answerRanges.hasOwnProperty(
                            answerRangeUuid
                        ) && answerRanges[answerRangeUuid] !== null}
                        on:guessCaseOptionPicked={handlePickGuessCaseOption}
                        on:guessGenderOptionPicked={handlePickGuessGenderOption}
                    />
                    <ClickAwayListener
                        elementId={[answerRangeUuid, rangeOptionsDropdownId]}
                        on:clickaway={() => (answerRangeUuid = null)}
                    />
                    <EscapeKeyListener
                        on:keydown={() => (answerRangeUuid = null)}
                    />
                {/if}
                {#each bodyParts as bodyPart}
                    {#if bodyPart.type === BodyPartType.LineBreak}
                        <br id={bodyPart.uuid} />
                    {:else if bodyPart.type === BodyPartType.Range && bodyPart.uuid}
                        {#if game && (game.gameType === PostGameType.GuessCase || game.gameType === PostGameType.GuessGender)}
                            {#if currentUserCanAnswer}
                                <span
                                    id={bodyPart.uuid}
                                    class="body-part-range inline-flex border-b px-1 py-1 mx-1 cursor-pointer"
                                    class:answered={answerRanges.hasOwnProperty(
                                        bodyPart.uuid
                                    ) && answerRanges[bodyPart.uuid] !== null}
                                    class:not-answered={!answerRanges.hasOwnProperty(
                                        bodyPart.uuid
                                    ) || answerRanges[bodyPart.uuid] === null}
                                    on:click={() =>
                                        bodyPart.uuid &&
                                        handleAnswerRange(bodyPart.uuid)}
                                    >{bodyPart.value}</span
                                >
                            {:else if showCorrectAnswers && displayedAnswerByRangeUuid[bodyPart.uuid]}
                                <span
                                    class="inline-flex border-b-2 border-gray-bitdark px-1 py-1 mx-1 relative mb-8"
                                    ><span>{bodyPart.value}</span><span
                                        class="body-part-range-answer absolute flex justify-center font-bold mr-1"
                                        class:skipped={game.revealedByCurrentUser ||
                                            currentUserCreatedGame}
                                        class:correct={!game.revealedByCurrentUser &&
                                            !currentUserCreatedGame &&
                                            Boolean(
                                                currentUserAnswerByRangeUuid[
                                                    bodyPart.uuid
                                                ]
                                            ) &&
                                            currentUserAnswerByRangeUuid[
                                                bodyPart.uuid
                                            ].correct}
                                        class:incorrect={!game.revealedByCurrentUser &&
                                            !currentUserCreatedGame &&
                                            (!Boolean(
                                                currentUserAnswerByRangeUuid[
                                                    bodyPart.uuid
                                                ]
                                            ) ||
                                                !currentUserAnswerByRangeUuid[
                                                    bodyPart.uuid
                                                ].correct)}
                                        style="bottom: -2rem; left: 50%; right: 50%;"
                                        ><Localized
                                            id={game.gameType ===
                                                PostGameType.GuessCase &&
                                            displayedAnswerByRangeUuid[
                                                bodyPart.uuid
                                            ].caseOption
                                                ? `post-game-guess-case-${
                                                      GUESS_CASE_OPTIONS[
                                                          language.alpha2
                                                      ][
                                                          displayedAnswerByRangeUuid[
                                                              bodyPart.uuid
                                                          ].caseOption
                                                      ]
                                                  }`
                                                : game.gameType ===
                                                      PostGameType.GuessGender &&
                                                  displayedAnswerByRangeUuid[
                                                      bodyPart.uuid
                                                  ].genderOption
                                                ? `post-game-guess-gender-${
                                                      GUESS_GENDER_OPTIONS[
                                                          language.alpha2
                                                      ][
                                                          displayedAnswerByRangeUuid[
                                                              bodyPart.uuid
                                                          ].genderOption
                                                      ]
                                                  }`
                                                : ""}
                                        /></span
                                    ></span
                                >
                            {:else}
                                <span class="font-bold text-gray mx-1"
                                    >{bodyPart.value}</span
                                >
                            {/if}
                        {:else if game && game.gameType === PostGameType.Cloze}
                            {#if currentUserCanAnswer}
                                <input
                                    id={bodyPart.uuid}
                                    type="text"
                                    class="inline mx-1"
                                    name={bodyPart.uuid}
                                    style={`width: ${
                                        rangeByUuid[bodyPart.uuid].endIndex -
                                        rangeByUuid[bodyPart.uuid].startIndex +
                                        1 +
                                        2
                                    }em;`}
                                />
                            {:else if showCorrectAnswers && displayedAnswerByRangeUuid[bodyPart.uuid]}
                                <span
                                    class="inline-flex border-b-2 border-gray-bitdark px-1 py-1 mx-1 relative mb-8"
                                    >{displayedAnswerByRangeUuid[bodyPart.uuid]
                                        .clozeAnswer}</span
                                >
                            {:else}
                                <input
                                    id={bodyPart.uuid}
                                    type="text"
                                    class="inline mx-1"
                                    disabled
                                    name={bodyPart.uuid}
                                    style={`width: ${
                                        rangeByUuid[bodyPart.uuid].endIndex -
                                        rangeByUuid[bodyPart.uuid].startIndex +
                                        1 +
                                        2
                                    }em;`}
                                />
                            {/if}
                        {/if}
                    {:else if bodyPart.type === BodyPartType.Text}
                        {bodyPart.value}
                    {/if}
                {/each}
            </div>
            {#if recordings.totalCount && recordings.nodes[0]}
                <div class="pt-2">
                    <audio
                        src={`${USER_UPLOADED_RECORDINGS_BASE_PATH}/${
                            recordings.nodes[0].filename
                        }${
                            recordings.nodes[0].extension
                                ? "." + recordings.nodes[0].extension
                                : ""
                        }`}
                        controls
                        class="rounded-lg"
                        style="max-width: 100%"
                    />
                </div>
            {/if}
            {#if game !== null && $currentUserUuid !== null && $currentUserUuid !== uuid}
                <div class="flex flex-row pt-2 justify-start items-center">
                    <div class="flex relative mr-1">
                        <ButtonSmall
                            className="flex items-center justify-center ml-0 mr-1"
                            tag="button"
                            variant="OUTLINED"
                            color={currentUserCanAnswer && anyRangeAnswered
                                ? "PRIMARY"
                                : "SECONDARY"}
                            on:click={() => handleSubmitAnswers()}
                            >{#if showCorrectAnswers}<EyeIcon
                                    size="16"
                                    class="mr-2"
                                /><span>Hide Answers</span
                                >{:else if !currentUserCanAnswer}<EyeOffIcon
                                    size="16"
                                    class="mr-2"
                                /><span>Review Answers</span
                                >{:else if anyRangeAnswered}<SendIcon
                                    size="16"
                                    class="mr-2"
                                /><span>Submit</span>{:else}<EyeOffIcon
                                    size="16"
                                    class="mr-2"
                                /><span>Reveal Answers</span>{/if}</ButtonSmall
                        >
                    </div>
                    {#if !game.revealedByCurrentUser && currentUserAnswers.length}<div
                            class="flex text-gray-bitdark text-sm"
                        >
                            You got {currentUserAnswers.filter(
                                (answer) => answer.correct
                            ).length}/{game.ranges.nodes.length} correct!
                        </div>{/if}
                </div>
            {/if}
        </div>
    </div>
    <div class="flex flex-row pt-1 justify-end items-center">
        <div class="flex relative mr-1">
            {#if showReplies || forceShowReplies}
                <div
                    contenteditable
                    bind:textContent={newReplyBody}
                    placeholder="Reply"
                    class="border border-gray-bitlight rounded-lg py-1 pl-2 pr-12 origin-right"
                    style="min-width: min(48vw, 417px);"
                    in:scale={{ duration: 150 }}
                    out:scale={{ duration: 150 }}
                />
                <div
                    class="absolute right-0 top-0 bottom-0 flex items-center origin-right"
                    in:scale={{ duration: 150 }}
                    out:scale={{ duration: 150 }}
                >
                    <ButtonSmall
                        tag="button"
                        variant="TEXT"
                        className="reply-send-button"
                        on:click={() => handleReply()}
                        ><SendIcon size="16" /></ButtonSmall
                    >
                </div>
            {/if}
        </div>
        {#if !forceShowReplies}
            {#if showReplies}
                <ButtonSmall
                    className="reply-button close items-center justify-center recording ml-0 mr-1"
                    tag="button"
                    variant="TEXT"
                    color="SECONDARY"
                    on:click={() => (showReplies = !showReplies)}
                    ><XIcon size="16" /><span>Close</span></ButtonSmall
                >
            {:else}
                <ButtonLarge
                    className="reply-button items-center justify-center recording ml-0 mr-1"
                    tag="button"
                    variant="OUTLINED"
                    color="PRIMARY"
                    on:click={() => (showReplies = !showReplies)}
                    ><MessageCircleIcon size="16" /><span
                        class="text-sm text-gray-bitdark font-bold select-none rounded-lg"
                        >{replies?.totalCount || 0} replies</span
                    ></ButtonLarge
                >
            {/if}
        {/if}
        <ButtonLarge
            className="like-button flex items-center justify-center cursor-pointer rounded-lg bg-gray-lightest"
            on:click={() => handleLike()}
            tag="button"
            variant="TEXT"
        >
            <HeartIcon size="18" />
            <span class="text-sm font-bold text-gray-bitdark select-none"
                >{likes ? likes.totalCount : 0}</span
            >
        </ButtonLarge>
    </div>
    {#if showReplies || forceShowReplies}
        <div
            class="origin-top-right"
            class:pb-4={replies?.totalCount && replies?.totalCount > 0}
            in:scale={{ duration: 150 }}
            out:scale={{ duration: 150 }}
        >
            {#each replyNodes as reply (reply.uuid)}
                <div
                    class="reply flex flex-row ml-8 pl-4 pt-4 border-l-2 border-gray-verylight"
                    in:scale|local={{ duration: 200 }}
                >
                    <div class="pr-3 sm:pr-4">
                        <a href={`/u/${reply.author.username}`}>
                            <Avatar
                                username={reply.author.username}
                                url={reply.author.avatarUrl}
                                size={36}
                            /></a
                        >
                    </div>
                    <div class="w-full">
                        <div class="mb-1 flex items-center justify-between">
                            <a href={`/u/${reply.author.username}`}
                                ><span class="text-gray-bitdark font-bold"
                                    >{reply.author.username}</span
                                ></a
                            >
                            <time
                                use:svelteTime={{
                                    timestamp: reply.createdAt,
                                    format:
                                        new Date(reply.createdAt).getDate() ===
                                        new Date().getDate()
                                            ? "h:mm A"
                                            : new Date(
                                                  reply.createdAt
                                              ).getFullYear() ===
                                              new Date().getFullYear()
                                            ? "D MMM h:mm A"
                                            : "D MMM YYYY h:mm A",
                                }}
                                title={reply.createdAt.toLocaleString()}
                                class="text-sm text-gray-bitdark"
                            />
                        </div>
                        <div>
                            {reply.body}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .reply:first-child {
        @apply pt-2;
        @apply mt-2;
    }

    .prompt-note :global(svg) {
        min-width: 18px;
    }

    .game-note :global(svg) {
        min-width: 18px;
    }

    .body-part-range.answered {
        @apply border-primary;
        @apply border-b-2;
    }

    .body-part-range.not-answered {
        @apply bg-primary-lightest;
        @apply border-primary;
    }

    .body-part-range-answer.skipped {
        @apply text-gray-bitdark;
    }

    .body-part-range-answer.correct:not(.skipped) {
        @apply text-green-500;
    }

    .body-part-range-answer.incorrect:not(.skipped) {
        @apply text-danger;
    }

    :global(.reply-button) {
        min-width: 50px;
    }

    :global(.reply-button svg) {
        @apply text-gray-bitdark;
        @apply mr-2;
    }

    :global(.reply-button.close) {
        @apply text-sm;
    }

    :global(.reply-button.close svg) {
        @apply mr-1;
    }

    .liked :global(.like-button) {
        @apply bg-primary-lightest;
    }

    :global(.like-button) {
        @apply px-2 !important;

        min-width: 54px;
    }

    :global(.like-button svg) {
        @apply mr-2;
    }

    .liked :global(.like-button svg) {
        animation: like-animation 200ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        fill: theme("colors.red.600");

        @apply text-red-500;
    }

    .not-liked :global(.like-button svg) {
        @apply text-gray;
    }

    :global(.reply-send-button) {
        @apply rounded-tl-none !important;
        @apply rounded-bl-none !important;
    }

    :global(.reply-send-button:focus) {
        @apply border-transparent !important;
        @apply bg-transparent !important;
    }

    @keyframes like-animation {
        0% {
            transform: scale(1);
            fill: theme("colors.red.100");
            stroke: theme("colors.red.100");
        }

        50% {
            transform: scale(1.15);
            fill: theme("colors.red.600");
            stroke: theme("colors.red.600");
        }

        100% {
            transform: scale(1);
            fill: theme("colors.red.600");
            stroke: theme("colors.red.600");
        }
    }
</style>
