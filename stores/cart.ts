// export const useCartStore = defineStore('cart', {
//   state: () => ({
//     items: [] as Array<{
//       id: string | number
//       name: string
//       price: number
//       quantity: number
//       // Add other product properties you need (must be serializable)
//     }>
//   }),
//   getters: {
//     totalItems: (state) =>
//       state.items.reduce((sum, item) => sum + item.quantity, 0),
//     totalPrice: (state) =>
//       state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
//   },
//   actions: {
//     addItem(item: { id: string | number; name: string; price: number }) {
//       const existing = this.items.find((i) => i.id === item.id)
//       if (existing) {
//         existing.quantity++
//       } else {
//         this.items.push({ ...item, quantity: 1 })
//       }
//     },
//     removeItem(id: string | number) {
//       this.items = this.items.filter((item) => item.id !== id)
//     },
//     updateQuantity(id: string | number, newQuantity: number) {
//       const item = this.items.find((i) => i.id === id)
//       if (item) {
//         item.quantity = Math.max(1, newQuantity)
//       }
//     },
//     clearCart() {
//       this.items = []
//     }
//   },
//   persist: {
//     serializer: {
//       serialize: JSON.stringify,
//       deserialize: JSON.parse
//     },
//     storage: persistedState.localStorage // or sessionStorage
//   }
// })
