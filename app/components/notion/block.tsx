import { Heading } from './heading'
import { ListItem } from './list-item'
import { Paragraph } from './paragraph'
import { NotionBlock, NotionBlockType } from './types'

const componentMap: Record<NotionBlockType, (block: NotionBlock) => JSX.Element> = {
    paragraph: (block: NotionBlock) => <Paragraph key={block.id} block={block} />,
    heading_1: (block: NotionBlock) => <Heading key={block.id} block={block} />,
    heading_2: (block: NotionBlock) => <Heading key={block.id} block={block} />,
    heading_3: (block: NotionBlock) => <Heading key={block.id} block={block} />,
    mention: (block: NotionBlock) => <Paragraph key={block.id} block={block} />,
    bulleted_list_item: (block: NotionBlock) => <ListItem key={block.id} block={block} />,
}

export function fromNotionBlock(block: NotionBlock) {
    console.log(block)

    const renderComponent = componentMap[block.type]

    if (block.type === 'bulleted_list_item') {
        return <ul>{renderComponent(block)}</ul>
    }

    return renderComponent(block)
}
