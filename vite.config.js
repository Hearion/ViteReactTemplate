import {defineConfig, loadEnv} from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'
import {uglify} from "rollup-plugin-uglify";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const isBuild = command === 'build'
    const env = loadEnv(mode, process.cwd(), '')

    return ({
        base: env.VITE_ROUTE_BASE_URL,
        plugins: [
            react(),
            uglify(),
            // visualizer({
            //     filename: 'dist/bundle-visualizer.html', // 生成的可视化文件名
            //     // sourcemap: true, // 生成源映射
            //     gzipSize: true,
            //     brotliSize: true
            // }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        server: {
            host: '0.0.0.0',
            port: 3000,
            open: true,
            strictPort: true
        },
        esbuild: {
            // 是否忽略注释
            ignoreAnnotations: !isBuild,
            // 清除打印和debug
            drop: isBuild ? ['debugger', 'console'] : []
        },
        build: {
            // 调整提示打包单文件过大为1M
            chunkSizeWarningLimit: 1024,
            // 指定生成静态资源的存放路径。
            assetsDir: 'assets',
            // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
            assetsInlineLimit: 40960, // （40kb）
            rollupOptions: {
                output: {
                    manualChunks: {
                        // 分包
                        'PinYinPro': ['pinyin-pro'],
                        'ReactSelect': ['react-select'],
                        'Antd': ['antd'],
                        'ReactRouter': ['react-router', 'react-router-dom'],
                    },
                    // 资源分类
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    assetFileNames(assetInfo) {
                        if (assetInfo.name.endsWith('.css')) {
                            return 'assets/css/[name].[hash].css'
                        }
                        if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].some(ext => assetInfo.name.endsWith(ext))) {
                            return 'assets/img/[name].[hash].[ext]'
                        }
                        return 'assets/other/[name].[hash].[ext]'
                    }
                }
            }
        }
    })
})
