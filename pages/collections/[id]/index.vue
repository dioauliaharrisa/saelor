<script setup>
  const route = useRoute()
  const collectionId = route.params.id

  const products = useProducts()
  const data = computed(
    () => products?.dataByCollectionIds?.value?.products?.edges || []
  )

  onMounted(() => {
    products.collectionId.value = collectionId
    // products.refetch({ first: 20, collections: collectionId })
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
      <div class="grid">
        <div v-for="n in data" :key="n.node?.id" class="product">
          <CardProduct :product="n" />
        </div>
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
