<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte"
    import { scale } from "svelte/transition"
    import { svelteTime } from "svelte-time"
    import { v4 as uuidv4 } from "uuid"
    import {
        HeartIcon,
        MessageCircleIcon,
        SendIcon,
        ZapIcon,
        EyeOffIcon,
        EyeIcon,
        FastForwardIcon,
        CheckIcon,
        Edit3Icon,
    } from "svelte-feather-icons"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { query } from "@urql/svelte"

    import GameRangeDropdown from "./GameRangeDropdown.svelte"
    import Avatar from "../users/Avatar.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"
    import ButtonLarge from "../util/ButtonLarge.svelte"
    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"
    import selectable, { SelectionEvent } from "../util/selectable"

    import { currentUserStore, currentUserUuid } from "../../stores/currentUser"

    import type {
        FeedPostsQuery,
        GrammaticalCase,
        GrammaticalGender,
    } from "../../types/generated/graphql"
    import { PromptType, PostGameType } from "../../types/generated/graphql"
    import {
        createPost,
        createPostCorrection,
    } from "../../routes/_helpers/posts"
    import {
        BodyPart,
        BodyPartType,
        GuessCaseLocale,
        GuessCaseOption,
        GuessCaseRange,
        GuessGenderLocale,
        GuessGenderOption,
        GuessGenderRange,
        GUESS_CASE_OPTIONS,
        GUESS_GENDER_OPTIONS,
        PostCorrectionRange,
        PostGameRange,
        SupportedLocale,
    } from "../../constants"
    import { USER_UPLOADED_RECORDINGS_BASE_PATH } from "../../constants"
    import {
        getBodyParts,
        getBodyPartsWithOverlaps,
        rangesOverlapAnywhere,
    } from "../../routes/_helpers/posts/selections"
    import { createPostGameAnswer } from "../../routes/_helpers/posts/games"
    import CorrectionRangeDropdown, {
        CreatePostCorrectionEvent,
    } from "./CorrectionRangeDropdown.svelte"

    query(currentUserStore)

    type PostNode = NonNullable<
        NonNullable<FeedPostsQuery["feedPosts"]>["edges"][number]["node"]
    >

    export let uuid: string
    export let snowflakeId: string
    export let body: string
    export let createdAt: Date
    export let author: NonNullable<PostNode["author"]>
    export let likes: PostNode["likes"]
    export let replies: PostNode["replies"]
    export let recordings: PostNode["recordings"]
    export let prompt: PostNode["prompt"]
    export let language: PostNode["language"]
    export let games: PostNode["games"]
    export let corrections: PostNode["corrections"]
    export let linkToAuthorProfile: boolean = true
    export let forceShowReplies: boolean = false

    const dispatch = createEventDispatcher()

    let bodyNode: HTMLElement
    let bodyId: string
    let rangeOptionsDropdownId: string
    let correctionRangeDropdownId: string
    onMount(() => {
        bodyId = uuidv4()
        rangeOptionsDropdownId = uuidv4()
        correctionRangeDropdownId = uuidv4()
    })

    $: replyNodes = replies.nodes.filter(Boolean).map((node) => node!)
    $: correctionNodes = corrections.nodes.filter(Boolean).map((node) => node!)
    $: viewedCorrectionNode = viewedCorrectionUuid
        ? correctionNodes.find((node) => node.uuid === viewedCorrectionUuid) ||
          null
        : null
    $: currentCorrectionNodes =
        viewedCorrectionNode === null
            ? correctionStart === null || correctionEnd === null
                ? []
                : correctionNodes.filter(({ startIndex, endIndex }) =>
                      rangesOverlapAnywhere(
                          { start: startIndex, end: endIndex },
                          { start: correctionStart!, end: correctionEnd! }
                      )
                  )
            : correctionNodes.filter(({ startIndex, endIndex }) =>
                  rangesOverlapAnywhere(
                      { start: startIndex, end: endIndex },
                      {
                          start: viewedCorrectionNode!.startIndex,
                          end: viewedCorrectionNode!.endIndex,
                      }
                  )
              )

    $: liked =
        likes &&
        likes.nodes &&
        likes.nodes.some(
            (node) => node && node.user && $currentUserUuid === node.user.uuid
        )

    let replyBodyInputNode: HTMLElement
    let newReplyBody: string | null = null
    function handleReplyBodyKeyup(_event: KeyboardEvent) {
        newReplyBody = replyBodyInputNode.textContent
    }

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
                replyBodyInputNode.innerHTML = ""
                newReplyBody = null
                dispatch("replySuccess", { post: { snowflakeId } })
            } else {
                dispatch("replyFailure", { post: { snowflakeId } })
            }
        } else {
            dispatch("replyFailure", { post: { snowflakeId } })
        }
    }
    let showReplies: boolean = false

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
            dispatch(tmpLiked ? "likeSuccess" : "unlikeSuccess", {
                post: { snowflakeId },
            })
        const onFailure = () =>
            dispatch(tmpLiked ? "likeFailure" : "unlikeFailure", {
                post: { snowflakeId },
            })
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
    $: guessCaseLocale =
        language && game && game.gameType === PostGameType.GuessCase
            ? (language.alpha2 as GuessCaseLocale)
            : null
    $: guessGenderLocale =
        language && game && game.gameType === PostGameType.GuessGender
            ? (language.alpha2 as GuessGenderLocale)
            : null

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

    $: currentUserAnswers = game
        ? game.answersByCurrentUser.nodes.filter(Boolean).map((node) => node!)
        : []
    $: currentUserCorrectAnswers = currentUserAnswers.filter(
        (answer) => answer.correct
    )
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
    $: currentUserHasAnsweredOrRevealed = game
        ? currentUserAnswers.length || game.revealedByCurrentUser
        : null
    $: currentUserCanAnswer =
        !currentUserCreatedGame && !currentUserHasAnsweredOrRevealed
    $: correctAnswers =
        !game || !game.correctAnswers.nodes.length
            ? null
            : game.correctAnswers.nodes.filter(Boolean).map((node) => node!)
    type UuidToAnswer = Record<
        string,
        NonNullable<NonNullable<typeof game>["correctAnswers"]["nodes"][number]>
    >
    let correctAnswerByRangeUuid: UuidToAnswer
    $: correctAnswerByRangeUuid = correctAnswers
        ? correctAnswers.reduce(
              (uuidToAnswer, answer) => ({
                  ...uuidToAnswer,
                  [answer.rangeUuid]: answer,
              }),
              {} as UuidToAnswer
          )
        : ({} as UuidToAnswer)
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
        // Highlight picked body part that is being edited.
        const bodyPartNode = document.getElementById(uuid)
        if (bodyPartNode) {
            clearAllSelections()
            // @ts-ignore
            if (document.body.createTextRange) {
                // @ts-ignore
                const range = document.body.createTextRange()
                range.moveToElementText(bodyPartNode)
                range.select()
            } else if (window.getSelection) {
                const s = window.getSelection()
                if (s) {
                    const range = document.createRange()
                    range.selectNodeContents(bodyPartNode)
                    s.removeAllRanges()
                    s.addRange(range)
                }
            }
        }
    }
    function handlePickAnswer(range: PostGameRange) {
        if (answerRangeUuid === null) {
            return
        }
        answerRanges[answerRangeUuid] = range
        clearAllSelections()
    }
    function handleRemoveAnswer() {
        if (answerRangeUuid === null) {
            return
        }
        delete answerRanges[answerRangeUuid]
        answerRanges = answerRanges
        clearAllSelections()
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
    let clozeAnswers: Record<string, string> = {}

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
            answers = Object.entries(clozeAnswers)
                .filter(([_uuid, answer]) => answer && answer.length)
                .map(([uuid, answer]) => ({
                    rangeUuid: uuid,
                    clozeAnswer: answer.trim(),
                }))
        } else {
            return
        }
        const onSuccess = () =>
            dispatch("gameAnswerSuccess", { post: { snowflakeId } })
        const onFailure = () => {
            dispatch("gameAnswerFailure", { post: { snowflakeId } })
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
    $: anyRangeAnswered = game
        ? game.gameType === PostGameType.GuessCase ||
          game.gameType === PostGameType.GuessGender
            ? Object.values(answerRanges).some(Boolean)
            : game.gameType === PostGameType.Cloze
            ? Object.values(clozeAnswers).some(
                  (clozeAnswer) => clozeAnswer && clozeAnswer.length
              )
            : null
        : null
    let showCorrectAnswers: boolean = false

    let showCorrections: boolean = false
    async function handleToggleCorrections() {
        showCorrections = !showCorrections
    }

    async function handleCreateCorrection(event: CreatePostCorrectionEvent) {
        if (correctionStart === null || correctionEnd === null) {
            return
        }
        const res = await createPostCorrection({
            postUuid: uuid,
            range: {
                uuid: uuidv4(),
                start: correctionStart,
                end: correctionEnd,
            } as PostCorrectionRange,
            ...event.detail,
        })
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                // success
                dispatch("correctSuccess", { post: { snowflakeId } })
            } else {
                dispatch("correctFailure", { post: { snowflakeId } })
            }
        } else {
            dispatch("correctFailure", { post: { snowflakeId } })
        }
    }

    // let correctionSelection: Selection | null = null
    let correctionText: string | null = null
    let correctionStart: number | null = null
    let correctionEnd: number | null = null
    let correctionRange: Range | null = null
    function handleSelection(event: SelectionEvent) {
        // correctionSelection = event.detail.selection
        correctionStart = event.detail.start
        correctionEnd = event.detail.end
        correctionText = event.detail.text
        correctionRange = event.detail.range
    }
    function clearAllSelections() {
        // correctionSelection = null
        correctionStart = null
        correctionEnd = null
        correctionText = null
        correctionRange = null
        const s = window.getSelection
            ? window.getSelection() // @ts-ignore
            : document.selection
        if (!s) {
            return
        }
        if (s.removeAllRanges) {
            s.removeAllRanges()
        } else if (s.empty) {
            s.empty()
        }
    }

    let ignoringCorrectionChanges: boolean | null = null
    function handleIgnoringCorrectionChangesUpdated(
        event: CustomEvent<boolean>
    ) {
        // console.log("handleIgnoringCorrectionChangesUpdated", {
        //     ignoring: event.detail,
        // })
        ignoringCorrectionChanges = event.detail
    }

    function handleCorrectionRangeDropdownClickaway(
        event: CustomEvent<{ event: MouseEvent }>
    ) {
        // console.log("clickaway", {
        //     ignoringCorrectionChanges,
        //     correctionRange,
        //     correctionStart,
        //     correctionEnd,
        //     correctionText,
        //     correctionRangeDropdownId,
        // })
        if (ignoringCorrectionChanges && event.detail.event.button === 0) {
            clearAllSelections()
            viewedCorrectionUuid = null
        }
    }
    let forceRecalculateDropdownPosition = false
    $: {
        showCorrections
        forceRecalculateDropdownPosition = true
    }
    $: {
        showCorrections
        clearAllSelections()
    }

    $: if (
        correctionInputFocussed &&
        correctionStart !== null &&
        correctionEnd !== null
    ) {
        //     // @ts-ignore
        //     if (document.body.createTextRange) {
        //         // @ts-ignore
        //         const range = document.body.createTextRange()
        //         range.moveToElementText(bodyNode)
        //         range.select()
        //     } else if (window.getSelection) {
        //         const s = window.getSelection()
        //         if (s) {
        //             // Mark text that's being corrected
        //             setTimeout(() => {
        //                 if (
        //                     correctionStart === null ||
        //                     correctionEnd === null
        //                 ) {
        //                     return
        //                 }
        //                 const range = document.createRange()
        //                 let i = 0
        //                 let curNode: ChildNode | null = bodyNode.childNodes[0]
        //                 let startFound = false
        //                 while (i <= correctionStart) {
        //                     if (!curNode || curNode.textContent === null) {
        //                         console.error(
        //                             "no start node with text content",
        //                             {
        //                                 curNode,
        //                             }
        //                         )
        //                         return
        //                     }
        //                     const endOfNode = i + curNode.textContent.length - 1
        //                     if (correctionStart <= endOfNode) {
        //                         console.log({
        //                             start: curNode,
        //                             i,
        //                             correctionStart,
        //                             startIdx: correctionStart - i,
        //                             correctionRange,
        //                         })
        //                         if (!curNode.firstChild) {
        //                             console.error("invalid first child")
        //                             return
        //                         }
        //                         range.setStart(
        //                             curNode.firstChild,
        //                             correctionStart - i
        //                         )
        //                         startFound = true
        //                         break
        //                     } else {
        //                         i = endOfNode + 1
        //                         curNode = curNode.nextSibling
        //                     }
        //                 }
        //                 if (!startFound) {
        //                     console.error("no start found")
        //                     return
        //                 }
        //                 while (i <= correctionEnd) {
        //                     if (!curNode || curNode.textContent === null) {
        //                         console.error("no end node with text content", {
        //                             curNode,
        //                         })
        //                         return
        //                     }
        //                     const endOfNode = i + curNode.textContent.length - 1
        //                     if (correctionEnd <= endOfNode) {
        //                         console.log({
        //                             end: curNode,
        //                             i,
        //                             correctionEnd,
        //                             endIdx: correctionEnd - i,
        //                             correctionRange,
        //                         })
        //                         if (!curNode.firstChild) {
        //                             console.error("invalid first child")
        //                             return
        //                         }
        //                         range.setEnd(
        //                             curNode.firstChild,
        //                             correctionEnd - i + 1
        //                         )
        //                         break
        //                     } else {
        //                         i = endOfNode + 1
        //                         curNode = curNode.nextSibling
        //                     }
        //                 }
        //                 console.log({ correctionStart, correctionEnd })
        //                 s.removeAllRanges()
        //                 s.addRange(range)
        //             }, 50)
        //         }
        // }
    }

    let correctionInputFocussed = false

    $: displayedCorrectionsBodyParts = showCorrections
        ? getBodyPartsWithOverlaps(
              body,
              (
                  corrections.nodes.filter(Boolean) as NonNullable<
                      typeof corrections.nodes[0]
                  >[]
              ).map((correction) => ({
                  start: correction.startIndex,
                  end: correction.endIndex,
                  uuid: correction.uuid,
              }))
          )
        : []
    $: displayedBodyParts = showCorrections
        ? displayedCorrectionsBodyParts
        : bodyParts
    let viewedCorrectionUuid: string | null = null
    function handleViewCorrection(uuid: string) {
        viewedCorrectionUuid = uuid
        // Highlight picked body part that is being edited.
        const bodyPartNode = document.getElementById(uuid)
        if (bodyPartNode) {
            clearAllSelections()
            // @ts-ignore
            if (document.body.createTextRange) {
                // @ts-ignore
                const range = document.body.createTextRange()
                range.moveToElementText(bodyPartNode)
                range.select()
            } else if (window.getSelection) {
                const s = window.getSelection()
                if (s) {
                    const range = document.createRange()
                    range.selectNodeContents(bodyPartNode)
                    s.removeAllRanges()
                    s.addRange(range)
                }
            }
        }
    }

    $: replyUserMentionNodes = replyNodes.reduce(
        (map, reply) => ({
            ...map,
            [reply.uuid]: reply.userMentions.nodes
                .filter(Boolean)
                .map((node) => node!),
        }),
        {} as Record<
            string,
            NonNullable<
                typeof replyNodes[number]["userMentions"]["nodes"][number]
            >[]
        >
    )
    $: replyUserMentionRanges = replyNodes.reduce(
        (map, reply) => ({
            ...map,
            [reply.uuid]: replyUserMentionNodes[reply.uuid].map(
                ({ uuid, startIndex: start, endIndex: end }) => ({
                    uuid,
                    start,
                    end,
                })
            ),
        }),
        {} as Record<string, { uuid: string; start: number; end: number }[]>
    )
    $: userMentionNodesByUuid = Object.values(replyUserMentionNodes).reduce(
        (map, mentionNodes) => {
            for (const mention of mentionNodes) {
                map[mention.uuid] = mention
            }
            return map
        },
        {} as Record<
            string,
            NonNullable<
                typeof replyNodes[number]["userMentions"]["nodes"][number]
            >
        >
    )
    $: displayedReplyBodyParts = replyNodes.reduce(
        (map, reply) => ({
            ...map,
            [reply.uuid]: getBodyParts(
                reply.body,
                replyUserMentionRanges[reply.uuid]
            ),
        }),
        {} as Record<string, BodyPart[]>
    )
