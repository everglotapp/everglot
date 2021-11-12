export type SelectionEvent = CustomEvent<{
    selection: Selection | null
    range: Range | null
    text: string | null
    start: number | null
    end: number | null
}>

type SelectableOpts = {
    disabled?: boolean
}

export function selectable(node: HTMLElement, opts?: SelectableOpts) {
    let myOpts: SelectableOpts | undefined = opts
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
        ignoreSelectionChanges = true
        afterUpdateIgnoreSelectionChanges()

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
            new CustomEvent("selection", {
                detail: {
                    selection,
                    range: selectionRange,
                    text: selectedText,
                    start: selectionStart,
                    end: selectionEnd,
                },
            }) as SelectionEvent
        )
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

    function selectionIsWithinNode(s: Selection) {
        let cur: Node | null = s.anchorNode
        while (cur) {
            if (cur === node) {
                return true
            }
            cur = cur.parentNode
        }
        cur = s.focusNode
        while (cur) {
            if (cur === node) {
                return true
            }
            cur = cur.parentNode
        }
        return false
    }

    function maybeUpdateSelection() {
        const disabled = Boolean(myOpts?.disabled)
        if (disabled) {
            // console.log("maybeUpdateSelection disabled")
            return
        }
        if (ignoreSelectionChanges) {
            // console.log("maybeUpdateSelection ignoring selection changes")
            return
        }
        const s = window.getSelection
            ? window.getSelection() // @ts-ignore
            : document.selection
        // console.log("maybeUpdateSelection", {
        //     s,
        //     range: s && s.rangeCount ? s.getRangeAt(0) : null,
        //     isWithinNode: s ? selectionIsWithinNode(s) : null,
        // })
        if (
            s &&
            !s.isCollapsed &&
            s.type === "Range" &&
            selectionIsWithinNode(s)
        ) {
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
            ? window.getSelection() // @ts-ignore
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
            // const isValid = !s.isCollapsed && s.type === "Range"
            const isWithinNode = selectionIsWithinNode(s)
            // selection = isValid && isWithinNode ? s : null
            // afterUpdateSelection()
            ignoreSelectionChanges = false
            afterUpdateIgnoreSelectionChanges()
            maybeUpdateSelection()
            tryClearAutoSelectionTimeout()
            if (s.rangeCount && isWithinNode) {
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
        ignoreSelectionChanges = false
        afterUpdateIgnoreSelectionChanges()
        maybeUpdateSelection()
    }
    function handleMousedown() {
        // console.log("mousedown", {
        //     ignoreSelectionChanges,
        //     preventAutoSelectionHandling,
        // })
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
            myOpts = newOpts
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
