import { renderToReadableStream } from 'react-dom/server'
import type { EntryContext } from '@remix-run/server-runtime'
import isbot from 'isbot'
import { RemixServer } from '@remix-run/react'

export default async function handleRequest(request: Request, status: number, headers: Headers, context: EntryContext) {
    // const markup = ReactDOMServer.renderToString(<RemixServer context={context} url={request.url} />)

    const body = await renderToReadableStream(<RemixServer context={context} url={request.url} />, {
        onError() {
            status = 500
        },
    })

    if (isbot(request.headers.get('user-agent'))) {
        await body.allReady
    }

    headers.set('Content-Type', 'text/html')

    // if (ENVIRONMENT === 'dev') {
    //     headers.set('Cache-Control', 'no-cache')
    // }

    const newResponse = new Response(body, {
        status,
        headers,
    })

    return newResponse
}
