import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    checkoutId: null,
    cartItems: [],
    totalPrice: 0,
    user: null,
    breadcrumb: ''
  }),
  actions: {
    resetUser() {
      this.user = null
    },
    resetCart() {
      this.cartItems = []
      this.totalPrice = 0
      this.checkoutId = null
    },
    resetBreadcrumb() {
      this.breadcrumb = ''
    }
  },
  persist: true
})
