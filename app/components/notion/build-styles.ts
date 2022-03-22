import { NotionTextBlock } from './types'

// TODO: This can be passed as a style resolver from the consumer. This
// would let us let the consumer specify how to style inline text styles.
export function getStyles(annotations: NotionTextBlock['annotations']) {
    let styles = ``

    if (annotations.bold) {
        styles += 'font-semibold '
    }

    if (annotations.italic) {
        styles += 'italic '
    }

    if (annotations.strikethrough) {
        styles += 'line-through '
    }

    if (annotations.underline) {
        styles += `border-b `
    }

    if (annotations.code) {
        styles += `font-mono `
    }

    return styles
}
