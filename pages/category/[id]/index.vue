<script setup>
  // const error = null
  // const products = []
  const route = useRoute()
  const categoryId = route.params.id

  const products = useProducts()
  const data = products.data
  const loading = products.loading

  onMounted(async () => {
    await products.refetchProducts({
      first: 8,
      filter: { categories: [categoryId] }
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
        <CardProduct
          v-for="n in data"
          :key="n.id"
          :product="n"
          :loading="loading"
        />
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
