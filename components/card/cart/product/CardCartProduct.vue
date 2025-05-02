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
      <!-- <pre>{{ product.totalPrice }}</pre> -->
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
            class="product_image"
          />
        </div>
        <div class="part-2">
          <p style="font-weight: 700">
            <!-- {{ product.variant.name }} -->
            {{ product.variant.product.name }}
          </p>
          <RichTextRenderer
            v-if="product?.variant.product?.description"
            :content="product?.variant.product?.description"
            :font-size="'.75rem'"
          />
        </div>

        <div class="container-unit">
          <h3>Unit</h3>
          <Divider />
          <div class="container-sub-units">
            <div style="display: flex; flex-direction: column; gap: 1rem">
              <div class="cont-exc-gst">
                <p style="font-weight: 700">
                  {{ formatPrice(product.unitPrice?.net.amount) }}
                </p>
                <p>Each (exc. GST)</p>
              </div>
              <p>Quantity ordered:{{ product.quantity }}</p>
            </div>
            <Divider layout="vertical" />
            <div class="cont-with-gst">
              <p style="font-weight: 700">
                {{ formatPrice(product.unitPrice?.gross.amount) }}
              </p>
              <p>Each</p>
            </div>
          </div>
        </div>
        <div class="container-total">
          <h3>Total</h3>
          <Divider />
          <div class="container-sub-units">
            <div>
              <p style="font-weight: 700">
                {{ formatPrice(product.totalPrice?.net.amount) }}
              </p>
              <p style="padding-bottom: 1rem; font-weight: 700">
                Total (exc. GST)
              </p>
            </div>
            <Divider layout="vertical" />
            <div>
              <p style="font-weight: 700">
                {{ formatPrice(product.totalPrice?.gross.amount) }}
              </p>
              <p style="font-weight: 700">Total</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
  .cart-item {
    /* max-height: 200px; */
    width: 100%;
  }
  .card-content {
    display: flex;
    gap: 1rem;
  }
  .part_1 {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
  }

  .part-2 {
    flex: 4;
    padding: 0 1rem;
  }

  .container-unit {
    flex: 3;
    display: flex;
    flex-direction: column;
  }
  .container-sub-units {
    display: flex;
    justify-content: space-between;
  }
  .container-total {
    flex: 3;
  }
  .product_image {
    width: 75px;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
  @media (max-width: 425px) {
    .card-content {
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-template:
        'left right-top'
        'left right-middle'
        'left right-bottom';
    }
    .part_1 {
      display: grid;
      grid-area: left;
      padding: 0;
      grid-template-rows: 1fr 4fr;
    }
    .part_1 > span {
      justify-self: start;
      align-self: start;
    }
    .part-2 {
      display: grid;
      grid-area: right-top;
      padding: 0;
    }
    .container-unit {
      grid-area: right-middle;
      display: flex;
    }
    .container-total {
      display: grid;
      grid-area: right-bottom;
    }
    /* dio: hiding the description if mobile */
    .rich-text {
      display: none;
    }
  }
</style>
