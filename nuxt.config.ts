import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@primevue/nuxt-module', '@nuxt/fonts'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  css: ['@/assets/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  // @ts-ignore
  primevue: {
    importTheme: { from: '@/themes/theme.js' },
  },
})
