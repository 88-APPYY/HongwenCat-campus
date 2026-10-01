import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * 把根目录 logo/ 里的原始素材复制到构建产物中，
 * 这样站点只读取由 public/ 提供的资源，不会与素材目录耦合。
 */
function copyLogos() {
  return {
    name: 'hongwencat-copy-logos',
    apply: 'build',
    closeBundle() {
      const files = ['logo_hwm.png']
      const outDir = resolve(process.cwd(), 'dist', 'images')
      files.forEach((file) => {
        const from = resolve(process.cwd(), 'logo', file)
        if (!existsSync(from)) return
        mkdirSync(outDir, { recursive: true })
        copyFileSync(from, resolve(outDir, file))
      })
    }
  }
}

/**
 * base 使用相对路径 './'，这是 GitHub Pages 上最省心的选择：
 *
 *  - 项目站点  https://<user>.github.io/<repo>/
 *      资源会被解析到 /<repo>/assets/xxx.js  ✅
 *  - 用户站点  https://<user>.github.io/
 *      资源会被解析到 /assets/xxx.js         ✅
 *  - 自定义域名、以及改仓库名，都无需改配置  ✅
 *
 * ⚠️ 千万不要在这里用默认的 "/"：那会让资源指向域名的根目录，
 *    部署到 https://<user>.github.io/<repo>/ 时必然 404，
 *    页面会一直停在“加载中”（index.html 里的首屏占位）。
 *
 * 只有在需要 history 路由时才要设置绝对 base，见 .env.production。
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE_PATH || './',
    plugins: [vue(), copyLogos()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      chunkSizeWarningLimit: 800
    },
    server: {
      port: 5173,
      open: true
    }
  }
})
