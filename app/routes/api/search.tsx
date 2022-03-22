import { json, LoaderFunction } from 'remix'
import { searchPages } from '~/db.server'

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url)
    const searchQuery = url.searchParams.get('search')

    if (searchQuery === '') return json([])

    // The Notion API returns the entire database if there is no match for `contains` when filtering.
    // We instead want to return a default array if the query is empty.
    const pages = await searchPages(searchQuery || '')
    return json(pages)
}
