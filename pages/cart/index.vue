<script setup>
  import imageNoItems from '/x.png'
  import { useCartStore } from '../../stores/cart.js'

  const { checkoutItems } = useCart()

  const cartStore = useCartStore()

  const data = computed(() => checkoutItems.value?.lines || [])
  const totalPrice = computed(() => checkoutItems.value?.totalPrice || null)

  // const router = useRouter()

  const isDialogOpen = ref(false)

  const handleCheckoutViaPurchaseOrder = async () => {
    // cartStore.resetCart()
    // return
    isDialogOpen.value = true
  }

  const haveYetReadToS = ref(false)
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
      <div v-if="data.length > 0" class="container_checkout_total_price">
        <p class="title">
          Total Price: {{ formatPrice(totalPrice?.gross.amount) }}
        </p>
        <div style="display: flex; gap: 0.5rem">
          <Checkbox v-model="haveYetReadToS" inputId="tos" binary />
          <label for="tos">
            I have read the
            <NuxtLink
              to="https://cdn.prod.website-files.com/5c663013b44ec5864964b279/62cb7b1d202ef9bb4892ea7f_JQP12-Terms%20of%20Trade.pdf"
            >
              Terms and Conditions
            </NuxtLink>
          </label>
        </div>
        <Button
          id="button-proceed-to-checkout"
          label="Proceed to checkout via Purchase Order"
          :disabled="!haveYetReadToS"
          @click="
            generatePurchaseOrderPdf({
              checkoutLines: data,
              unitPriceWithTax: unitPrice?.gross.amount,
              totalWithTax: totalPrice?.gross.amount,
              totalExcTax: totalPrice?.net.amount
            })
          "
        />
        <!-- @click="handleCheckoutViaPurchaseOrder()" -->

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
  .container_content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container_checkout_total_price {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    padding: 2rem;
    gap: 1rem;
  }
  .container_title {
    width: 100%;
    padding: 0 2rem;
  }

  .page {
    /* width: 100%; */
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
    flex-direction: column;
    align-self: flex-start;
    gap: 2rem;
    padding: 2rem;
  }
  .container_no_items_cart {
    display: flex;
    justify-content: center;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  /* Media Queries for smaller screens */
  @media (max-width: 425px) {
    .page {
      min-width: 320px; /* Set a minimum width for the page */
      width: 100%; /* Ensures it stretches up to 100% of the available space */
    }
    .container_content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .container_title {
      padding: 0 1rem;
    }

    .text_indicator_cart_items {
      flex-direction: row;
      gap: 0.5rem;
      padding: 1rem;
    }

    .container_checkout_total_price {
      align-items: center;
      padding: 1rem 0;
    }

    .container {
      gap: 1rem;
      width: 100%;
    }

    .title {
      font-size: 1.2rem; /* Adjust title font size for smaller screens */
    }

    .container_no_items_cart img {
      width: 80%; /* Make image smaller */
    }

    .container_checkout_total_price p {
      font-size: 0.9rem; /* Adjust price text for smaller screens */
    }

    Button {
      width: 100%; /* Make button full width */
    }
  }
</style>
