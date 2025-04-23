<script setup>
  import imageNoItems from '/x.png'
  import { useCartStore } from '../../stores/cart.js'

  const { checkoutItems } = useCart()

  const cartStore = useCartStore()

  const data = computed(() => checkoutItems.value?.lines || [])
  const totalPrice = computed(() => checkoutItems.value?.totalPrice || null)

  const router = useRouter()

  const isDialogOpen = ref(false)

  const handleCheckoutViaPurchaseOrder = async () => {
    cartStore.resetCart()
    return
  }
</script>

<template>
  <div class="page">
    <DialogCheckoutPurchaseOrder :visible="isDialogOpen" />
    <div class="container_title">
      <h1>Cart</h1>
      <Divider />
    </div>
    <div class="container_content">
      <div class="text_indicator_cart_items">
        <p class="title">Items in cart</p>
        <p class="title">{{ data?.length }} items</p>
      </div>
      <div v-if="data?.length === 0" class="container_no_items_cart">
        <img :src="imageNoItems" :alt="'No items'" />
      </div>
      <div class="container" v-else>
        <CardCartProduct
          v-for="(product, index) in data"
          :key="index"
          :product="product"
        />
      </div>
      <div class="container_checkout_total_price">
        <p class="title">
          Total Price: {{ formatPrice(totalPrice?.gross.amount) }}
        </p>
        <Button
          id="button-proceed-to-checkout"
          label="Proceed to checkout via Purchase Order"
          @click="handleCheckoutViaPurchaseOrder()"
        />
        <!-- <Button
          id="button-checkout"
          label="Checkout"
          @click="router.push('/checkout')"
        /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
  p {
    font-size: 0.75rem;
  }

  .p-card-content {
    background-color: red;
  }
  .container-content {
    display: flex;
    align-items: center;
  }
  .container_checkout_total_price {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 2rem 0;
    gap: 1rem;
  }
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
    width: 100%;
    min-width: 1200px;
    /* padding: 0 8rem; */
    /* overflow-x: hidden;  */
  }
  .title {
    font-weight: 700;
    font-size: x-large;
    margin-bottom: 0;
  }
  .text_indicator_cart_items {
    display: flex;
    gap: 2rem;
    padding: 2rem 0;
  }
  .container_no_items_cart {
    display: flex;
    justify-content: center;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
