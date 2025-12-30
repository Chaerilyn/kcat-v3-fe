// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@primevue/nuxt-module', '@nuxt/fonts'],
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