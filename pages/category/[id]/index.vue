<script setup>
  // const error = null
  // const products = []
  const route = useRoute()
  const categoryId = route.params.id

  const products = useProducts()
  // const data = computed(() => products.data)
  // console.log('🦆 ~ data:', data)
  const cartStore = useCartStore()
  const data = computed(() => cartStore.products)
  console.log('🦆 ~ data:', data)
  const loading = products.loading
  const filters = products.filters

  onMounted(async () => {
    const x = await products.refetchProducts({
      first: 24,
      filter: {
        ...filters,
        categories: [categoryId]
      }
    })
  })

  watch(
    () => data,
    (newData) => {
      console.log('Data has been updated:', newData)
    },
    { immediate: true, deep: true }
  )
</script>
<template>
  <div class="page">
    <BreadcrumbBreadcrumb />
    <div style="display: flex; gap: 1rem">
      <div>
        <AccordionsCategories />
        <AccordionsCollections />
        <CardFilters :loading="loading" />
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
