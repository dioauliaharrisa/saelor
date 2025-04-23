<script setup>
  // import noImage from '/x.png'

  defineProps({
    product: Object
  })

  const { handleDeleteCheckoutItem } = useCart()
</script>

<template>
  <Card class="cart-item">
    <template #content>
      <!-- <h6>Item is {{}}</h6>
            <Divider /> -->
      <div class="card-content">
        <div class="part_1">
          <Icon
            name="material-symbols:delete"
            style="font-size: 35px; cursor: pointer"
            @click="handleDeleteCheckoutItem([product.id])"
          />

          <img
            :src="
              product.variant.media?.[0]?.url ||
              product.variant.product.media?.[0]?.url
            "
            alt="Product Image"
            class="product-image"
          />
        </div>
        <div class="part-2">
          <p style="font-weight: 700">
            {{ product.variant.name }}
            {{ product.variant.product.name }}
          </p>
          <RichTextRenderer
            v-if="product?.variant.product?.description"
            :content="product?.variant.product?.description"
            :font-size="'.75rem'"
          />
        </div>
        <div class="part-3">
          <p style="font-weight: 700">
            {{ formatPrice(product.unitPrice?.gross.amount) }}
          </p>
          <p>Each</p>
        </div>
        <div class="part-4">
          <p style="font-weight: 700">
            {{ formatPrice(product.totalPrice?.gross.amount) }}
          </p>
          <p style="padding-bottom: 1rem">Total (exc. GST)</p>
          <p>Quantity ordered:{{ product.quantity }}</p>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
  .cart-item {
    max-height: 400px;
  }
  .card-content {
    display: flex;
  }
  .part_1 {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
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
  .product-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }
</style>
