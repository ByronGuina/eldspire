import { json, LinksFunction, LoaderFunction, useLoaderData } from 'remix'
import { fromNotionBlock } from '~/components/notion/block'
import { NotionBlock } from '~/components/notion/types'
import { getPage } from '~/db.server'
import wikiStyles from '~/styles/wiki.css'

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: wikiStyles }]
}

interface LoaderData {
    blocks: NotionBlock[]
}

export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id

    if (!id) throw new Error('Id is required')

    return json(await getPage(id), {
        headers: {
            'Cache-Control': 'max-age=3600, stale-while-revalidate=60',
        },
    })
}

export default function Page() {
    const { blocks } = useLoaderData<LoaderData>()
    return <main className="layout">{blocks.map(fromNotionBlock)}</main>
}
