// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],

  // If you want to disable TypeScript (optional)
  typescript: {
    shim: false
  },

  compatibilityDate: '2025-03-24',

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})