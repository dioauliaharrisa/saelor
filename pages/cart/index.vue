<script setup>
import { useCartStore } from "../../stores/cart.js";
import { GET_CHECKOUT } from "../../gql/queries/GetCheckout";

const cartStore = useCartStore();

const router = useRouter();

const checkoutId = computed(() => cartStore.checkoutId);
const { data, error } = useAsyncQuery(GET_CHECKOUT, {
  checkoutId,
});

const products = ref([]);
const totalPrice = ref(0);
const isDialogOpen = ref(false);
const email = ref("daharrisa@gmail.com");

watch(
  data,
  (newData) => {
    console.log("🦆 ~ newData:", newData);
    if (newData?.checkout) {
      products.value = newData.checkout.lines || [];
      totalPrice.value = newData.checkout.totalPrice?.gross?.amount || 0;
    }
  },
  { immediate: true, deep: true }
);

const handleCheckoutViaPurchaseOrder = async () => {
  generatePurchaseOrderPdf();
  return;

  // if (!checkoutId.value) {
  //   console.error('No checkout ID found')
  //   return
  // }

  // try {
  //   isDialogOpen.value = true
  // } catch (error) {
  //   console.error('Error during checkout:', error)
  // }
};
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
        <p class="title">{{ products?.length }} items</p>
      </div>
      <div>
        <DataTable :value="products">
          <Column field="code" header="Quantity">
            <template #body="slotProps">
              <Icon
                name="material-symbols:android-emergency-location-service"
                style="color: black; font-size: 15px; cursor: pointer"
              />
              {{ slotProps.data.variant.pricing?.price?.gross?.amount.value || "1" }}
            </template>
          </Column>
          <Column header="Image">
            <template #body="slotProps">
              <img
                :src="
                  slotProps.data.variant.media?.[0]?.url ||
                  slotProps.data.variant.product.media?.[0]?.url
                "
                alt="Product Image"
                style="width: 50px; height: 50px; object-fit: cover"
              />
            </template>
          </Column>
          <Column header="Product Description">
            <template #body="slotProps">
              <RichTextRenderer
                v-if="slotProps.data.variant.product.description"
                :content="slotProps.data.variant.product.description"
                :font-size="'.75rem'"
              />
            </template>
          </Column>
          <Column header="Total Price">
            <template #body="slotProps">
              ${{ slotProps.data.variant.pricing?.price?.gross?.amount || "0.00" }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div id="container-checkout-total-price">
        <p class="title">Total Price: $ {{ totalPrice }}</p>
        <Button
          id="button-proceed-to-checkout"
          label="Proceed to checkout via Purchase Order"
          @click="handleCheckoutViaPurchaseOrder()"
        />
        <Button id="button-checkout" label="Checkout" @click="router.push('/checkout')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
