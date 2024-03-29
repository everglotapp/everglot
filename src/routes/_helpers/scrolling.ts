export function scrollToBottom(
    container: HTMLElement,
    force: boolean = false
): void {
    if (!isScrolledToBottom(container) && !force) {
        return
    }
    scroll(container)
}

export const isScrolledToBottom = (container: HTMLElement) =>
    isScrolledToOrLower(container, null)

/**
 * This function will set the scrollTop of an element using either the
 * scroll method if available, or by changing the scrollTop property.
 * If no scrollTop is specified, it'll scroll to the bottom.
 * src: https://github.com/theomessin/vue-chat-scroll/blob/8a68a271fecaffad43d25300ca192e0ada88100b/src/scroll.ts
 */
const scroll = (el: HTMLElement, scrollTop?: number): void => {
    const top = scrollTop || el.scrollHeight - el.clientHeight
    if (typeof el.scroll === "function") {
        el.scroll({ top })
    } else {
        el.scrollTop = top
    }
}

/**
 * Get distance in pixels that the scroll position is away from the element's bottom.
 * @param el Element
 */
export const scrollDistanceFromBottom = (el: HTMLElement): number => {
    const bottomScrollTop = el.scrollHeight - el.clientHeight
    return bottomScrollTop - el.scrollTop
}

/**
 * Whether the element is scrolled to the specified position.
 * @param el Element
 * @param scrollTop Position to check against, bottom if null.
 */
const isScrolledToOrLower = (
    el: HTMLElement,
    scrollTop: number | null
): boolean => {
    const top = scrollTop || el.scrollHeight - el.clientHeight
    return Math.ceil(el.scrollTop) >= top
}
