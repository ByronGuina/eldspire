import { HeadersFunction, json, LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Block } from '~/components/notion/block'
import { NotionBlock } from '~/components/notion/types'
import { getFrontPage } from '~/db.server'

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders

export const loader: LoaderFunction = async () => {
    return json(await getFrontPage(), {
        headers: {
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    })
}

export default function Index() {
    const blocks = useLoaderData<NotionBlock[]>()
    return (
        <>
            {blocks.map(b => (
                <Block key={b.id} block={b} />
            ))}
        </>
    )
}
