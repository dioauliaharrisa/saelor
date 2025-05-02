<script setup>
  const route = useRoute()
  const categoryId = route.params.id

  const products = useProducts()
  // const data = computed(() => products.products?.value?.value || [])
  const store = useCartStore()
  const data = computed(() => store.products)

  const isFullyLoaded = useState('isFullyLoaded')

  const loading = products.loading
  const filters = products.filters

  onMounted(async () => {
    await products.refetchProducts({
      first: 8,
      filter: {
        ...filters,
        categories: [categoryId]
      }
    })
  })
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    "
  >
    <div class="grid_cards">
      <CardProduct
        v-for="n in data"
        :key="n.id"
        :product="n"
        :loading="loading"
      />
    </div>
    <Button
      class="j-button"
      :disabled="isFullyLoaded"
      raised
      @click="products.fetchMore()"
      label="Load More"
    />
  </div>
</template>

<style scoped>
  .page {
    width: 100vw;
    padding: 0 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .button_load_more {
    /* max-width: 200px; */
    margin: 2rem;
  }
</style>
