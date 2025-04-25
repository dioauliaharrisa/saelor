<script setup lang="ts">
  // import imageNoProductsFound from '/no_products_available.png'
  const cartStore = useCartStore()

  const products = useProducts()
  const loading = products.loading
  const isFullyLoaded = useState<boolean>('isFullyLoaded', () => false)
  const categories = useCategories()
  const dataCategories = categories.data

  const recentlyViewedProducts = ref(null)

  const isDrawerVisible = ref(false)

  const data = computed(() => cartStore.products || [])
  console.log('🦆 ~ data:', data)

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
      immediate: false
    })
    const stored = JSON.parse(
      localStorage.getItem('recentlyViewedProducts') || '[]'
    )
    const { data } = await products.refetchRVP({ ids: stored })
    recentlyViewedProducts.value = data?.products?.edges || []
  })
</script>
// material-symbols:filter-alt-sharp
<template>
  <div>
    <DrawerFilters v-model:visible="isDrawerVisible" style="width: 100%" />
    <!-- <div class="mobile_filters">
      <CardFilters :loading="false" />
    </div> -->
    <Button
      v-if="isBelowDesktop"
      label="Filter"
      variant="outlined"
      @click="isDrawerVisible = !isDrawerVisible"
    ></Button>
    <div v-if="recentlyViewedProducts">
      <h2>Recently Viewed Products</h2>
      <div class="grid_cards_recently_viewed_products">
        <CardProduct
          v-for="product in recentlyViewedProducts"
          :key="product.id"
          :product="product"
          :loading="loading"
        />
      </div>
    </div>
    <h2>Browse equipment by industry application</h2>
    <div class="grid_cards_collection">
      <CardCategories
        v-for="category in dataCategories"
        :key="category.node.id"
        :category="category"
        :loading="loading"
      />
    </div>

    <div v-if="data.length" class="grid_cards">
      <CardProduct
        v-for="product in data"
        :key="product.id"
        :product="product"
        :loading="loading"
      />
    </div>
    <div v-else class="container_no_products_available">
      <img src="/no_products_available.png" :alt="'no products found'" />
    </div>
    <Button
      :disabled="isFullyLoaded"
      raised
      class="j-button"
      style="margin: 1rem auto; display: block"
      label="Load More"
      @click="products.fetchMore()"
    />
  </div>
</template>

<style scoped>
  h2 {
    padding: 1rem 0;
  }
  .grid_cards_collection {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .grid_cards_recently_viewed_products {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }
  .button_new {
    background-color: var(--primary-color);
    border: solid 1px var(--primary-color);
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    /* box-sizing: border-box; */
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    line-height: 1em;
    max-width: 100%;
    min-width: 140px;
    padding: 19px 24px;
    cursor: pointer;
    transition: 400ms;
  }
  .button_new:hover {
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border: solid 1px var(--primary-color);
  }
  .page-layout {
    display: grid;
    grid-template-columns: 1fr 3fr; /* 25% and 75% */
    gap: 2rem;
  }
  .accordion {
    grid-column: 1 / 2;
    grid-row: 1 / span 2; /* Takes 2 rows vertically */
  }
  .collection:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .container-search-box-title {
    background-color: maroon;
    text-wrap: nowrap;
    padding: 0.25rem;
    text-align: center;
  }
  .container-description {
    padding: 0.5rem;
  }
  .container-search-box {
    width: 18vw;
    margin-left: 2rem;
    border: solid 2px maroon;
  }
  .container-selects {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 0.5rem;
    padding: 0 1.25rem;
  }
  .container-selects > .p-select {
    width: 100%;
  }
  .container-selects > .p-button {
    width: 90%;
    text-wrap: nowrap;
    padding: 0.5rem;
    font-size: 0.75rem;
  }

  .header {
    display: flex;
    flex-direction: row;
  }
  h1 {
    color: white;
  }

  .grid_cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

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
  @media (max-width: 425px) {
    .grid_cards {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .mobile_filters {
    display: none;
  }
  @media (max-width: 768px) {
    .mobile_filters {
      display: block;
    }
  }
</style>
