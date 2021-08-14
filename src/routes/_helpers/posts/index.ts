import { USER_CREATE_POST_RECORDING_FILE_FORM_FIELD } from "../../../constants"

export async function createPost(body: string, parentPostUuid: string | null) {
    return await fetch("/posts/create", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            body: formatPostBodyForCreate(body),
            parentPostUuid,
        }),
    })
}

function formatPostBodyForCreate(body: string): string {
    return body
        .replace(/\<br(\ | \/)?\>/g, "")
        .replace(/\<div\>(.*?)\<\/div\>/g, (_match, p1) => `${p1}\n`)
}

export async function createPostRecording(postUuid: string, recording: Blob) {
    const formData = new FormData()
    formData.append(USER_CREATE_POST_RECORDING_FILE_FORM_FIELD, recording)
    return await fetch(`/posts/${postUuid}/recordings/create`, {
        method: "post",
        body: formData,
    })
}
