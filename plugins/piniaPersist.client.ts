import { defineNuxtPlugin } from '#app'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(piniaPluginPersistedState)
})