</script>

<div
    class={`root py-3 sm:py-4 sm:px-3 gap-y-1${
        language ? ` font-locale-${language.alpha2}` : ""
    }`}
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
                        uuid={author.uuid}
                        url={author.avatarUrl}
                    /></a
                >
            {:else}
                <Avatar
                    username={author.username}
                    url={author.avatarUrl}
                    uuid={author.uuid}
                />
            {/if}
        </div>
        <div class="w-full" style="word-wrap: anywhere;">
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
            {#if showCorrections}
                <div
                    class="corrections-note flex flex-nowrap items-center text-sm text-black font-bold"
                >
                    <Edit3Icon size="18" class="mr-2 self-start" /><span
                        ><Localized id="post-corrections-note" /></span
                    >
                </div>
            {:else if game}
                <div
                    class="game-note flex flex-nowrap items-center text-sm text-gray font-bold"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 40 40"
                        fill="none"
                        class="mr-2 self-start"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M31.8 11C30.6 9 28.4 8 26 8H14C11.6 8 9.4 9 8.2 11C3.6 18 2.6 28.6 5.8 30.8C9 33 16.2 23.4 20 23.4C23.8 23.4 30.8 33 34.2 30.8C37.4 28.6 36.4 18 31.8 11ZM16 18H14V20H12V18H10V16H12V14H14V16H16V18ZM26.8 19C26.8 20 26 20.8 25 20.8C24 20.8 23.2 20 23.2 19C23.2 18 24 17.2 25 17.2C26 17.2 26.8 18 26.8 19ZM30.6 15C30.6 16 29.8 16.8 28.8 16.8C27.8 16.8 27 16 27 15C27 14 27.8 13.2 28.8 13.2C29.8 13.2 30.6 14 30.6 15Z"
                            fill="currentColor"
                        />
                    </svg>{#if currentUserCreatedGame}<span
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
            {#if showCorrections && language}
                <CorrectionRangeDropdown
                    id={correctionRangeDropdownId}
                    anchor={correctionRange}
                    container={bodyNode || null}
                    locale={language.alpha2}
                    editedRange={null}
                    selectedText={correctionText}
                    selectionStart={correctionStart}
                    selectionEnd={correctionEnd}
                    corrections={currentCorrectionNodes}
                    linkToCorrectionAuthorProfile={linkToAuthorProfile}
                    on:create={handleCreateCorrection}
                    on:cancel={() => clearAllSelections()}
                    forceRecalculatePosition={forceRecalculateDropdownPosition}
                    on:positionRecalculated={() =>
                        (forceRecalculateDropdownPosition = false)}
                    on:correctionInputFocus={() =>
                        (correctionInputFocussed = true)}
                    on:correctionInputBlur={() =>
                        (correctionInputFocussed = false)}
                />
                <ClickAwayListener
                    elementId={[
                        viewedCorrectionUuid,
                        correctionRangeDropdownId,
                    ]}
                    on:clickaway={() => {
                        viewedCorrectionUuid = null
                    }}
                />
                <ClickAwayListener
                    elementId={[bodyId, correctionRangeDropdownId]}
                    on:clickaway={handleCorrectionRangeDropdownClickaway}
                />
                <EscapeKeyListener on:keydown={() => clearAllSelections()} />
            {/if}
            <div
                id={bodyId}
                bind:this={bodyNode}
                class="body mt-1"
                class:game={Boolean(game)}
                use:selectable={{ disabled: !showCorrections }}
                on:selection={handleSelection}
                on:ignoringSelectionChangesUpdated={handleIgnoringCorrectionChangesUpdated}
            >
                {#if game && answerRangeUuid !== null && language?.alpha2}
                    <GameRangeDropdown
                        id={rangeOptionsDropdownId}
                        anchor={answerRangeElement}
                        container={bodyNode || null}
                        locale={language.alpha2}
                        gameType={game.gameType}
                        editedRange={answerRanges[answerRangeUuid] || null}
                        on:cancel={() => (answerRangeUuid = null)}
                        on:remove={() => {
                            if (answerRangeUuid !== null) {
                                if (answerRangeUuid in answerRanges) {
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
                {/if}{#each displayedBodyParts as bodyPart, i}{#if bodyPart.type === BodyPartType.LineBreak}
                        <br />
                    {:else if bodyPart.type === BodyPartType.Ranges && bodyPart.uuid}
                        {#if showCorrections}<span
                                id={bodyPart.uuid}
                                class="bg-danger-lightest border-danger border-b px-1 py-1 cursor-pointer"
                                style="margin-left: 1px; margin-right: 1px;"
                                on:click={() =>
                                    bodyPart.uuid &&
                                    handleViewCorrection(bodyPart.uuid)}
                                >{bodyPart.value}</span
                            >
                        {/if}
                    {:else if bodyPart.type === BodyPartType.Range && bodyPart.uuid}
                        {#if showCorrections}<span
                                id={bodyPart.uuid}
                                class="bg-danger-lightest border-danger border-b px-1 py-1 cursor-pointer"
                                style="margin-left: 1px; margin-right: 1px;"
                                on:click={() =>
                                    bodyPart.uuid &&
                                    handleViewCorrection(bodyPart.uuid)}
                                >{bodyPart.value}</span
                            >
                        {:else if game && (game.gameType === PostGameType.GuessCase || game.gameType === PostGameType.GuessGender)}
                            {#if currentUserCanAnswer}
                                <span
                                    id={bodyPart.uuid}
                                    class="body-part-range inline-flex border-b px-1 py-1 cursor-pointer"
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
                            {:else if showCorrectAnswers && displayedAnswerByRangeUuid[bodyPart.uuid] && language}
                                <span
                                    class="inline-flex border-b-2 border-gray px-1 pt-1 relative mb-8"
                                    ><span>{bodyPart.value}</span><span
                                        class="body-part-range-answer absolute flex justify-center font-bold mr-1 leading-7"
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
                                        style={`bottom: -1.5rem; left: 50%; right: 50%; z-index: ${
                                            10 + i
                                        };`}
                                        ><span
                                            class="bg-white whitespace-nowrap text-sm"
                                            ><Localized
                                                id={game.gameType ===
                                                    PostGameType.GuessCase &&
                                                displayedAnswerByRangeUuid[
                                                    bodyPart.uuid
                                                ].caseOption
                                                    ? `post-game-guess-case-${
                                                          GUESS_CASE_OPTIONS[
                                                              guessCaseLocale
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
                                                              guessGenderLocale
                                                          ][
                                                              displayedAnswerByRangeUuid[
                                                                  bodyPart.uuid
                                                              ].genderOption
                                                          ]
                                                      }`
                                                    : ""}
                                            /></span
                                        ></span
                                    ></span
                                >
                            {:else}
                                <span class="border-b-2 border-gray"
                                    >{bodyPart.value}</span
                                >
                            {/if}
                        {:else if game && game.gameType === PostGameType.Cloze}
                            {#if currentUserCanAnswer}
                                <input
                                    id={bodyPart.uuid}
                                    type="text"
                                    class="inline mr-1 px-1 py-1"
                                    bind:value={clozeAnswers[bodyPart.uuid]}
                                    name={bodyPart.uuid}
                                    style={`width: 5em;`}
                                />
                            {:else if showCorrectAnswers && displayedAnswerByRangeUuid[bodyPart.uuid]}
                                <span
                                    class={`inline-flex border-b-2 border-gray px-1 pt-1 relative${
                                        currentUserCreatedGame ? "" : " mb-8"
                                    }`}
                                    >{correctAnswerByRangeUuid[bodyPart.uuid]
                                        .clozeAnswer}{#if !currentUserCreatedGame}<span
                                            class="body-part-range-answer absolute flex justify-center font-bold mr-1 leading-7"
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
                                            style={`bottom: -1.5rem; left: 50%; right: 50%; z-index: ${
                                                10 + i
                                            };`}
                                            ><span
                                                class="bg-white whitespace-nowrap text-sm"
                                                ><Localized
                                                    id={displayedAnswerByRangeUuid[
                                                        bodyPart.uuid
                                                    ].clozeAnswer
                                                        ? displayedAnswerByRangeUuid[
                                                              bodyPart.uuid
                                                          ].clozeAnswer
                                                        : ""}
                                                /></span
                                            ></span
                                        >{/if}</span
                                >
                            {:else}
                                <input
                                    id={bodyPart.uuid}
                                    type="text"
                                    class="inline mr-1 bg-gray-light px-0 py-1"
                                    disabled
                                    name={bodyPart.uuid}
                                    style={`height: 2rem; width: 4.5rem;`}
                                />
                            {/if}
                        {/if}
                    {:else if bodyPart.type === BodyPartType.Text}
                        <span>{bodyPart.value}</span>
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
            {#if game && $currentUserUuid !== null && $currentUserUuid !== uuid && !showCorrections}
                <div
                    class="flex flex-col sm:flex-row-reverse pt-2 sm:justify-end justify-center items-start sm:items-center"
                >
                    {#if game.revealedByCurrentUser}<div
                            class="flex items-center text-gray-bitdark font-bold text-sm py-1 sm:py-0"
                        >
                            <FastForwardIcon size="16" class="mr-1" /><span
                                >You skipped this game.</span
                            >
                        </div>{:else if currentUserAnswers.length}<div
                            class="flex items-center text-gray-bitdark font-bold text-sm py-1 sm:py-0"
                        >
                            {#if currentUserCorrectAnswers.length}<CheckIcon
                                    size="18"
                                    class="mr-1"
                                />{:else}<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    width="22px"
                                    height="22px"
                                    class="mr-1"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 48 48"
                                    ><g fill="none"
                                        ><path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24 40c8.837 0 16-7.163 16-16S32.837 8 24 8S8 15.163 8 24s7.163 16 16 16zm0 2c9.941 0 18-8.059 18-18S33.941 6 24 6S6 14.059 6 24s8.059 18 18 18z"
                                            fill="currentColor"
                                        /><path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M17.5 26c1.38 0 2.5-1.79 2.5-4s-1.12-4-2.5-4s-2.5 1.79-2.5 4s1.12 4 2.5 4zm13 0c1.38 0 2.5-1.79 2.5-4s-1.12-4-2.5-4s-2.5 1.79-2.5 4s1.12 4 2.5 4z"
                                            fill="currentColor"
                                        /><path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.32 34.514l-.044.035a1 1 0 0 1-1.26-1.554l.134-.108c1.184-.96 2.411-1.955 4.274-2.459c1.922-.52 4.409-.494 8.144.323a1 1 0 1 1-.428 1.954c-3.592-.786-5.715-.746-7.193-.346c-1.45.392-2.387 1.15-3.627 2.155z"
                                            fill="currentColor"
                                        /></g
                                    ></svg
                                >{/if}You got {currentUserCorrectAnswers.length}/{game
                                .ranges.nodes.length} correct!
                        </div>{/if}
                    <div class="flex relative mr-1">
                        <ButtonSmall
                            className="submit-answers-button flex items-center justify-center ml-0 mr-1 mt-1"
                            tag="button"
                            variant={!showCorrectAnswers &&
                            currentUserCanAnswer &&
                            anyRangeAnswered
                                ? "FILLED"
                                : "OUTLINED"}
                            color={currentUserCanAnswer && anyRangeAnswered
                                ? "PRIMARY"
                                : "SECONDARY"}
                            on:click={() => handleSubmitAnswers()}
                            >{#if showCorrectAnswers}<EyeOffIcon
                                    size="16"
                                    class="mr-2"
                                /><span class="text-sm whitespace-nowrap"
                                    >Hide Answers</span
                                >{:else if !currentUserCanAnswer}<EyeIcon
                                    size="16"
                                    class="mr-2"
                                /><span class="text-sm whitespace-nowrap"
                                    >Review Answers</span
                                >{:else if anyRangeAnswered}<SendIcon
                                    size="16"
                                    class="mr-2"
                                /><span class="text-sm whitespace-nowrap"
                                    >Submit</span
                                >{:else}<EyeIcon size="16" class="mr-2" /><span
                                    class="text-sm whitespace-nowrap"
                                    >Reveal Answers</span
                                >{/if}</ButtonSmall
                        >
                    </div>
                </div>
                <div class="flex mr-1 text-xs pt-1 text-gray font-bold">
                    <div class="text-right">
                        {#if currentUserCanAnswer}
                            {#if game.answerers.totalCount > 1}
                                {game.answerers.totalCount} people have played.
                            {:else if game.answerers.totalCount == 1}
                                1 person has played.
                            {:else}
                                Nobody has played so far.
                            {/if}
                        {:else if currentUserCreatedGame || game.revealedByCurrentUser}
                            {#if game.answerers.totalCount > 1}
                                {game.answerers.totalCount} people have played.
                            {:else if game.answerers.totalCount == 1}
                                1 person has played.
                            {:else}
                                Nobody has played so far.
                            {/if}
                        {:else if game.answerers.totalCount > 2}
                            You and {game.answerers.totalCount - 1} others have played.
                        {:else if game.answerers.totalCount == 2}
                            You and one other person have played.
                        {:else}
                            Only you have played.
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    </div>
    <div class="flex flex-row pt-1 justify-end items-center">
        {#if !game || game.gameType !== PostGameType.Cloze || !currentUserCanAnswer}
            <ButtonLarge
                className={`correct-button flex items-center justify-center cursor-pointer rounded-l ml-0 mr-1 ${
                    showCorrections ? "shown" : "not-shown"
                }`}
                on:click={() => handleToggleCorrections()}
                tag="button"
                variant="TEXT"
                color="SECONDARY"
            >
                {#if showCorrections}
                    <Edit3Icon size="16" /><span
                        class="text-sm font-bold text-gray-bitdark select-none"
                        >cancel</span
                    >
                {:else}
                    <Edit3Icon size="18" /><span
                        class="text-sm font-bold text-gray-bitdark select-none"
                        >{correctionNodes.length}</span
                    >
                {/if}
            </ButtonLarge>
        {/if}
        {#if !forceShowReplies}
            {#if showReplies}
                <ButtonSmall
                    className="reply-button close items-center justify-center ml-0 mr-1"
                    tag="button"
                    variant="TEXT"
                    color="SECONDARY"
                    on:click={() => (showReplies = !showReplies)}
                    ><MessageCircleIcon size="16" /><span>close</span
                    ></ButtonSmall
                >
            {:else}
                <ButtonLarge
                    className="reply-button items-center justify-center ml-0 mr-1 bg-gray-lightest"
                    tag="button"
                    variant="TEXT"
                    color="PRIMARY"
                    on:click={() => (showReplies = !showReplies)}
                    ><MessageCircleIcon size="16" /><span
                        class="text-sm text-gray-bitdark font-bold select-none rounded-lg"
                        >{replies?.totalCount || 0}</span
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
        <div class="flex relative ml-8 mt-2">
            <div
                contenteditable
                placeholder="Reply …"
                aria-placeholder="Reply …"
                class="border border-gray-bitlight rounded-lg py-1 pl-2 pr-12 w-full origin-top-right whitespace-pre"
                in:scale={{ duration: 150 }}
                out:scale|local={{ duration: 150 }}
                on:keyup={handleReplyBodyKeyup}
                bind:this={replyBodyInputNode}
            />
            <div
                class="absolute right-0 top-0 bottom-0 flex items-center origin-top-right"
                in:scale={{ duration: 150 }}
                out:scale|local={{ duration: 150 }}
            >
                <ButtonSmall
                    tag="button"
                    variant="TEXT"
                    className="reply-send-button"
                    on:click={() => handleReply()}
                    ><SendIcon size="16" /></ButtonSmall
                >
            </div>
        </div>
        <div
            class="origin-top-right"
            class:pb-4={replies?.totalCount && replies?.totalCount > 0}
            in:scale={{ duration: 150 }}
            out:scale|local={{ duration: 150 }}
        >
            {#each replyNodes as reply (reply.uuid)}
                {#if reply.author}
                    <div
                        class="reply flex flex-row ml-8 pl-4 pt-4 border-l-2 border-gray-verylight"
                        in:scale|local={{ duration: 200 }}
                    >
                        <div class="pr-3 sm:pr-4">
                            <a href={`/u/${reply.author.username}`}>
                                <Avatar
                                    username={reply.author.username}
                                    url={reply.author.avatarUrl}
                                    uuid={reply.author.uuid}
                                    size={36}
                                /></a
                            >
                        </div>
                        <div class="w-full">
                            <div class="mb-1 flex items-center justify-between">
                                <a href={`/u/${reply.author.username}`}
                                    ><span class="text-gray-bitdark font-bold"
                                        >{reply.author.displayName ||
                                            reply.author.username}</span
                                    ></a
                                >
                                <time
                                    use:svelteTime={{
                                        timestamp: reply.createdAt,
                                        format:
                                            new Date(
                                                reply.createdAt
                                            ).getDate() === new Date().getDate()
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
                            <div
                                class="relative pr-12 grid"
                                style="grid-template-columns: auto 3rem;"
                            >
                                <div style="word-wrap: anywhere;">
                                    {#each displayedReplyBodyParts[reply.uuid] as replyBodyPart}
                                        {#if replyBodyPart.type === BodyPartType.Text}<span
                                                >{replyBodyPart.value}</span
                                            >{:else if replyBodyPart.type === BodyPartType.Range}{#if replyBodyPart.uuid != null && userMentionNodesByUuid[replyBodyPart.uuid] && userMentionNodesByUuid[replyBodyPart.uuid].user}<a
                                                    id={replyBodyPart.uuid}
                                                    href={`/u/${
                                                        userMentionNodesByUuid[
                                                            replyBodyPart.uuid
                                                        ].user.username
                                                    }`}
                                                    class="font-bold text-gray-bitdark cursor-pointer"
                                                    >{replyBodyPart.value}</a
                                                >{:else}<span
                                                    id={replyBodyPart.uuid}
                                                    class="font-bold text-gray-bitdark"
                                                    >{replyBodyPart.value}</span
                                                >{/if}
                                        {/if}
                                    {/each}
                                </div>
                                <div>
                                    {#if $currentUserUuid === null || reply.author.uuid !== $currentUserUuid}
                                        <ButtonSmall
                                            className="absolute right-0 bottom-0 items-center justify-center ml-0 mr-1"
                                            tag="button"
                                            variant="TEXT"
                                            color="SECONDARY"
                                            on:click={() => {
                                                const authorTag = `@${reply.author.username}`
                                                if (
                                                    !(
                                                        newReplyBody || ""
                                                    ).includes(authorTag)
                                                ) {
                                                    replyBodyInputNode.innerHTML =
                                                        newReplyBody
                                                            ? `${newReplyBody}${authorTag}&nbsp;`
                                                            : `${authorTag}&nbsp;`
                                                    newReplyBody =
                                                        replyBodyInputNode.innerHTML
                                                }
                                                setTimeout(() => {
                                                    replyBodyInputNode.focus()
                                                    replyBodyInputNode.click()
                                                    const y = Math.max(
                                                        0,
                                                        replyBodyInputNode.getBoundingClientRect()
                                                            .top +
                                                            window.scrollY -
                                                            150
                                                    )
                                                    window.scroll({
                                                        top: y,
                                                        behavior: "smooth",
                                                    })
                                                    const r =
                                                        document.createRange()
                                                    const s =
                                                        window.getSelection()
                                                    if (s) {
                                                        r.setStart(
                                                            replyBodyInputNode,
                                                            1
                                                        )
                                                        r.collapse(true)
                                                        s.removeAllRanges()
                                                        s.addRange(r)
                                                    }
                                                }, 30)
                                            }}
                                            ><svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                                aria-hidden="true"
                                                role="img"
                                                width="1em"
                                                height="1em"
                                                preserveAspectRatio="xMidYMid meet"
                                                viewBox="0 0 16 16"
                                                ><rect
                                                    x="0"
                                                    y="0"
                                                    width="16"
                                                    height="16"
                                                    fill="none"
                                                    stroke="none"
                                                /><g fill="currentColor"
                                                    ><path
                                                        d="M5.921 11.9L1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8c-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"
                                                    /></g
                                                ></svg
                                            ></ButtonSmall
                                        >
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    .body.game {
        @apply leading-6;
    }

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

    .corrections-note :global(svg) {
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

    :global(.submit-answers-button) {
        @apply px-2 !important;
    }

    :global(.reply-button) {
        min-width: 50px;

        @apply px-3 !important;
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
        @apply px-3 !important;

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

    :global(.correct-button) {
        @apply px-3 !important;

        min-width: 64px;
    }

    :global(.correct-button.not-shown) {
        @apply bg-gray-lightest;
    }

    :global(.correct-button svg) {
        @apply mr-2;
    }

    [placeholder]:empty::before {
        content: attr(placeholder);

        @apply text-gray;
    }

    [placeholder]:empty:focus::before {
        content: "";
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
