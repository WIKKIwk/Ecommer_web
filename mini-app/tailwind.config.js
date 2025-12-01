/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Playfair Display', 'Georgia', 'serif'],
            },
            borderRadius: {
                DEFAULT: '24px',
                'xl': '28px',
                '2xl': '36px',
            },
            boxShadow: {
                'card': '0 25px 80px rgba(15, 23, 42, 0.08)',
                'glass': '0 25px 60px rgba(15, 23, 42, 0.08)',
            },
            colors: {
                telegram: {
                    bg: 'var(--tg-theme-bg-color)',
                    text: 'var(--tg-theme-text-color)',
                    hint: 'var(--tg-theme-hint-color)',
                    link: 'var(--tg-theme-link-color)',
                    button: 'var(--tg-theme-button-color)',
                    'button-text': 'var(--tg-theme-button-text-color)',
                },
            },
        },
    },
    plugins: [],
}
