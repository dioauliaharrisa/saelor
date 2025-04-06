// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: { '@': './' },
  css: ['@/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/apollo',
    // '@nuxtjs/ngrok',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  vite: {
    assetsInclude: ['**/*.svg'],
    server: {
      allowedHosts: ['.ngrok-free.app', '.serveo.net']
    }
  },
  runtimeConfig: {
    public: {
      ngrokUrl: process.env.NGROK_URL
    }
  },
  // ngrok: {
  //   authtoken: process.env.NGROK_AUTHTOKEN,
  //   port: 3000
  // },
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
  },
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
  }
})
