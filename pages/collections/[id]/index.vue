<script setup>
  const route = useRoute()
  const collectionId = route.params.id

  const products = useProducts()
  const dataProducts = products.data

  onMounted(() => {
    products.refetchProducts({
      first: 8,
      filter: { collections: [collectionId] }
    })
  })
</script>
<template>
  <div class="page">
    <BreadcrumbBreadcrumb />
    <div style="display: flex; gap: 1rem">
      <div>
        <AccordionsCategories />
        <AccordionsCollections />
      </div>
      <div class="grid_cards">
        <div
          v-for="product in dataProducts"
          :key="product.node?.id"
          class="product"
        >
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
