import { renderToString } from 'react-dom/server'
import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";

export default async function handleRequest(request: Request, status: number, headers: Headers, context: EntryContext) {
    const markup = renderToString(<RemixServer context={context} url={request.url} />)

    headers.set('Content-Type', 'text/html')

    const hash = naiveHash(markup)
    if (headers.get('If-None-Match') === hash) {
        return new Response(null, { status: 304 })
    }

    headers.set('ETag', hash)
    headers.append('Cache-Control', 's-maxage=60, stale-while-revalidate=60, stale-if-error=60')

    const newResponse = new Response('<!DOCTYPE html>' + markup, {
        status,
        headers,
    })

    return newResponse
}

function naiveHash(entity: string) {
    return (
        'W/' +
        `"${entity.split('').reduce((hash, char) => {
            return (hash << 5) - hash + char.charCodeAt(0)
        }, 0)}"`
    )
}
