import { motion } from 'framer-motion'
import { forwardRef, Ref, useEffect, useState } from 'react'
import { Link } from 'remix'
import { PageLink } from '~/db.server'
import { useSearch } from '~/state'

interface SearchModalProps {
    onBackgroundClick: () => void
}

const defaultResults = [
    {
        title: 'Kalantha',
        slug: 'kalantha',
    },
    {
        title: 'Eldspire',
        slug: 'eldspire',
    },
]

function useQuery() {
    const pages = useSearch(state => state.results)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<PageLink[]>(defaultResults)

    useEffect(() => {
        if (query === '') {
            setResults(pages.slice(0, 10))
        } else {
            const filtered = pages.filter(page => page.title.toLowerCase().includes(query.toLowerCase()))
            const firstTen = filtered.slice(0, 10)
            setResults(firstTen)
        }
    }, [query])

    return {
        query,
        setQuery,
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
                                    className="focus block px-4 py-2"
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
