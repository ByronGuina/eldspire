import { motion } from 'framer-motion'
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react'
import { Link, useFetcher } from '@remix-run/react'
import { PageLink } from '~/db.server'
import { useSearch } from '~/state'

interface SearchModalProps {
    onBackgroundClick: () => void
}

const useDebounce = <T extends (value: string) => void>(callback: T, delay: number) => {
    const latestTimeout = useRef<NodeJS.Timeout>()

    return (value: string) => {
        if (latestTimeout.current) {
            clearTimeout(latestTimeout.current)
        }

        latestTimeout.current = setTimeout(() => {
            callback(value)
        }, delay)
    }
}

function useQuery() {
    const pages = useSearch(state => state.results)
    const [query, setQuery] = useState('')
    const fetcher = useFetcher<PageLink[]>()

    const search = useDebounce((value: string) => fetcher.load(`/search/${value}`), 300)

    useEffect(() => {
        if (query) search(query)
    }, [query])

    const results = fetcher.data && fetcher.data.length > 0 && query ? fetcher.data.slice(0, 10) : pages.slice(0, 10)

    return {
        query,
        setQuery: setQuery,
        results,
    }
}

function SearchModal({ onBackgroundClick }: SearchModalProps, ref: Ref<HTMLInputElement>) {
    const { query, setQuery, results } = useQuery()

    return (
        <div className="absolute left-0 top-0 w-screen h-screen flex">
            <motion.div
                onClick={onBackgroundClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', mass: 0.1, damping: 20, stiffness: 400 }}
                className="absolute left-0 top-0 w-full h-full bg-text z-10"
            />
            <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 1.05 }}
                transition={{ type: 'spring', mass: 0.1, damping: 20, stiffness: 400 }}
                className="search border border-text w-full bg-background z-30 mt-24 rounded"
            >
                <input
                    ref={ref}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    type="search"
                    placeholder="Eldspire, Baalam Pixal"
                    className="bg-transparent w-full px-4 py-3 mb-4 focus placeholder-text placeholder-opacity-40"
                />

                <div>
                    {results.length > 0 ? (
                        <ul>
                            {results.map((page: PageLink) => (
                                <Link
                                    onClickCapture={onBackgroundClick}
                                    onKeyUpCapture={e => e.key === 'Enter' && onBackgroundClick()}
                                    key={page.slug}
                                    prefetch="render"
                                    to={`/wiki/${page.slug}`}
                                    className="focus block px-4 py-2 no-underline"
                                >
                                    <li className="list-none">{page.title}</li>
                                </Link>
                            ))}
                        </ul>
                    ) : (
                        <p className="px-4 py-2">Can't find any wiki pages. Try another search.</p>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export const Search = forwardRef<HTMLInputElement, SearchModalProps>(SearchModal)
