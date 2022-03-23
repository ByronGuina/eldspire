import { json, LinksFunction, LoaderFunction, MetaFunction, useLoaderData } from 'remix'
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

export const meta: MetaFunction = ({ data, location }) => {
    const url = `https://eldspire.com${location.pathname}`
    const title = `${data.title} | Eldspire`
    return {
        title,
        'og:title': title,
        url,
        'og:url': url,
        // TODO:
        // description
        // SEO image
    }
}

export const loader: LoaderFunction = async ({ params }) => {
    const slug = params.slug

    if (!slug) throw new Response('Not found', { status: 404, statusText: 'No slug was found in the loader' })

    return json(await getPageBySlug(slug), {
        headers: {
            // 'Cache-Control': 'max-age=604800, stale-while-revalidate=60, stale-if-error=60',
        },
    })
}

export default function Page() {
    const { blocks, title } = useLoaderData<LoaderData>()
    return (
        <div className="flex flex-col">
            <h1>{title}</h1>
            {blocks.map(b => (
                <Block key={b.id} block={b} />
            ))}
        </div>
    )
}
