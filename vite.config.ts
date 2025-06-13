/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vue({
    //   template: {
    //     compilerOptions: {
    //       // 'ion-'으로 시작하는 태그들을 커스텀 엘리먼트로 인식하도록 설정
    //     //   isCustomElement: (tag) => {
    //     //     console.log(tag);
    //     //     return tag.startsWith('ion-');
    //     //   }
    //       isCustomElement: (tag) => tag.startsWith('ion-')
    //     }
    //   }
    // }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  server: {
    host: '0.0.0.0',
    port: 8100
  }
})
