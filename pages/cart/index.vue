<script setup>
  import imageNoItems from '/x.png'
  import { useCartStore } from '../../stores/cart.js'

  const { handleDeleteCheckoutItem, checkoutItems } = useCart()

  const cartStore = useCartStore()

  const data = computed(() => checkoutItems.value?.lines || [])
  const totalPrice = computed(() => checkoutItems.value?.totalPrice || null)

  const router = useRouter()

  const isDialogOpen = ref(false)

  // watch(
  //   data,
  //   (newData) => {
  //     if (newData?.checkout) {
  //       products.value = newData.checkout.lines || []
  //       totalPrice.value = newData.checkout.totalPrice?.gross?.amount || 0
  //     }
  //   },
  //   { immediate: true, deep: true }
  // )

  const handleCheckoutViaPurchaseOrder = async () => {
    cartStore.resetCart()
    return
  }
</script>

<template>
  <div class="page">
    <DialogCheckoutPurchaseOrder :visible="isDialogOpen" />
    <div class="container_title">
      <p class="title">Cart</p>
      <hr />
    </div>
    <div class="container_content">
      <div class="text-indicator-cart-items">
        <p class="title">Items in cart</p>
        <p class="title">{{ data?.length }} items</p>
      </div>
      <div v-if="data?.length === 0" class="container_no_items_cart">
        <img :src="imageNoItems" :alt="'No items'" />
      </div>
      <div class="container" v-else>
        <Card v-for="(product, index) in data" :key="index" class="cart-item">
          <template #content>
            <h6>Item is {{}}</h6>
            <Divider />
            <div class="card-content">
              <div class="part_1">
                <Icon
                  name="material-symbols:delete"
                  style="font-size: 35px"
                  @click="handleDeleteCheckoutItem([product.id])"
                />

                <img
                  :src="
                    product.variant.media?.[0]?.url ||
                    product.variant.product.media?.[0]?.url
                  "
                  alt="Product Image"
                  style="width: 50px; height: 50px; object-fit: cover"
                />
              </div>
              <div class="part-2">
                <p>
                  {{ product.variant.product.name }}
                </p>
                <RichTextRenderer
                  v-if="product?.variant.product?.description"
                  :content="product?.variant.product?.description"
                  :font-size="'.75rem'"
                />
              </div>
              <div class="part-3">
                <p>
                  {{ product.unitPrice?.currency }}
                </p>
                <p>
                  {{ product.unitPrice?.gross.amount }}
                </p>
                <p>Each</p>
              </div>
              <div class="part-4">
                <p style="font-weight: 700">
                  {{ product.totalPrice?.gross.amount }}
                  {{ product.totalPrice?.currency }}
                </p>
                <p>
                  {{ product.totalPrice?.gross.amount }}
                </p>
                <p>Total (exc. GST)</p>
                <p>Quantity ordered:{{ product.quantity }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div id="container-checkout-total-price">
        <p class="title">Total Price: $ {{ totalPrice?.gross.amount }}</p>
        <Button
          id="button-proceed-to-checkout"
          label="Proceed to checkout via Purchase Order"
          @click="handleCheckoutViaPurchaseOrder()"
        />
        <Button
          id="button-checkout"
          label="Checkout"
          @click="router.push('/checkout')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  p {
    font-size: 0.75rem;
  }
  .cart-item {
    border: 1px solid var(--primary-color);
    max-height: 400px;
  }
  .card-content {
    display: flex;
  }
  .part_1 {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .part-2 {
    flex: 6;
    /* background-color: #d0d0d0; */
  }

  .part-3 {
    flex: 3;
    /* background-color: #b0b0b0; */
  }
  .part-4 {
    flex: 1;
    /* background-color: gray; */
  }
  .p-card-content {
    background-color: red;
  }
  .container-content {
    display: flex;
    align-items: center;
  }
  #container-checkout-total-price {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 2rem 0;
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
  .container_no_items_cart {
    display: flex;
    justify-content: center;
  }
</style>
