type SelectableOpts = {
    disabled?: boolean
}

export function selectable(node: HTMLElement, opts?: SelectableOpts) {
    let ignoreSelectionChanges: boolean = true
    let preventAutoSelectionHandling: boolean = false
    let autoSelectionTimeout: number | null = null

    let selection: Selection | null = null

    let selectionRange: Range | null = null
    let selectedText: string | null = null
    let rangeBeforeCaret: Range | null = null
    let textBeforeCaret: string | null = null
    let selectionStart: number | null = null
    let selectionEnd: number | null = null

    const afterUpdateSelection = () => {
        selectionRange =
            selection !== null && selection.rangeCount
                ? selection.getRangeAt(0)
                : null
        selectedText = selectionRange ? selectionRange.toString() : null
        if (selectionRange) {
            rangeBeforeCaret = selectionRange.cloneRange()
            rangeBeforeCaret.selectNodeContents(node)
            rangeBeforeCaret.setEnd(
                selectionRange.endContainer,
                selectionRange.endOffset
            )
        } else {
            rangeBeforeCaret = null
        }
        textBeforeCaret = rangeBeforeCaret?.toString() || null
        selectionStart =
            textBeforeCaret && selectedText
                ? textBeforeCaret.length - selectedText.length
                : null
        selectionEnd = textBeforeCaret ? textBeforeCaret.length - 1 : null
        node.dispatchEvent(
            new CustomEvent("selectionchanged", {
                detail: {
                    selection,
                    range: selectionRange,
                    text: selectedText,
                    start: selectionStart,
                    end: selectionEnd,
                },
            })
        )
        ignoreSelectionChanges = true
        afterUpdateIgnoreSelectionChanges()
    }
    const afterUpdateIgnoreSelectionChanges = () => {
        node.dispatchEvent(
            new CustomEvent("ignoringSelectionChangesUpdated", {
                detail: ignoreSelectionChanges,
            })
        )
    }

    const handleDocumentKeyup = (_event: KeyboardEvent) => {
        // console.log("document keyup", {
        //     ignoreSelectionChanges,
        //     preventAutoSelectionHandling,
        // })
        maybeUpdateSelection()
    }
    const handleKeyup = (_event: KeyboardEvent) => {
        // console.log("keyup", {
        //     ignoreSelectionChanges,
        //     preventAutoSelectionHandling,
        // })
        maybeUpdateSelection()
    }
    const handleContextmenu = (_event: MouseEvent) => {
        // console.log("contextmenu", {
        //     ignoreSelectionChanges,
        //     preventAutoSelectionHandling,
        // })
        maybeUpdateSelection()
    }

    function maybeUpdateSelection() {
        const disabled = !Boolean(opts?.disabled)
        if (disabled) {
            return
        }
        if (ignoreSelectionChanges) {
            return
        }
        const s = window.getSelection
            ? window.getSelection()
            : document.selection
        // console.log({ s, range: s && s.rangeCount ? s.getRangeAt(0) : null })
        if (s && !s.isCollapsed && s.type === "Range") {
            selection = s
        } else {
            selection = null
        }
        afterUpdateSelection()
    }
    function handleSelectStart() {
        // console.log("selectstart", {
        //     ignoreSelectionChanges,
        //     preventAutoSelectionHandling,
        // })
        ignoreSelectionChanges = false
        afterUpdateIgnoreSelectionChanges()
    }
    function handleDocumentSelectionChange() {
        if (typeof window === "undefined") {
            return
        }
        const s = window.getSelection
            ? window.getSelection()
            : document.selection
        if (!s) {
            return
        }
        if (s.type !== "Range") {
            return
        }
        const r = s ? s.getRangeAt(0) : null
        // console.log("selectionchange", {
        //     ignoreSelectionChanges,
        //     s,
        //     selection,
        //     autoSelectionTimeout,
        //     preventAutoSelectionHandling,
        //     r,
        //     selectionRange,
        // })
        if (
            !selection ||
            !selectionRange ||
            s.focusNode !== selection.focusNode ||
            s.anchorNode !== selection.anchorNode ||
            s.focusOffset !== selection.focusOffset ||
            s.anchorOffset !== selection.anchorOffset ||
            (r !== null &&
                (r.startOffset !== selectionRange.startOffset ||
                    r.endOffset !== selectionRange.endOffset))
        ) {
            selection = s && !s.isCollapsed ? s : null
            afterUpdateSelection()
            tryClearAutoSelectionTimeout()
            if (s.rangeCount) {
                if (!preventAutoSelectionHandling) {
                    autoSelectionTimeout = window.setTimeout(() => {
                        if (!preventAutoSelectionHandling) {
                            // console.log(
                            //     "autoSelectionTimeout expired, handling",
                            //     {
                            //         preventAutoSelectionHandling,
                            //         ignoreSelectionChanges,
                            //     }
                            // )
                            maybeUpdateSelection()
                            autoSelectionTimeout = null
                        }
                    }, 500)
                }
            }
        }
    }

    function tryClearAutoSelectionTimeout() {
        if (!autoSelectionTimeout) {
            return
        }
        window.clearTimeout(autoSelectionTimeout)
        autoSelectionTimeout = null
    }

    function handleMouseup() {
        // console.log("mouseup", {
        //     ignoreSelectionChanges,
        //     preventAutoSelectionHandling,
        // })
        preventAutoSelectionHandling = false
        if (ignoreSelectionChanges) {
            // secondary click away handler
            selection = null
            afterUpdateSelection()
        }
        ignoreSelectionChanges = false
        afterUpdateIgnoreSelectionChanges()
        maybeUpdateSelection()
    }
    function handleMousedown() {
        // console.log("mousedown", { willHandleSelect })
        preventAutoSelectionHandling = true
        tryClearAutoSelectionTimeout()
    }

    node.addEventListener("keyup", handleKeyup)
    node.addEventListener("mousedown", handleMousedown)
    node.addEventListener("mouseup", handleMouseup)
    node.addEventListener("selectstart", handleSelectStart)
    node.addEventListener("selectionchange", handleDocumentSelectionChange)
    node.addEventListener("contextmenu", handleContextmenu)

    document.addEventListener("selectionchange", handleDocumentSelectionChange)
    document.addEventListener("keyup", handleDocumentKeyup)

    return {
        update(newOpts?: SelectableOpts) {
            opts = newOpts
        },
        destroy() {
            tryClearAutoSelectionTimeout()
            node.removeEventListener("keyup", handleKeyup)
            node.removeEventListener("mousedown", handleMousedown)
            node.removeEventListener("mouseup", handleMouseup)
            node.removeEventListener("selectstart", handleSelectStart)
            node.removeEventListener(
                "selectionchange",
                handleDocumentSelectionChange
            )
            node.removeEventListener("contextmenu", handleContextmenu)

            document.removeEventListener(
                "selectionchange",
                handleDocumentSelectionChange
            )
            document.removeEventListener("keyup", handleDocumentKeyup)
        },
    }
}

export default selectable
