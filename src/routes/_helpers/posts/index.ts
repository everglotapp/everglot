import { USER_CREATE_POST_RECORDING_FILE_FORM_FIELD } from "../../../constants"
import type { SupportedLocale } from "../../../constants"

import { decode as decodeHTML } from "he"

export async function createPost({
    body,
    locale,
    parentPostUuid,
    promptUuid,
}: {
    body: string
    locale: SupportedLocale
    parentPostUuid: string | null
    promptUuid: string | null
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
        }),
    })
}

export function formatPostBody(body: string): string {
    return decodeHTML(
        body
            .replace(/\<br(\ | \/)?\>/g, "")
            .replace(/\<div\>(.*?)\<\/div\>/g, (_match, p1) => `${p1}\n`)
            .replace(/(<([^>]+)>)/gi, "")
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
