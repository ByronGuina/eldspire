import { textToComponents } from './text-to-components'
import { NotionBlock } from './types'

const toHtmlTag = {
    heading_1: 'h1',
    heading_2: 'h2',
    heading_3: 'h3',
    paragraph: 'p',
    bulleted_list_item: 'li',
}

export function Block({ block }: { block: NotionBlock }) {
    const blockType = block.type as keyof typeof toHtmlTag
    const Tag = toHtmlTag[blockType] as keyof JSX.IntrinsicElements
    const children = textToComponents(block)

    if (block.type === 'bulleted_list_item') {
        return <ul>{children}</ul>
    }

    return <Tag>{children}</Tag>
}
