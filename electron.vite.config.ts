import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@/api': resolve('src/main/api'),
        '@/services': resolve('src/main/services'),
        '@shared': resolve('src/shared')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    resolve: {
      alias: {
        '@shared': resolve('src/shared')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@/styles': resolve('src/renderer/src/styles'),
        '@/components': resolve('src/renderer/src/components')
      }
    },
    plugins: [viteReact(), TanStackRouterVite()]
  }
})
