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

// GitHub Pages 部署说明：
//  - 用户站点      https://<user>.github.io/            → base 保持 "/"
//  - 项目站点      https://<user>.github.io/<repo>/     → 默认 hash 路由下 base "/" 也可正常工作
//  - 自定义域名    在 .env.production 里设置 VITE_BASE_PATH=/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE_PATH || '/',
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
