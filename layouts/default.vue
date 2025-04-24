<script setup lang="ts">
  const route = useRoute()
  const excludedFromCardFilters = ['cart', 'account']
  const excludedFromTopBar = ['index']

  const products = useProducts()
  const productTypes = computed(() => products.productTypes)
  const filters = products.filters
  const hasActiveFilters = computed(
    () =>
      filters.categories.length ||
      filters.collections.length ||
      filters.productTypes.length ||
      filters.attributes.length
  )

  const breakpoints = useBreakpoints({
    mobile: 0, // optional
    tablet: 640,
    laptop: 1024,
    desktop: 1280
  })
  
  const shouldHideCardFilters = computed((): boolean => {
    const isBelowLaptop = breakpoints.smaller('laptop').value
    const hasBannedURL = excludedFromCardFilters.includes(route.name)

    console.log(
      '🦆 ~ shouldHideCardFilters ~ isBelowLaptop || hasBannedURL:',
      isBelowLaptop,
      hasBannedURL
    )
    return isBelowLaptop || hasBannedURL
  })
</script>

<template>
  <div class="container">
    <PanelHeader />
    <div>
      <h1 v-if="!excludedFromTopBar.includes(route.name)">
        {{ route.name }}
      </h1>

      <div
        v-if="hasActiveFilters"
        style="
          display: flex;
          padding: 2rem;
          align-items: center;
          width: 100%;
          gap: 1rem;
        "
      >
        <h2>Searching the products with:</h2>
        <div style="display: flex; gap: 1rem">
          <div v-if="filters?.categories.length">
            <Chip
              v-for="(filter, index) in filters.categories"
              :key="index"
              :label="filter.slug"
            />
          </div>
          <div v-if="filters?.collections.length">
            <Chip
              v-for="(filter, index) in filters.collections"
              :key="index"
              :label="filter.slug"
            />
          </div>
          <div v-if="filters?.productTypes.length">
            <Chip
              v-for="(filter, index) in filters.productTypes"
              :key="index"
              :label="` filtered by:
            ${
              productTypes.value.find((type) => type.node.id === filter)?.node
                .name
            }`"
            />
          </div>
          <div
            v-if="filters?.attributes.length"
            style="display: flex; gap: 1rem"
          >
            <div
              v-for="(attribute, i) in filters.attributes"
              :key="i"
              :label="attribute.values"
            >
              <Chip
                v-for="(value, ii) in attribute.values"
                :key="ii"
                :label="`filtered by: ${value}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box_content">
      <div style="display: flex; flex-direction: column; gap: 2rem">
        <!-- <Breadcrumb /> -->
        <div v-if="!shouldHideCardFilters">
          <CardFilters :loading="false" />
        </div>
      </div>
      <slot />
    </div>
    <PanelFooter />
    <ButtonFloating />
  </div>
</template>

<style scoped>
  .container {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;
    width: 100%;
    max-width: 100%; /* Prevents horizontal overflow */
    overflow-x: hidden; /* Hides any horizontal overflow */
    overflow-y: hidden; /* Hides any horizontal overflow */
  }
  .box_content {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    width: 100%;
    gap: 2rem;
    padding: 1rem;
    background-color: #f0f0f0;
  }
  @media (max-width: 1024px) {
    .grid_cards {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
