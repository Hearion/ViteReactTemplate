/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {

        },
    },
    corePlugins: {
        preflight: false //禁用 Tailwind 的全局基本样式，
        //而不影响那些依靠添加自己的基本样式来正常工作的 utilities。
    },
}
