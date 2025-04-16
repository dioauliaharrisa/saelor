<script setup lang="ts">
  import { useProducts } from '../composables/useProducts'

  const products = useProducts()
  const categories = useCategories()
  const dataCategories = categories.data
  const data = products.data
</script>

<template>
  <div class="page">
    <div class="page-layout">
      <div>
        <AccordionsCategories />
        <AccordionsCollections />
      </div>
      <div>
        <h2>Browse equipment by industry application</h2>
        <div class="grid_cards_collection">
          <CardCategories
            v-for="category in dataCategories"
            :key="category.node.id"
            :category="category"
          />
        </div>
        <div v-if="data.length">
          <div class="grid">
            <CardProduct
              v-for="product in data"
              :key="product.id"
              :product="product"
            />
          </div>
          <button class="button_new" @click="products.fetchMore()">
            LOAD MORE
          </button>
        </div>
      </div>

      <div v-if="!data.length" class="grid">
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
  h2 {
    padding: 1rem 0;
  }
  .grid_cards_collection {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .button_new {
    background-color: var(--primary-color);
    border: solid 1px var(--primary-color);
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
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
