import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, Ref, forwardRef } from 'react'
import { Link } from 'remix'

function useSearchModal(initialValue = false) {
    const [isOpen, setIsOpen] = useState(initialValue)
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        function onKeydown(e: KeyboardEvent) {
            switch (e.key) {
                case 'Escape':
                    setIsOpen(false)
                    return
                case '/':
                    setIsOpen(true)
                    return
            }
        }

        document.addEventListener('keyup', onKeydown)

        return () => {
            document.removeEventListener('keyup', onKeydown)
        }
    }, [])

    useEffect(() => {
        if (isOpen && ref.current) {
            ref.current.focus()
        }
    }, [isOpen])

    return {
        isOpen,
        toggle: () => setIsOpen(prev => !prev),
        ref,
    }
}

export function Navbar() {
    const { isOpen, toggle, ref } = useSearchModal(false)

    return (
        <nav className="navbar flex justify-between">
            <Link to="/" prefetch="intent">
                Home
            </Link>
            <div>
                <button onClick={toggle} className="focus" placeholder="Search for pages">
                    Search
                </button>
                <AnimatePresence exitBeforeEnter>
                    {isOpen && <Search onBackgroundClick={toggle} ref={ref} />}
                </AnimatePresence>
            </div>
        </nav>
    )
}

type Result = {
    title: string
    slug: string
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
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Result[]>(defaultResults)

    // TODO: Debounce
    // TODO: Use a remix form/action
    useEffect(() => {
        // TODO: Request results from the server
    }, [query])

    return {
        query,
        setQuery,
        results: results.length === 0 ? defaultResults : results,
    }
}

interface SearchModalProps {
    onBackgroundClick: () => void
}

function SearchModal({ onBackgroundClick }: SearchModalProps, ref: Ref<HTMLInputElement>) {
    const { results } = useQuery()

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
                className="search border border-text w-full bg-background z-30 mt-24"
            >
                <input
                    ref={ref}
                    type="search"
                    placeholder="Eldspire, Baalam Pixal"
                    className="bg-transparent w-full px-4 py-3 mb-4 focus placeholder-text placeholder-opacity-40"
                />
                <div>
                    <ul>
                        {results.map(result => (
                            <Link prefetch="intent" to={`/wiki/${result.slug}`} className="focus block px-4 py-2">
                                <li className="list-none">{result.title}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    )
}

export const Search = forwardRef<HTMLInputElement, SearchModalProps>(SearchModal)
