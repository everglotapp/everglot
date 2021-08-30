/**
 * Source: https://stackoverflow.com/a/68236494
 */
export function getSupportedMimeTypes(...mediaTypes: string[]) {
    if (!window.MediaRecorder) {
        return []
    }
    if (!mediaTypes.length) {
        mediaTypes.push(...["video", "audio"])
    }
    // const FILE_EXTENSIONS = ["webm", "ogg", "mp4", "x-matroska"]
    const FILE_EXTENSIONS = ["webm", "ogg", "mp4"]
    const CODECS = [
        "vp9",
        "vp9.0",
        "vp8",
        "vp8.0",
        "avc1",
        "av1",
        "h265",
        "h.265",
        "h264",
        "h.264",
        "opus",
    ]

    return [
        ...new Set(
            FILE_EXTENSIONS.flatMap((ext) =>
                CODECS.flatMap((codec) =>
                    mediaTypes.flatMap((mediaType) => [
                        `${mediaType}/${ext};codecs:${codec}`,
                        `${mediaType}/${ext};codecs=${codec}`,
                        `${mediaType}/${ext};codecs:${codec.toUpperCase()}`,
                        `${mediaType}/${ext};codecs=${codec.toUpperCase()}`,
                        `${mediaType}/${ext}`,
                    ])
                )
            )
        ),
    ].filter((variation) => MediaRecorder.isTypeSupported(variation))
}
