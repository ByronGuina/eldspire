import { Client } from '@notionhq/client'
import { NotionBlock, NotionTextBlock } from '../components/notion/types'

const notion = new Client({ auth: process.env.NOTION_API_TOKEN })

const DATABASE_ID = '1c49b767ea344dabb55be7137d867092'

export async function getFrontPage() {
    const results = await notion.blocks.children.list({
        block_id: '070d7a5628a64bbda44ca5edb7b4aeca',
    })

    if (!results.results) {
        throw new Error('Empty block')
    }

    return results.results
}

type WikiPageInfo = {
    id: string
    properties: {
        Name: {
            title: {
                plain_text: string
            }[]
        }
        slug: {
            rich_text: NotionTextBlock[]
        }
    }
    last_edited_time: string
}

export type PageFromSlug = {
    blocks: NotionBlock[]
    title: string
    lastEditedTime: string
}

export async function getPageBySlug(slug: string): Promise<PageFromSlug> {
    const page = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
            property: 'slug',
            rich_text: { equals: slug },
        },
    })

    if (page.results.length === 0) {
        throw new Response('Page not found', { status: 404 })
    }

    const results = page.results as unknown as WikiPageInfo[]

    const fullPage = await getPageContent(page.results[0].id)

    return {
        blocks: fullPage.blocks as NotionBlock[],
        title: fullPage.title,
        lastEditedTime: results?.[0].last_edited_time,
    }
}

export async function pageIdToSlug(id: string) {
    const pageInfo = (await notion.pages.retrieve({
        page_id: id,
    })) as unknown as WikiPageInfo

    if (!pageInfo.properties.slug) {
        throw new Response('Page not found', { status: 404 })
    }

    return pageInfo.properties.slug.rich_text[0].plain_text
}

export async function getPageContent(id: string) {
    const results = await notion.blocks.children.list({
        block_id: id,
    })

    if (!results.results) {
        throw new Error('Empty block')
    }

    const pageInfo = (await notion.pages.retrieve({
        page_id: id,
    })) as unknown as WikiPageInfo

    return {
        title: pageInfo.properties.Name.title[0].plain_text,
        blocks: results.results,
    }
}

export type PageLink = {
    title: string
    slug: string
    id: string
    lastEditedTime: string
}

export async function searchPages(name: string): Promise<PageLink[]> {
    const pages = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
            property: 'Name',
            title: { contains: name },
        },
    })

    const results = pages.results as unknown as WikiPageInfo[]

    return results.map(p => {
        const isSlug = Boolean(p.properties.slug.rich_text?.[0])

        return {
            title: p.properties.Name.title[0].plain_text,
            id: p.id,
            slug: isSlug ? p.properties.slug.rich_text[0].plain_text : '',
            lastEditedTime: p.last_edited_time,
        }
    })
}
