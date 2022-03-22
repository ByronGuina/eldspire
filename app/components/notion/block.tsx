import { textToComponents } from './text-to-components'
import { NotionBlock } from './types'

// TODO: This could be passed in as a prop if I want to use
// other components than these hardcoded ones
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

    // TODO: Make block and text-to-components a bit simplier using
    // recursion or some shit
    const children = textToComponents(block)

    if (block.type === 'image') {
        return <img className="rounded" src={block.image.file.url} />
    }

    if (block.type === 'bulleted_list_item') {
        return (
            <ul>
                <Tag>{children}</Tag>
            </ul>
        )
    }

    return <Tag>{children}</Tag>
}
