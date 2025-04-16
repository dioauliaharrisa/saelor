<script setup>
  // const error = null
  // const products = []
  const route = useRoute()
  const categoryId = route.params.id

  const products = useProducts()
  const data = products.data.value

  onMounted(() => {
    products.categoryId = categoryId
  })
</script>
<template>
  <div class="page">
    <BreadcrumbBreadcrumb />
    <div class="grid">
      <div v-for="n in data" :key="n.id" class="product">
        <NewCardProduct :product="n" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    max-width: calc(6 * 300px + 5 * 1rem); /* 6 items + 5 gaps */
    margin: 0 auto; /* center the grid */
  }

  .page {
    width: 100vw;
    padding: 0 8rem;
  }
</style>
