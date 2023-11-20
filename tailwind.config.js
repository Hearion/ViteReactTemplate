/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        screens: {md: {max: "1050px"}, sm: {max: "550px"}},
        extend: {
            fontFamily: {
                'pingfang': ['PingFang-Regular', 'sans'],
                'sourcehan': ['SourceHan-Regular', 'sans'],
            },
            colors: {
                gray: {
                    50: "#f9f9f9",
                },
            },
            boxShadow: {
                bs: "0px 2px  8px 0px #0000001e",
            },
            backgroundImage: {
                gradient: "linear-gradient(180deg ,#375780,#4a88d8)",
            },
        },
    },
}
