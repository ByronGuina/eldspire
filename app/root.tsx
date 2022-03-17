import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix'
import type { MetaFunction, LinksFunction } from 'remix'

import rootStyles from './styles/tailwind.css'

export const meta: MetaFunction = () => {
    return { title: 'Eldspire | A Fantasy World' }
}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: rootStyles }]
}

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"
                />
                <meta property="og:type" content="website" />

                {/* Essential for socials */}
                {/* <title></title> */}
                {/* <meta name="description" content=""/> */}
                {/* <meta property="og:title" content={title} /> */}
                {/* <meta property="og:description" content={description} /> */}
                <meta name="twitter:card" content="summary_large_image" />
                {/* TODO: Base image off image in content -- once library is open. Prob will come from CDN */}
                <meta property="og:image" content="/site.png" />

                {/* Less essential */}
                <meta property="og:site_name" content="eldspire.com" />
                <meta name="twitter:site" content="@byronguina" />
                <meta name="twitter:creator" content="@byronguina" />
                <meta name="theme-color" content="#f2f2f0" />

                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

                <link rel="shortcut icon" type="image/png" href="/favicon.png" />
                <link rel="apple-touch-icon" href="/favicon.png" />
                <Meta />
                <Links />
            </head>
            <body>
                <nav className="navbar">
                    <Link to="/" prefetch="intent">
                        Home
                    </Link>
                </nav>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
