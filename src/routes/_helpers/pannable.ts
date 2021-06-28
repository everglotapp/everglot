export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export interface SwipeEvent extends CustomEvent {
    detail: {
        dx: number
        dy: number
        xBefore: number
        yBefore: number
        xAfter: number
        yAfter: number
        direction: Direction
    }
}

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

    let xBefore: number | null = null
    let yBefore: number | null = null

    function handleTouchstart(event: TouchEvent) {
        const firstTouch = event.touches[0]
        xBefore = firstTouch.clientX
        yBefore = firstTouch.clientY

        window.addEventListener("touchmove", handleTouchmove)
    }

    function handleTouchmove(event: TouchEvent) {
        if (!xBefore || !yBefore) {
            return
        }

        const xAfter = event.touches[0].clientX
        const yAfter = event.touches[0].clientY

        const dx = xBefore - xAfter
        const dy = yBefore - yAfter

        let direction: Direction | null = null
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                direction = Direction.LEFT
            } else {
                direction = Direction.RIGHT
            }
        } else {
            if (dy > 0) {
                direction = Direction.UP
            } else {
                direction = Direction.DOWN
            }
        }

        node.dispatchEvent(
            new CustomEvent("swipe", {
                detail: { dx, dy, xBefore, xAfter, yBefore, yAfter, direction },
            }) as SwipeEvent
        )

        xBefore = null
        yBefore = null
    }

    node.addEventListener("mousedown", handleMousedown)
    node.addEventListener("touchstart", handleTouchstart)

    return {
        destroy() {
            node.removeEventListener("mousedown", handleMousedown)
        },
    }
}
export default pannable
