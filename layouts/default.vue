<script setup lang="ts">
  const route = useRoute()
  // const excludedFromCardFilters = ['cart', 'account', 'login', 'inquiry']
  const excludedFromTopBar = ['index', 'cart', 'id', 'inquiry']

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
    mobile: 0,
    mobileLarge: 425,
    tablet: 768,
    laptop: 1024,
    desktop: 1440
  })

  const routeName = computed(() => route.name)

  // const shouldHideCardFilters = computed((): boolean => {
  //   const isBelowLaptop = breakpoints.smaller('desktop').value
  //   const hasBannedURL = excludedFromCardFilters.includes(route.name)

  //   return isBelowLaptop || hasBannedURL
  // })
  const { fetchCollection } = useCollections()
  const { fetchCategory } = useCategories()

  const collectionName = ref<string | null>(null)
  const categoryName = ref<string | null>(null)
  const collectionDescription = ref<string | null>(null)

  const isCollectionPage = computed(() => route.name?.startsWith('collection'))
  const isCategoryPage = computed(() => route.name?.startsWith('category'))

  watchEffect(async () => {
    if (isCollectionPage.value) {
      const collectionId = route.params.id
      if (collectionId) {
        try {
          const collection = await fetchCollection(collectionId)
          collectionName.value = collection?.data?.collection?.name || null // Set collection name
          collectionDescription.value =
            collection?.data?.collection?.description || null // Set collection description
        } catch (error) {
          console.error('Failed to fetch collection:', error)
          collectionName.value = null // Reset collection name on error
        }
      }
    } else {
      //reset
      collectionName.value = null
      collectionDescription.value = null
    }
    if (isCategoryPage.value) {
      const categoryId = route.params.id
      if (categoryId) {
        try {
          const category = await fetchCategory(categoryId)

          let tempCatName = ''
         
          category?.data?.category?.ancestors?.edges?.forEach(
            (eachAncestor) => {
              tempCatName += eachAncestor?.node?.name + ' > '
            }
          )
          tempCatName += category?.data?.category?.name

          categoryName.value = tempCatName || null
        } catch (error) {
          console.error('Failed to fetch collection:', error)
          categoryName.value = null
        }
      }
    }
  })

  const displayTopBar = computed(() => {
    if (routeName.value.startsWith('collection')) {
      return collectionName
    }
    if (routeName.value.startsWith('category')) {
      return categoryName
    }
    return route.name
  })
</script>

<template>
  <div class="container">
    <PanelHeader />
    <div
      v-if="!excludedFromTopBar.includes(route.name)"
      class="container-top-bar"
    >
      <h1>
        {{ displayTopBar }}
      </h1>
      <RichTextRenderer
        v-if="collectionDescription"
        :content="collectionDescription"
        :font-size="'.75rem'"
      />
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
      <!-- <div v-if="!shouldHideCardFilters">
        <CardFilters :loading="false" />
      </div> -->
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
    max-width: 100%;
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
  .container-top-bar {
    width: 100%;
    padding: 1rem 3rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 425px) {
    .container-top-bar {
      padding: 1rem 1.5rem;
    }
  }
</style>
