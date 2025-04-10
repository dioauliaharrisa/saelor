<script setup>
  import noImage from '/no-image.png'
  defineProps({
    product: Object
  })
</script>

<template>
  <div class="product" @click="$router.push({ path: `/${product?.node?.id}` })">
    <img
      v-if="product.node.media[0]?.url"
      :src="product.node.media[0]?.url"
      :alt="product?.title"
    />
    <img v-else :src="noImage" :alt="product?.title" />
    <div class="product-text">
      <p class="price">
        ${{ product?.node.pricing.priceRange.start.gross.amount }}
      </p>
      <p class="title">{{ product?.node?.name }}</p>
      <RichTextRenderer
        v-if="product?.node?.description"
        :content="JSON.parse(product.node.description)"
        :font-size="'.75rem'"
      />
    </div>
  </div>
</template>

<style scoped>
  .product-text {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .product {
    border: 1px solid #ddd;
    padding: 10px;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%;

    height: 300px;
    max-width: 300px;

    display: flex;
    flex-direction: column;
  }
  .product img {
    flex: 1;
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: cover;
  }
  .product-text > .price {
    font-size: small;
    font-weight: 700;
    text-decoration: none;
  }
  .product-text > .title {
    font-size: small;
    font-weight: 700;
    /* white-space: nowrap; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
  }
  .product-text > .category {
    text-transform: capitalize;
    font-size: small;
    font-weight: 400;
  }
  .p-card {
    padding: 0;
    margin: 0;
  }

  :deep(.p-card-body) {
    padding: 0 !important;
    gap: 0 !important;
  }
</style>
