// https://nuxt.com/docs/api/configuration/nuxt-config
// import Nora from '@primeuix/themes/nora'
import Material from '@primeuix/themes/material'
import { definePreset } from '@primeuix/themes'

const MyPreset = definePreset(Material, {})

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: { '@': './' },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/Logo_Jayben.svg' }]
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/apollo',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'reka-ui/nuxt',
    'nuxt-meilisearch',
    '@vueuse/nuxt'
  ],
  meilisearch: {
    hostUrl: 'http://127.0.0.1:7700', // Replace with your Meilisearch host URL
    searchApiKey: process.env.MEILISEARCH_SEARCH_KEY,
    adminApiKey: process.env.MEILISEARCH_MASTER_KEY
  },
  vite: {
    assetsInclude: ['**/*.svg'],
    server: {
      allowedHosts: ['.ngrok-free.app', '.serveo.net']
    }
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
        preset: MyPreset
      }
    }
  },
  css: ['@/assets/css/main.css'],
  eslint: {
    config: {
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
          }
        }
      }
    }
  },
  runtimeConfig: {
    meiliAdminKey: process.env.MEILISEARCH_ADMIN_KEY
  }
})