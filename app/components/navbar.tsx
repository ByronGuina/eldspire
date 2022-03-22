import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'remix'
import { Search } from './search'

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
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
        ref,
    }
}

export function Navbar() {
    const { isOpen, onOpen, onClose, ref } = useSearchModal(false)

    return (
        <nav className="navbar flex justify-between">
            <Link to="/" prefetch="intent">
                Home
            </Link>
            <div>
                <button onClick={onOpen} className="focus" placeholder="Search for pages">
                    Search
                </button>
                <AnimatePresence exitBeforeEnter>
                    {isOpen && <Search onBackgroundClick={onClose} ref={ref} />}
                </AnimatePresence>
            </div>
        </nav>
    )
}
