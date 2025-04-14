// https://nuxt.com/docs/api/configuration/nuxt-config
import Material from '@primeuix/themes/material'
import { definePreset } from '@primeuix/themes'
const MyPreset = definePreset(Material, {
  semantic: {
    colorScheme: {
      primary: {
        50: '{sky.50}',
        100: '{sky.100}',
        200: '{sky.200}',
        300: '{sky.300}',
        400: '{sky.400}',
        500: '{sky.500}',
        600: '{sky.600}',
        700: '{sky.700}',
        800: '{sky.800}',
        900: '{sky.900}',
        950: '{sky.950}'
      },
      light: {
        formField: {
          hoverBorderColor: '{primary.color}'
        }
      },
      dark: {
        formField: {
          hoverBorderColor: '{primary.color}'
        }
      }
    }
  }
})

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
    'reka-ui/nuxt'
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
  }
})
