/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      fontFamily: {
        'pingfang': ['PingFang-Regular', 'sans'],
        'sourcehan': ['SourceHan-Regular', 'sans'],
      },
      fontSize: {
        '2xl': '1.625rem',
        '1_5xl': '1.375rem',
        // 其他可能的尺寸定义
      },
      colors: {
        gray: {
          50: "#f9f9f9",
          300: "#dedede",
          400: "#b5b5b5",
          500: "#999999",
          600: "#6b6b6b",
          800: "#2b5182",
          "50_F8":"#F8FCFF",
          "50_01": "#f9f9f9",
          "50_02": "#fbfbfb",
          "900_99": "#17171799",
          "50_f2": "#f3fafff2",
          "400_01": "#c0c0c0",
          "400-OA":"#A0A0A0",
          "500_ee": "#999999ee",
          "600_01": "#6c6c6c",
          "900_7f": "#1717177f",
        },
        blue: { 100: "#b6e0f9", A200: "#4a88d8", "50_c6": "#e5f5ffc6" },
        light_blue: {
          50: "#cfeeff",
          "50_2b": "#cfeeff2b",
          "50_bc": "#cfeeffbc",
          "50_f2": "#cfeefff2",
          "50_bc_01": "#cfedffbc",
          "50_01": "#cfedff",
        },
        blue_gray: { 700: "#375780", 900: "#333333", "900_01": "#343434", "900_02": "#232A50"},
        indigo: {
          400: "#4a87c3",
          800: "#2b5182",
          "800_01": "#3d3179",
          "400_7f": "#4f8ac27f",
          "800_33": "#2b518233",
          "400_33": "#4f8ac233",
          "400_01": "#4f8ac2",
          "800_7f": "#2b51827f",
          "800_99": "#2b518299",
        },
        red: { A700: "#db0303" },
        yellow: {
          200: "#fff494",
          900: "#d48931",
          A700: "#ffd400",
          "900_01": "#e58d2e",
        },
        orange: { A200: "#ef9c48", A200_01: "#faaa46", A200_02: "#ff9c40" },
        black: {
          900: "#000000",
          "900_aa": "#000000aa",
          "900_14": "#00000014",
          "900_d8": "#000000d8",
          "900_1e": "#0000001e",
          "900_a5": "#000000a5",
        },
        white: { A700_bc: "#ffffffbc", A700: "#ffffff" },
        amber: { 200: "#f7db77", A400: "#ffc500" },
        teal: { 50: "#d0e6fb" },
        cyan: { 900: "#0a4579" },
      },
      // fontFamily: { pingfangsc: "PingFang SC", pingfanghk: "PingFang HK" },
      boxShadow: {
        bs: "0px 2px  8px 0px #0000001e",
        bs1: "0px 2px  20px 0px #00000014",
        bs2: "0px 10px  20px 0px #00000014",
      },
      backgroundImage: {
        gradient: "linear-gradient(180deg ,#375780,#4a88d8)",
        gradient1: "linear-gradient(180deg ,#0a4579,#4a87c3)",
        gradient2: "linear-gradient(53deg ,#2b5182,#4f8ac2)",
        gradient3: "linear-gradient(180deg ,#fff494,#ff9c40)",
        gradient4: "linear-gradient(180deg ,#ff9c40,#f7db77)",
        gradient5: "linear-gradient(53deg ,#2b518233,#4f8ac233)",
        gradient6: "linear-gradient(53deg ,#2b51827f,#4f8ac27f)",
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
  // corePlugins: {
  //   preflight: false
  // }
}
