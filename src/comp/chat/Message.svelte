<script lang="ts">
    import { scale } from "svelte/transition"
    import { svelteTime } from "svelte-time"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { stores as fluentStores } from "@nubolab-ffwd/svelte-fluent/src/internal/FluentProvider.svelte"

    // @ts-ignore
    import _anchorme from "anchorme"
    const anchorme: typeof _anchorme = _anchorme.default || _anchorme

    import { currentUser } from "../../stores"
    import { chatUsers } from "../../stores/chat"

    import Avatar from "../users/Avatar.svelte"
    import Bio from "../users/Bio.svelte"

    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"

    import type { User } from "../../types/generated/graphql"

    export let userUuid: User["uuid"] | null
    $: user = userUuid
        ? $chatUsers.find((u) => u?.uuid === userUuid) || null
        : null

    export let uuid = ""
    export let time = ""
    export let text = ""

    let showBio = false
    let showMore = false

    const MAX_BODY_LEN = 580
    $: body = showMore ? text : text.substring(0, MAX_BODY_LEN)
    $: bodyCutOff = text.length > MAX_BODY_LEN

    $: usernameTag =
        $currentUser && $currentUser.username && $currentUser.username.length
            ? `@${$currentUser.username}`
            : null

    enum BodyElementType {
        Text,
        Mention,
        Link,
        Emoji,
    }
    interface BodyElement {
        content: string
        type: BodyElementType
        uri?: string
    }
    let bodyElements: BodyElement[] = []

    function withMentions(elements: BodyElement[]) {
        if (!usernameTag) {
            return elements
        }
        const res = []
        const split = body.split(usernameTag).map((content) => ({
            type: BodyElementType.Text,
            content,
        }))
        for (let i = 0; i < split.length - 1; ++i) {
            res.push(split[i])
            res.push({
                content: usernameTag,
                type: BodyElementType.Mention,
            })
        }
        res.push(split[split.length - 1])
        return res
    }

    function linkMatchToURI(match: ReturnType<typeof anchorme.list>[number]) {
        if (!match.isURL) {
            // Only accept web URLs, otherwise consider invalid.
            return null
        }
        const { string } = match
        if (string.startsWith("https://") || string.startsWith("http://")) {
            return string
        } else {
            return `https://${string}`
        }
    }
    function withLinks(elements: BodyElement[]) {
        const res = []
        for (let element of elements) {
            if (element.type !== BodyElementType.Text) {
                res.push(element)
                continue
            }
            const matches = anchorme.list(element.content)
            // Get first next match
            let match = matches.shift()
            let textStart = 0
            let matchStart = 0
            while (match) {
                if (matchStart !== match.start) {
                    // There's at least 1 match left but we're not there yet. Forward to next match.
                    matchStart = match.start
                }
                res.push({
                    content: element.content.slice(textStart, matchStart),
                    type: BodyElementType.Text,
                })
                const uri = linkMatchToURI(match)
                if (uri) {
                    res.push({
                        content: element.content.slice(
                            matchStart,
                            match.end + 1
                        ),
                        type: BodyElementType.Link,
                        uri: uri,
                    })
                    // Start text one character after match (there could even be only one character left)
                    textStart = match.end + 1
                }
                // Get first next match
                match = matches.shift()
            }
            // No matches left, append rest of text content if there is any left.
            if (textStart < element.content.length) {
                res.push({
                    content: element.content.slice(textStart),
                    type: BodyElementType.Text,
                })
            }
        }
        return res
    }
    const emojiRegex = /\p{Extended_Pictographic}/gu
    function withEmojis(elements: BodyElement[]) {
        const res = []
        for (const element of elements) {
            if (element.type !== BodyElementType.Text) {
                res.push(element)
                continue
            }
            const matches = [...element.content.matchAll(emojiRegex)]
            // Get first next match
            let match = matches.shift()
            let textStart = 0
            let matchStart = 0
            while (match) {
                if (matchStart !== match.index) {
                    // There's at least 1 match left but we're not there yet. Forward to next match.
                    matchStart = match.index || 0
                }
                res.push({
                    content: element.content.slice(textStart, matchStart),
                    type: BodyElementType.Text,
                })
                res.push({
                    content: match[0],
                    type: BodyElementType.Emoji,
                })
                // Start text one character after match (there could even be only one character left)
                textStart = (match.index || 0) + match[0].length
                // Get first next match
                match = matches.shift()
            }
            // No matches left, append rest of text content if there is any left.
            if (textStart < element.content.length) {
                res.push({
                    content: element.content.slice(textStart),
                    type: BodyElementType.Text,
                })
            }
        }
        return res
    }

    function makeBodyElements(text: string) {
        let elements = [{ content: text, type: BodyElementType.Text }]
        elements = withMentions(elements)
        elements = withLinks(elements)
        elements = withEmojis(elements)
        return elements
    }

    $: bodyElements = makeBodyElements(body)

    const { translate } = fluentStores()!
    $: botUsername = $translate("chat-message-username-bot")
</script>

<div
    class="message"
    transition:scale|local={{
        duration: 200,
    }}
