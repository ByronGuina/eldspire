import { LoaderFunction, redirect } from 'remix'
import { pageIdToSlug } from '~/db.server'

export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id

    if (!id) throw new Response('Not found', { status: 404, statusText: 'No id was found in the loader' })

    const slug = await pageIdToSlug(id)

    return redirect(`wiki/${slug}`, {
        headers: {
            'Cache-Control': 'max-age=15770000, stale-while-revalidate=60',
        },
    })
}
