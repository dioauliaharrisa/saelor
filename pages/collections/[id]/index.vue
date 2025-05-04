<script setup>
  import imageNoProductsFound from '/no_products_available.png'
  const route = useRoute()
  const collectionId = route.params.id

  const products = useProducts()
  const cartStore = useCartStore()
  const data = computed(() => cartStore.products)

  const isDrawerVisible = ref(false)

  const breakpoints = useBreakpoints({
    mobile: 0,
    mobileLarge: 425,
    tablet: 768,
    laptop: 1024,
    desktop: 1440
  })
  const isBelowDesktop = breakpoints.smaller('desktop')
  onMounted(async () => {
    await products.refetchProducts({
      first: 8,
      filter: { collections: [collectionId] }
    })
  })
</script>

<template>
  <div style="display: flex; align-items: center">
    <DrawerFilters v-model:visible="isDrawerVisible" style="width: 100%" />
    <div v-if="!data.length" class="container_no_products_available">
      <img :src="imageNoProductsFound" :alt="'no products found'" />
    </div>

    <div style="display: flex; flex-direction: column; gap: 1rem">
      <div class="grid_cards">
        <div v-for="product in data" :key="product.node?.id" class="product">
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @media (max-width: 1024px) {
    .grid_cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 768px) {
    .grid_cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