>
    <div class="avatar" id={`message-${uuid}-avatar`}>
        {#if user !== null}
            {#if showBio}
                <ClickAwayListener
                    elementId={`message-${uuid}-avatar`}
                    on:clickaway={() => (showBio = false)}
                />
                <EscapeKeyListener on:keydown={() => (showBio = false)} />
                <div
                    class="relative"
                    aria-label={`User Bio`}
                    style="height: 0; width: 0; margin-left: 100%;"
                >
                    <div class="absolute" style="left: 4px;">
                        <div
                            class="bg-white shadow-lg rounded-lg"
                            style="z-index: 1; min-width: 240px; transform-origin: top left;"
                            in:scale|local={{ duration: 200, delay: 0 }}
                            out:scale|local={{ duration: 200, delay: 0 }}
                        >
                            <Bio {userUuid} />
                        </div>
                    </div>
                </div>
            {/if}
        {/if}
        {#if user === null}
            <div>
                <Avatar
                    username={botUsername}
                    url="/squirrel.png"
                    size={36}
                    showShadow={false}
                />
            </div>
        {:else}
            <div class="cursor-pointer">
                <Avatar
                    username={user.username || ""}
                    url={user.avatarUrl || ""}
                    size={36}
                    on:click={() => (showBio = !showBio)}
                />
            </div>
        {/if}
    </div>
    <div class="main">
        <div class="meta">
            <div class="flex items-center">
                {#if userUuid}
                    {#if user && user.username}
                        <span
                            class="username mr-2 cursor-pointer"
                            on:click={(event) => {
                                event.stopPropagation()
                                showBio = !showBio
                            }}>{user.username}</span
                        >
                    {:else}
                        <span class="username mr-2 italic"
                            ><Localized
                                id="chat-message-username-unknown"
                            /></span
                        >
                    {/if}
                {:else}
                    <span class="username bot mr-2">{botUsername}</span>
                {/if}
                <time
                    use:svelteTime={{
                        timestamp: time,
                        format: "h:mm A",
                    }}
                    title={time}
                />
            </div>
            <time
                class="self-end text-sm text-gray"
                use:svelteTime={{
                    timestamp: time,
                    format: "MMMM D, YYYY",
                }}
            />
        </div>
        <div class="body">
            {#each bodyElements as element}
                {#if element.type === BodyElementType.Text}
                    <span>{element.content}</span>
                {:else if element.type === BodyElementType.Emoji}
                    <span class="emoji">{element.content}</span>
                {:else if element.type === BodyElementType.Mention}
                    <span class="mention">{element.content}</span>
                {:else if element.type === BodyElementType.Link}
                    <a href={element.uri} target="_blank" rel="noreferrer"
                        >{element.content}</a
                    >
                {/if}
            {/each}
            {bodyCutOff && !showMore ? "…" : ""}
        </div>
        {#if bodyCutOff}
            <div>
                {#if showMore}
                    <ButtonSmall
                        className="w-full justify-center"
                        variant="TEXT"
                        color="PRIMARY"
                        tag="button"
                        on:click={() => (showMore = false)}
                        ><Localized id="chat-message-show-less" /></ButtonSmall
                    >
                {:else}
                    <ButtonSmall
                        className="w-full justify-center"
                        variant="TEXT"
                        color="PRIMARY"
                        tag="button"
                        on:click={() => (showMore = true)}
                        ><Localized id="chat-message-show-more" /></ButtonSmall
                    >
                {/if}
            </div>
        {/if}
    </div>
</div>

<style>
    .message {
        transform-origin: top center;

        @apply mb-3;
        @apply break-words;
        @apply rounded-md;
        @apply flex;
    }

    .main {
        @apply p-2;
        @apply bg-gray-lightest;
        @apply shadow-sm;
        @apply flex;
        @apply flex-col;
        @apply overflow-hidden;
        @apply w-full;
    }

    .main .body {
        @apply px-2;
    }

    .main .body span {
        @apply align-middle;
    }

    .main .body .mention {
        @apply font-bold;
        @apply text-gray-bitdark;
    }

    .main .body .emoji {
        font-size: 1.6rem;
        line-height: 2.2rem;
        padding-left: 2px;
        padding-right: 2px;
    }

    .main .body a {
        @apply font-normal;
    }

    .avatar {
        font-size: 15px;
        font-weight: bold;
        width: auto;
        min-width: 3.75rem;
        max-width: 4.5rem;

        @apply flex;
        @apply flex-col;
        @apply items-center;
        @apply text-gray-bitdark;
        @apply pt-1;
    }

    .meta {
        @apply text-gray-bitdark;
        @apply text-sm;
        @apply mb-1;
        @apply flex;
        @apply w-full;
        @apply justify-between;
        @apply whitespace-nowrap;
        @apply overflow-hidden;
    }

    .username {
        line-height: 1rem;
        max-width: 6rem;

        @apply inline-block;
        @apply whitespace-nowrap;
        @apply overflow-hidden;
        @apply overflow-ellipsis;
        @apply text-primary-dark;
        @apply font-bold;

        @screen sm {
            max-width: 12rem;
        }

        @screen md {
            max-width: 16rem;
        }
    }

    .username.bot {
        @apply text-primary;
    }

    .meta time {
        @apply font-bold;
    }
</style>
