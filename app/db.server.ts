import { Client } from '@notionhq/client'
import { NotionTextBlock } from './components/notion/types'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

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
}

export async function getPageBySlug(slug: string) {
    const page = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
            property: 'slug',
            rich_text: { equals: slug },
        },
    })

    console.log(page)
    const fullPage = await getPage(page.results[0].id)

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
        throw new Error('No slug defined in Notion')
    }

    return pageInfo.properties.slug.rich_text[0].plain_text
}

export async function getPage(id: string) {
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
