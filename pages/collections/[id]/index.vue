<script setup>
  const route = useRoute()
  const collectionId = route.params.id

  const products = useProducts()
  const cartStore = useCartStore()
  const data = computed(() => cartStore.products)
  console.log('🦆 ~ dataProducts:', data)

  onMounted(() => {
    products.refetchProducts({
      first: 8,
      filter: { collections: [collectionId] }
    })
  })
</script>
<template>
  <div>
    <!-- <BreadcrumbBreadcrumb /> -->
    <div style="display: flex; gap: 1rem">
      <div class="grid_cards">
        <div v-for="product in data" :key="product.node?.id" class="product">
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .page {
    width: 100vw;
    padding: 0 8rem;
  }
</style>
