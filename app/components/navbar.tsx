'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Search } from './search'

export function Navbar() {
    const [open, search] = useState(false)

    useEffect(() => {
        function open(e: KeyboardEvent) {
            if (e.key === '/') {
                e.preventDefault()
                search(true)
            }
        }

        document.addEventListener('keydown', open)
        return () => document.removeEventListener('keydown', open)
    }, [])

    return (
        <nav className="navbar flex justify-between">
            <Link href="/" className="no-underline">
                Home
            </Link>
            <button onClick={() => search(s => !s)}>Search</button>
            <Search open={open} onOpenChange={search} />
        </nav>
    )
}
