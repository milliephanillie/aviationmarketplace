module.exports = {
    jit: true,
    purge: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        backgroundColor: theme => ({
            ...theme('colors'),
        }),
        container: {
            padding: '20px',
            screens: {
                xs: '600px',
                sm: '785px',
                md: '989px',
                lg: '1100px',
                xl: '1175px',
            },
        },
        fontSize: {
            'xs': ['12px', {
                lineHeight: '15px',
            }],
            'sm':'13px',
            'tiny': '14px',
            'base': '18px',
            'lg': '20px',
            'xl': '24px',
            '2xl': '28px',
            '3xl': '36px',
            '4xl': '42px',
            '5xl': '48px',
            '6xl': '56px',
            '7xl': '62px',
        },
        extend: {
            fontFamily: {
                'headers': "var(--headersFont)",
                'default': "var(--defaultFont)",
            },
            margin: {
                '5px': '5px',
            },
            colors: {
                'midnight': '#082036',
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    }
}
