<script setup>
  import { useCartStore } from '../../stores/cart.js'
  const GET_CHECKOUT = gql`
    query GetCheckout($checkoutId: ID!) {
      checkout(id: $checkoutId) {
        id
        lines {
          id
          quantity
          variant {
            id
            name
            pricing {
              price {
                gross {
                  amount
                }
              }
            }
            media {
              url
            }
            product {
              description
            }
          }
        }
        totalPrice {
          gross {
            amount
          }
        }
      }
    }
  `

  const cartStore = useCartStore()
  console.log('🦆 ~ cartStore:', cartStore)

  const cartItems = ref([])
  const totalPrice = ref(0)
  const checkoutId = ref(null)
  checkoutId.value = localStorage?.getItem('checkoutId') || null

  // if (!checkoutId.value) return

  const { result } = useAsyncQuery(GET_CHECKOUT, {
    checkoutId: checkoutId.value
  })

  // Watch for data changes
  watch(
    result,
    (newData) => {
      console.log('🦆 Checkout data updated:', newData)
      if (newData?.checkout) {
        cartItems.value = newData.checkout.lines || []
        totalPrice.value = newData.checkout.totalPrice?.gross?.amount || 0
      }
    },
    { deep: true }
  )
  // onMounted(() => {})
</script>

<template>
  <div class="page">
    <div class="container_title">
      <p class="title">Cart</p>
      <hr />
    </div>
    <div class="container_content">
      <div class="text-indicator-cart-items">
        <p class="title">Items in cart</p>
        <p class="title">{{ cartItems?.length }} items</p>
      </div>
      <div>
        <div v-for="product in cartItems" :key="product.id">
          <img :src="product?.variant?.media?.[0]?.url" :alt="product.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container_title {
    width: 100%;
  }
  hr {
    background-color: yellow;
    width: 100%;
    height: 0.2rem;
    border-radius: 5px;
    border: none;
  }
  .page {
    width: 100vw;
    padding: 0 8rem;
    overflow-x: hidden;
  }
  .title {
    font-weight: 700;
    font-size: x-large;
    margin-bottom: 0;
  }
  .text-indicator-cart-items {
    display: flex;
    gap: 1rem;
  }
</style>
