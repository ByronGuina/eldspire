module.exports = {
    darkMode: 'class',
    purge: {
        content: ['./app/**/*.{js,jsx,ts,tsx,md,mdx}'],
        options: {
            safelist: ['dark', 'thought'],
        },
    },
    theme: {
        fontFamily: {
            sans: [
                "'Byron', 'Inter', system, -apple-system, '.SFNSText-Regular', 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif",
            ],
        },
        extend: {
            colors: {
                'elevation-1': '#161916',
                'elevation-2': '#1f1f1f',
                'elevation-3': '#252628',
                'elevation-4': '#292B26',
                'elevation-5': '#30312c',
                'elevation-6': '#40413c',
                'elevation-7': '#555555',
                'elevation-8': '#656665',
                'elevation-9': '#959693',
                'elevation-10': '#B3B4B0',
                'elevation-11': '#d2d3d0',
                'elevation-12': '#f2f0f0',
                blue: '#5777ff',
                green: '#a3c3a6',
            },
            fontSize: {
                xxs: '.625rem',
            },
            letterSpacing: {
                tightish: '-0.015rem',
            },
            boxShadow: {
                harsh: '6px 6px 1px #30312c',
            },
        },
    },
    variants: {},
    plugins: [],
}

// breakpoints
// 2188
