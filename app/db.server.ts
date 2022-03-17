import { Client } from '@notionhq/client'

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

export async function getPageByName(name: string) {
    const page = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
            property: 'Name',
            rich_text: { equals: name },
        },
    })

    return {
        blocks: await getPage(page.results[0].id),
        title: name,
    }
}

export async function getPage(id: string) {
    const results = await notion.blocks.children.list({
        block_id: id,
    })

    if (!results.results) {
        throw new Error('Empty block')
    }

    return results.results
}
