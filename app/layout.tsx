'use client'
import React from 'react'
import { Navbar } from './components/navbar'
import type { Metadata } from 'next'

import './styles/tailwind.css'
import './styles/wiki.css'

const metadata: Metadata = {
    title: 'Eldspire | A Fantasy World',
    description: 'Website and wiki for the Eldspire fantasy universe.',
    themeColor: '#F2F2F0',
    openGraph: {
        type: 'website',
        title: 'Eldspire | A Fantasy World',
        description: 'Website and wiki for the Eldspire fantasy universe.',
        url: 'https://eldspire.com',
        siteName: 'Eldspire',
        locale: 'en_US',
        images: [
            {
                url: 'https://bairun.xyz/site.png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Eldspire | A Fantasy World',
        description: 'Website and wiki for the Eldspire fantasy universe.',
        creator: '@bairun_',
        images: ['https://bairun.xyz/site.png'],
    },
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
        other: {
            rel: 'favicon',
            url: '/favicon.png',
        },
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="canonical" href="https://eldspire.com/" />
            </head>
            <body className="relative">
                <Navbar />
                <main className="layout">{children}</main>
            </body>
        </html>
    )
}
