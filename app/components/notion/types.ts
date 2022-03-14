export type NotionTextBlock = {
    id: string
    type: 'text'
    text: {
        content: string
        link: string | null
    }
    annotations: Annotations
    plain_text: string
    href: string | null
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

export type NotionBlockType = 'paragraph' | 'heading_1' | 'heading_2' | 'heading_3' | 'mention'

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
    mention?: {
        type: 'page'
        page: {
            id: string
        }
        rich_text: NotionTextBlock[]
    }
}

export type NotionTag = {
    id: string
    name: string
    color: string
}
