<script setup>
  const route = useRoute()
  const collectionId = route.params.id

  const products = useProducts()
  const data = products.data

  onMounted(() => {
    products.categoryId = ''
    products.collectionId = collectionId
  })

  console.log('🦆 ~ products:', products)
</script>
<template>
  <div class="page">
    <BreadcrumbBreadcrumb />
    <div class="grid">
      <div v-for="n in data" :key="n.node.id" class="product">
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
    max-width: calc(6 * 300px + 5 * 1rem);
    margin: 0 auto;
  }

  .page {
    width: 100vw;
    padding: 0 8rem;
  }
</style>
