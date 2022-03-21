import { Link } from 'remix'

export function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" prefetch="intent">
                Home
            </Link>
        </nav>
    )
}
