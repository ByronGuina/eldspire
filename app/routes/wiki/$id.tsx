import { json, LinksFunction, LoaderFunction, useLoaderData } from 'remix'
import { fromNotionBlock } from '~/components/notion/block'
import { NotionBlock } from '~/components/notion/types'
import { getPageByName } from '~/db.server'
import wikiStyles from '~/styles/wiki.css'

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: wikiStyles }]
}

interface LoaderData {
    blocks: NotionBlock[]
    title: string
}

export const loader: LoaderFunction = async ({ params }) => {
    const name = params.id

    if (!name) throw new Error('Name is required')

    return json(await getPageByName(name), {
        headers: {
            'Cache-Control': 'max-age=60, stale-while-revalidate=3600',
        },
    })
}

export default function Page() {
    const { blocks, title } = useLoaderData<LoaderData>()
    return (
        <main className="layout">
            <h1>{title}</h1>
            {blocks.map(fromNotionBlock)}
        </main>
    )
}
