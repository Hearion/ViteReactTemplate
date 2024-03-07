import logo from "../assets/images/logo.svg";
import {useState} from "react";
import {Button} from "antd";

const IndexPage = () => {

    const [count, setCount] = useState(0);

    return (
        <div className="text-center selection:bg-green-900">
            <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
                <img
                    src={logo}
                    className="animate-speed h-60 motion-safe:animate-spin"
                    alt="logo"
                />
                <style>
                    {
                        "\
                        .animate-speed{\
                          animation-duration:20s;\
                        }\
                      "
                    }
                </style>
                <p className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent">
                    Vite 4 + React 18 + Tailwindcss v3 + Antd 5
                </p>
                <p className="mt-3">
                    <Button
                        type={'primary'}
                        onClick={() => setCount((count) => count + 1)}
                    >
                        count is: {count}
                    </Button>
                </p>
                <p>
                    编辑 <code className="text-[#8d96a7]">src/pages/IndexPage.jsx</code> 并保存以测试HMR更新。
                </p>
                <p className="mt-3 flex gap-3 text-center text-[#8d96a7]">
                    <a
                        className="text-[#61dafb] transition-all hover:text-blue-400"
                        href="https://react.docschina.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        学习 React
                    </a>
                    {" | "}
                    <a
                        className="text-[#61dafb] transition-all hover:text-blue-400"
                        href="https://cn.vitejs.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vite 文档
                    </a>
                    {" | "}
                    <a
                        className="text-[#61dafb] transition-all hover:text-blue-400"
                        href="https://ant-design.antgroup.com/index-cn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Antd5 文档
                    </a>
                </p>
            </header>
        </div>
    )
}

export default IndexPage
