import { json, LoaderFunction, useLoaderData } from 'remix'
import { fromNotionBlock } from '~/components/notion/block'
import { getFrontPage } from '~/db.server'

export const loader: LoaderFunction = async () => {
    return json(await getFrontPage(), {
        headers: {
            'Cache-Control': 'max-age=3600, stale-while-revalidate=60',
        },
    })
}

export default function Index() {
    const blocks = useLoaderData()
    console.log(blocks)
    return <main className="layout">{blocks.map(fromNotionBlock)}</main>
}
