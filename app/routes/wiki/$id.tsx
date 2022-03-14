import { json, LoaderFunction, useLoaderData } from 'remix'
import { fromNotionBlock } from '~/components/notion/block'
import { getPage } from '~/db.server'

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
    const blocks = useLoaderData()
    return <main className="layout">{blocks.map(fromNotionBlock)}</main>
}
