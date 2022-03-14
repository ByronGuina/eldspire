import { textToComponents } from './text-to-components'
import { NotionBlock } from './types'

const headingMap = {
    heading_1: 'h1',
    heading_2: 'h2',
    heading_3: 'h3',
}

interface Props {
    block: NotionBlock
}

export function Heading({ block }: Props) {
    const blockType = block.type as keyof typeof headingMap
    const HeadingTag = headingMap[blockType] as keyof JSX.IntrinsicElements
    const children = textToComponents(block)
    return <HeadingTag>{children}</HeadingTag>
}
