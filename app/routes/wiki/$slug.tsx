import { json, LinksFunction, LoaderFunction, useLoaderData } from 'remix'
import { Block } from '~/components/notion/block'
import { NotionBlock } from '~/components/notion/types'
import { getPageBySlug } from '~/db.server'
import wikiStyles from '~/styles/wiki.css'

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: wikiStyles }]
}

interface LoaderData {
    blocks: NotionBlock[]
    title: string
}

export const loader: LoaderFunction = async ({ params }) => {
    const slug = params.slug

    if (!slug) throw new Response('Not found', { status: 404, statusText: 'No slug was found in the loader' })

    return json(await getPageBySlug(slug), {
        headers: {
            // 'Cache-Control': 'max-age=60, stale-while-revalidate=3600',
        },
    })
}

export default function Page() {
    const { blocks, title } = useLoaderData<LoaderData>()
    return (
        <>
            <h1>{title}</h1>
            {blocks.map(b => (
                <Block block={b} />
            ))}
        </>
    )
}