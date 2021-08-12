export async function createPost(body: string, parentPostUuid: string | null) {
    return fetch("/posts/create", {
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
