/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,svelte,ts}",
    ],
    theme: {
        extend: {
            gridTemplateRows: {
                content: "8dvh 1fr",
                settings: "5% 1fr 10%",
            },
        },
    },
    darkMode: "class",
};
