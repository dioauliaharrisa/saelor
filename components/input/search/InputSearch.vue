<script setup lang="ts">
  const products = useProducts()
  const filters = products.filters
  const categoryId = products.categoryId

  const search = ref<string>('')

  const applySearch = async (): Promise<void> => {
    await products.refetchProducts({
      first: 8,
      immediate: false,
      filter: {
        ...toRaw(filters),
        categories: categoryId.value ? [categoryId.value] : []
      },
      search: search.value
    })
  }

  const breakpoints = useBreakpoints({
    mobile: 0,
    mobileLarge: 425,
    tablet: 768,
    laptop: 1024,
    desktop: 1440
  })
  const inputSize = computed(() =>
    breakpoints.smaller('mobileLarge') ? 'small' : 'large'
  )
</script>

<template>
  <InputGroup>
    <InputText
      v-model="search"
      placeholder="Search products"
      :size="inputSize"
      fluid
      @keydown.enter="applySearch"
    />
    <InputGroupAddon>
      <Button
        icon="pi pi-search"
        severity="secondary"
        variant="text"
        @click="applySearch"
      />
    </InputGroupAddon>
  </InputGroup>
</template>
