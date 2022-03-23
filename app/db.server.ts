import { Client } from '@notionhq/client'
import { NotionTextBlock } from './components/notion/types'

const notion = new Client({ auth: NOTION_API_TOKEN })

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

export async function getPageBySlug(slug: string) {
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

    const fullPage = await getPageContent(page.results[0].id)

    return {
        blocks: fullPage.blocks,
        title: fullPage.title,
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

export async function searchPages(name: string) {
    const pages = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
            property: 'Name',
            title: { contains: name },
        },
    })

    const results = pages.results as unknown as WikiPageInfo[]

    return results.map(p => ({
        title: p.properties.Name.title[0].plain_text,
        slug: p.properties.slug?.rich_text[0].plain_text,
    }))
}

export type PageLink = {
    title: string
    slug: string
}

export async function getPageLinks(): Promise<PageLink[]> {
    const pages = await notion.databases.query({
        database_id: DATABASE_ID,
    })

    const results = pages.results as unknown as WikiPageInfo[]

    return results
        .map(p => ({
            title: p.properties.Name.title[0].plain_text,
            slug: p.properties.slug.rich_text[0].plain_text,
            lastEditedTime: p.last_edited_time,
        }))
        .sort((a, b) => new Date(b.lastEditedTime).getTime() - new Date(a.lastEditedTime).getTime())
}
