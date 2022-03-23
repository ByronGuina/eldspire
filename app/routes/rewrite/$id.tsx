import { LoaderFunction, redirect } from 'remix'
import { pageIdToSlug } from '~/db.server'

export const loader: LoaderFunction = async ({ params, request }) => {
    const id = params.id

    if (!id) throw new Response('Not found', { status: 404, statusText: 'No id was found in the loader' })

    const slug = await pageIdToSlug(id)

    // console.log(request)
    console.log(request.headers.get('host'))
    const host = request.headers.get('host')
    const http = host?.includes('localhost') ? 'http' : 'https'

    return redirect(`${http}://${host}/wiki/${slug}`, {
        headers: {
            'Cache-Control': 'max-age=15770000, stale-while-revalidate=60',
        },
    })
}
