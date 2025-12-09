/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                midnight: '#0f172a',
                brand: {
                    primary: '#8b5cf6', // Violet
                    secondary: '#ec4899', // Pink
                    accent: '#fbbf24', // Gold (Legacy Sherlock)
                    dark: '#1e293b',
                }
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(to right bottom, #4c1d95, #0f172a, #0f172a)',
                'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            }
        }
    },
    plugins: [],
}
