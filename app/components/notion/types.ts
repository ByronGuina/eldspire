export type NotionTextBlock = {
    id: string
    type: 'text' | 'mention'
    text: {
        content: string
        link: string | null
    }
    annotations: Annotations
    plain_text: string
    href?: string
    mention?: {
        type: 'page'
        page: { id: '8c60f72b-1656-4f21-a5f4-231a3c1d1572' }
    }
}

type Annotations = {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
}

export type NotionMentionBlock = {
    id: string
    type: 'mention'
    annotations: Annotations
    href: string
}

export type NotionBlockType = 'paragraph' | 'heading_1' | 'heading_2' | 'heading_3' | 'bulleted_list_item' | 'image'

// TODO: implement other block types
export type NotionBlock = {
    id: string
    type: NotionBlockType
    paragraph?: {
        rich_text: NotionTextBlock[]
    }
    heading_1?: {
        rich_text: NotionTextBlock[]
    }
    heading_2?: {
        rich_text: NotionTextBlock[]
    }
    heading_3?: {
        rich_text: NotionTextBlock[]
    }
    bulleted_list_item?: {
        rich_text: NotionTextBlock[]
    }
    image: {
        file: {
            url: string
        }
    }
}

export type NotionTag = {
    id: string
    name: string
    color: string
}
