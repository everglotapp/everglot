export function pannable(node: HTMLElement) {
    if (typeof window === "undefined") {
        return
    }

    let x: number
    let y: number

    function handleMousedown(event: MouseEvent) {
        x = event.clientX
        y = event.clientY

        node.dispatchEvent(
            new CustomEvent("panstart", {
                detail: { x, y },
            })
        )

        window.addEventListener("mousemove", handleMousemove)
        window.addEventListener("mouseup", handleMouseup)
    }

    function handleMousemove(event: MouseEvent) {
        const dx = event.clientX - x
        const dy = event.clientY - y
        x = event.clientX
        y = event.clientY

        node.dispatchEvent(
            new CustomEvent("panmove", {
                detail: { x, y, dx, dy },
            })
        )
    }

    function handleMouseup(event: MouseEvent) {
        x = event.clientX
        y = event.clientY

        node.dispatchEvent(
            new CustomEvent("panend", {
                detail: { x, y },
            })
        )

        window.removeEventListener("mousemove", handleMousemove)
        window.removeEventListener("mouseup", handleMouseup)
    }

    // function handleTouchstart(event: TouchEvent) {
    //     x = event.clientX
    //     y = event.clientY

    //     node.dispatchEvent(
    //         new CustomEvent("panstart", {
    //             detail: { x, y },
    //         })
    //     )

    //     window.addEventListener("touchmove", handleTouchmove)
    //     window.addEventListener("touchend", handleTouchend)
    // }

    // function handleTouchmove(event: TouchEvent) {
    //     const dx = event.clientX - x
    //     const dy = event.clientY - y
    //     x = event.clientX
    //     y = event.clientY

    //     node.dispatchEvent(
    //         new CustomEvent("panmove", {
    //             detail: { x, y, dx, dy },
    //         })
    //     )
    // }

    // function handleTouchend(event: TouchEvent) {
    //     x = event.
    //     y = event.clientY

    //     node.dispatchEvent(
    //         new CustomEvent("panend", {
    //             detail: { x, y },
    //         })
    //     )

    //     window.removeEventListener("touchmove", handleTouchmove)
    //     window.removeEventListener("touchend", handleTouchend)
    // }

    node.addEventListener("mousedown", handleMousedown)
    // node.addEventListener("touchstart", handleTouchstart)

    return {
        destroy() {
            node.removeEventListener("mousedown", handleMousedown)
        },
    }
}
