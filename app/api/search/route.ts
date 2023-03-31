import { NextResponse } from 'next/server'
import { DB } from '~/lib'

const PARAM = 'query'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    if (!searchParams.get(PARAM)) {
        throw new Error('No query param provided at /api/search?query')
    }

    const results = await DB.searchPages(searchParams.get(PARAM) || '')
    return NextResponse.json({ results: results.slice(0, 10) })
}
