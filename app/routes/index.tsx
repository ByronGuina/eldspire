import { LoaderFunction, useLoaderData } from 'remix'
import { fromNotionBlock } from '~/components/notion/block'
import { getFrontPage } from '~/db.server'

export const loader: LoaderFunction = async () => {
    return await getFrontPage()
}

export default function Index() {
    const blocks = useLoaderData()
    console.log(blocks)
    return <main className="layout">{blocks.map(fromNotionBlock)}</main>
}
