<script setup>
  const route = useRoute()
  console.log('🦆 ~ route:', route)
  const excludedFromCardFilters = ['cart', 'account']
  const excludedFromTopBar = ['index']

  const products = useProducts()
  const filters = products.filters
</script>

<template>
  <div class="container">
    <PanelHeader />
    <div>
      <pre>{{ filters }}</pre>
      <h1 v-if="!excludedFromTopBar.includes(route.name)">
        {{ route.name }}
      </h1>
    </div>
    <div class="box_content">
      <div style="display: flex; flex-direction: column; gap: 2rem">
        <!-- <Breadcrumb /> -->
        <div v-if="!excludedFromCardFilters.includes(route.name)">
          <CardFilters :loading="loading" />
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
    width: 100vw;
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
</style>
