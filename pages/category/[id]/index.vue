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
  <div>
    <div style="align-self: flex-start">
      <BreadcrumbBreadcrumb />
    </div>
    <div style="display: flex; gap: 1rem">
      <!-- <div>
        <AccordionsCategories />
        <AccordionsCollections />
        <CardFilters :loading="loading" />
      </div> -->
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
          :disabled="isFullyLoaded"
          raised
          label="Load More"
          @click="products.fetchMore()"
          class="button_load_more"
        />
      </div>
    </div>
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
