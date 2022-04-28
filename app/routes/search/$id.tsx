import { json, LoaderFunction } from '@remix-run/server-runtime'
import { searchPages } from '~/db.server'

export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id
    if (!id) throw new Response('Not found', { status: 404, statusText: 'No search query was found in the loader' })

    const data = await searchPages(id)
    console.log(data)

    return json(data, {
        // headers: {
        //     'Cache-Control': 'public, max-age=15770000, s-maxage=15770000',
        // },
    })
}
