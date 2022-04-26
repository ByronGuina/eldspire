import { HeadersFunction, json, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/server-runtime'
import { useLoaderData } from '@remix-run/react'
import { Block } from '~/components/notion/block'
import { NotionBlock } from '~/components/notion/types'
import { getPageBySlug, getPageLastEditedTime } from '~/db.server'
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

export const headers: HeadersFunction = () => {
    return {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60, stale-if-error=60',
    }
}

export const loader: LoaderFunction = async ({ params, request }) => {
    const slug = params.slug

    if (!slug) throw new Response('Not found', { status: 404, statusText: 'No slug was found in the loader' })

    const lastEditedTime = await getPageLastEditedTime(slug)
    const hash = naiveHash(lastEditedTime)

    // check if the `If-None-Match` header matches the ETag
    if (request.headers.get('If-None-Match') === hash) {
        console.log('sending 304s for', slug)
        // and send an empty Response with status 304 and the headers.
        return new Response(null, { status: 304 })
    }

    const page = await getPageBySlug(slug)

    return json(page, {
        headers: {
            // 'Cache-Control': 'public, max-age=10, s-maxage=1, stale-while-revalidate=1, stale-if-error=1',
            'Last-Modified': lastEditedTime,
            ETag: hash,
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

function naiveHash(entity: string) {
    return (
        'W/' +
        `"${entity.split('').reduce((hash, char) => {
            return (hash << 5) - hash + char.charCodeAt(0)
        }, 0)}"`
    )
}
