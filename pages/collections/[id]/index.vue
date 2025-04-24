<script setup>
  import imageNoProductsFound from '/no_products_available.png'
  const route = useRoute()
  const collectionId = route.params.id

  const products = useProducts()
  const cartStore = useCartStore()
  const data = computed(() => cartStore.products)

  onMounted(async () => {
    await products.refetchProducts({
      first: 8,
      filter: { collections: [collectionId] }
    })
  })
</script>
<template>
  <div style="display: flex; align-items: center">
    <div v-if="!data.length" class="container_no_products_available">
      <img :src="imageNoProductsFound" :alt="'no products found'" />
    </div>
    <div class="grid_cards">
      <div v-for="product in data" :key="product.node?.id" class="product">
        <CardProduct :product="product" />
      </div>
    </div>
  </div>
</template>
