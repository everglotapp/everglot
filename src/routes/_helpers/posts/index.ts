import { USER_CREATE_POST_RECORDING_FILE_FORM_FIELD } from "../../../constants"
import type { SupportedLocale, PostGameRange } from "../../../constants"

import { decode as decodeHTML } from "he"
import type { PostGameType } from "../../../types/generated/graphql"

export async function createPost({
    body,
    locale,
    parentPostUuid,
    promptUuid,
    gameType,
    ranges,
}: {
    body: string
    locale: SupportedLocale
    parentPostUuid: string | null
    promptUuid: string | null
    gameType: PostGameType | null
    ranges: PostGameRange[] | null
}) {
    return await fetch("/posts/create", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            body: formatPostBody(body),
            locale,
            parentPostUuid,
            promptUuid,
            gameType,
            ranges,
        }),
    })
}

export function formatPostBody(body: string): string {
    return decodeHTML(
        body
            .replace(/\<br(\ | \/)?\>/g, "")
            .replace(/\<div\>(.*?)\<\/div\>/g, (_match, p1) => `${p1}\n`)
            .replace(/(<([^>]+)>)/gi, "")
            .trim()
    )
}

export async function createPostRecording(postUuid: string, recording: Blob) {
    const formData = new FormData()
    formData.append(USER_CREATE_POST_RECORDING_FILE_FORM_FIELD, recording)
    return await fetch(`/posts/${postUuid}/recordings/create`, {
        method: "post",
        body: formData,
    })
}
