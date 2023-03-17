// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    'trpc-nuxt/module'
  ],
  typescript: {
    strict: true
  },
});
