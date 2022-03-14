import { NotionTextBlock } from './types'

// This lets us build the styles in the thought.css file instead
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
