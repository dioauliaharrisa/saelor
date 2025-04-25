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
</script>

<template>
  <InputGroup>
    <InputText
      v-model="search"
      placeholder="Search products"
      size="large"
      fluid
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
