import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, Ref, forwardRef } from 'react'
import { Link } from 'remix'

function useSearch(initialValue = false) {
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
    const { isOpen, toggle, ref } = useSearch(false)

    return (
        <nav className="navbar flex justify-between">
            <Link to="/" prefetch="intent">
                Home
            </Link>
            <div>
                <button onClick={toggle} className="focus" placeholder="Search for pages">
                    Search
                </button>
                <AnimatePresence exitBeforeEnter>{isOpen && <Search ref={ref} />}</AnimatePresence>
            </div>
        </nav>
    )
}

function SearchModal({}, ref: Ref<HTMLInputElement>) {
    return (
        <div className="absolute left-0 top-0 w-screen h-screen flex">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', mass: 1, damping: 20, stiffness: 200 }}
                className="absolute left-0 top-0 w-full h-full bg-text z-10"
            />
            <motion.input
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 1.05 }}
                transition={{ type: 'spring', mass: 1, damping: 20, stiffness: 200 }}
                ref={ref}
                type="search"
                placeholder="Eldspire, Baalam Pixal"
                className="m-auto border border-text w-1/3 px-4 py-3 bg-background z-30 mt-24 focus placeholder-text placeholder-opacity-40"
            />
        </div>
    )
}

export const Search = forwardRef<HTMLInputElement, {}>(SearchModal)
