// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: { '@': './' },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/apollo',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  vite: {
    assetsInclude: ['**/*.svg']
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://store-7zyuop8t.saleor.cloud/graphql/'
      }
    }
  },
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  }
})
