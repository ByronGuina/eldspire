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
                {isOpen && <Search ref={ref} />}
            </div>
        </nav>
    )
}

function SearchModal({}, ref: Ref<HTMLInputElement>) {
    return (
        <div className="absolute left-0 top-0 w-screen h-screen flex">
            <div className="absolute left-0 top-0 w-full h-full bg-text opacity-40 z-10" />
            <input ref={ref} className="m-auto border border-text w-1/3 px-4 py-3 bg-background z-30 mt-24 focus" />
        </div>
    )
}

export const Search = forwardRef<HTMLInputElement, {}>(SearchModal)
