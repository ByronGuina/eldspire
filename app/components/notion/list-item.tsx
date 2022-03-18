import { textToComponents } from './text-to-components'
import { NotionBlock } from './types'

export function ListItem({ block }: { block: NotionBlock }) {
    const children = textToComponents(block)

    return <li key={block.id + block.type}>{children}</li>
}
