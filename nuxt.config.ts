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
    // '@pinia/nuxt'
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_SAELOR || ''
      }
    }
  },
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  // pinia: {
  //   autoImports: ['defineStore', 'acceptHMRUpdate']
  // },
  // imports: {
  //   dirs: ['stores']
  // }
})
