//@ts-ignore
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    resolve: {
      alias: {
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
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
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
