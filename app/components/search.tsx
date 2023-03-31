'use client'

import { Command } from 'cmdk'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { PageLink } from '~/lib/db'
import { ResizableContainer } from './resizable-container'
import { useRouter } from 'next/navigation'

function useSearch() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<PageLink[]>([])
    const abortController = useRef(new AbortController())

    useEffect(() => {
        async function search() {
            if (query === '') return
            abortController.current.abort()
            abortController.current = new AbortController()

            const response = await fetch(`/api/search?query=${query}`, {
                signal: abortController.current.signal,
            })

            const results: {
                results: PageLink[]
            } = await response.json()

            setResults(results.results)
        }
        search()
    }, [query])

    return {
        query,
        setQuery,
        results: query !== '' ? results : [],
    }
}

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function Search({ open, onOpenChange }: Props) {
    const { query, setQuery, results } = useSearch()
    const router = useRouter()

    return (
        <Command.Dialog open={open} onOpenChange={onOpenChange} label="Entity search">
            <div className="pointer-events-none fixed inset-0 z-100 flex h-full w-full items-start justify-center overflow-hidden">
                <div className="z-100 pointer-events-auto mt-32 w-full max-w-[434px] overflow-hidden bg-background-1 shadow-sm">
                    <input
                        className="w-full px-2 py-3 border-2 border-text focus:outline-none bg-background-1 placeholder:text-text-1"
                        value={query}
                        placeholder="Search..."
                        onChange={e => setQuery(e.currentTarget.value)}
                    />
                    <ResizableContainer duration={0.15}>
                        {results.map(r => (
                            <Command.Item
                                className="border-box border border-transparent aria-selected:border-text aria-selected:bg-background cursor-pointer px-2 py-1 overflow-hidden"
                                key={r.title}
                                onSelect={() => {
                                    router.push(`/wiki/${r.id}`)
                                    onOpenChange(false)
                                    setQuery('')
                                }}
                            >
                                {r.title}
                            </Command.Item>
                        ))}
                    </ResizableContainer>
                </div>
            </div>
        </Command.Dialog>
    )
}
