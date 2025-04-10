<script setup>
  import { useProducts } from '../composables/useProducts'
  import { useRouter } from 'vue-router'
  const products = useProducts()

  const router = useRouter()
</script>

<template>
  <div class="page">
    <div class="page-layout">
      <AccordionsCategories />
      <div v-if="!error && products.length" class="grid">
        <CardProduct
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
      <div v-if="!error && !products.length" class="grid">
        <Card v-for="n in 16" :key="n" class="product">
          <template #content>
            <Skeleton width="138px" height="100px"></Skeleton>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .page-layout {
    display: grid;
    grid-template-columns: 1fr 3fr; /* 25% and 75% */
    gap: 2rem;
  }
  .accordion {
    grid-column: 1 / 2;
    grid-row: 1 / span 2; /* Takes 2 rows vertically */
  }
  .grid {
    display: grid;
    grid-column: 2 / 3; /* Starts at column 2 */
    grid-template-columns: repeat(4, 1fr); /* 6 columns */
    gap: 16px;
    padding: 1rem 0;
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
  .page {
    width: 100vw;
    padding: 0 8rem;
  }
  .container {
    padding: 20px;
  }
  .header {
    display: flex;
    flex-direction: row;
  }
  h1 {
    color: white;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (max-width: 600px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<!-- <Card>
      <template #title>Placeholder</template>
      <template v-if="collections.length" #content>
        <p
          v-for="collection in collections"
          :key="collection.id"
          class="collection"
        >
          {{ collection?.node?.name }}
        </p>
        <Divider />
        <p v-for="category in categories" :key="category.id" class="collection">
          {{ category?.node?.name }}
        </p>
      </template>
    </Card> -->
<!-- <div class="container-search-box">
      <div class="container-search-box-title">
        <h1>Product Catalogue</h1>
      </div>
      <p class="container-description">
        Search our extensive range of Hofparts: improved engineered parts that
        are interchangeable with the OEM’s.
      </p>
      <div class="container-selects">
        <Select option-label="name" placeholder="OEM Application" />
        <Select option-label="name" placeholder="OEM Name" />
        <Select option-label="name" placeholder="OEM Model" />
        <Select option-label="name" placeholder="Location" />
        <Button
          label="Search Product Catalogue"
          style="background-color: maroon; border: none"
        />
      </div>
    </div> -->
