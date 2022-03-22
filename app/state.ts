import { useEffect, useRef } from 'react'
import create from 'zustand'
import { PageLink } from './db.server'

interface SearchStore {
    results: PageLink[]
    setResults: (results: PageLink[]) => void
}

export const useSearch = create<SearchStore>(set => ({
    results: [],
    setResults: results => set({ results }),
}))

export const useIsomorphicSearch = (pages: PageLink[]) => {
    const isSettled = useRef(false)
    const setResults = useSearch(state => state.setResults)

    useEffect(() => {
        isSettled.current = true
    }, [])

    useEffect(() => {
        if (isSettled.current) {
            setResults(pages)
        }
    }, [isSettled])
}
