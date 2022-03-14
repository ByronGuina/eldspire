import { Heading } from './heading'
import { Paragraph } from './paragraph'
import { NotionBlock, NotionBlockType } from './types'

const componentMap: Record<NotionBlockType, (block: NotionBlock) => JSX.Element> = {
    paragraph: (block: NotionBlock) => <Paragraph key={block.id} block={block} />,
    heading_1: (block: NotionBlock) => <Heading key={block.id} block={block} />,
    heading_2: (block: NotionBlock) => <Heading key={block.id} block={block} />,
    heading_3: (block: NotionBlock) => <Heading key={block.id} block={block} />,
    mention: (block: NotionBlock) => <Paragraph key={block.id} block={block} />,
}

export function fromNotionBlock(block: NotionBlock) {
    const renderComponent = componentMap[block.type]
    return renderComponent(block)
}
