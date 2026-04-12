/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#3B82F6',
                'secondary': '#1F2937',
                'accent': '#10B981',
            },
            fontFamily: {
                sans: ['var(--font-sans)'],
            },
        },
    },
    plugins: [],
};
