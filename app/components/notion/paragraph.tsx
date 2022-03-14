// TODO: Build a tree of HTML elements instead of composing styles.

import { textToComponents } from './text-to-components'
import { NotionBlock } from './types'

export function Paragraph({ block }: { block: NotionBlock }) {
    const children = textToComponents(block)

    return <p key={block.id + block.type}>{children}</p>
}
