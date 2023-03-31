'use client'

import Link from 'next/link'

export function Navbar() {
    return (
        <nav className="navbar flex justify-between">
            <Link href="/" className="no-underline">
                Home
            </Link>
        </nav>
    )
}
