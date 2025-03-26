<script setup>
  import Breadcrumb from 'primevue/breadcrumb'
  import { ref, watchEffect } from 'vue'
  const query = gql`
    query GetCategories {
      categories(first: 10) {
        edges {
          node {
            id
            name
            description
            level
            backgroundImage {
              url
            }
            slug
          }
        }
      }
    }
  `

  const categories = ref([])

  const home = ref({ label: 'Home', to: '/' }) // Define home link
  const items = ref([{ label: 'Shop', to: '/shop' }, { label: 'Categories' }])

  const { data } = await useAsyncQuery(query)
  watchEffect(() => {
    if (data.value?.categories?.edges) {
      categories.value = data.value.categories.edges
      console.log('🦆 ~ dataxx:', categories.value)
    }
  })
</script>

<template>
  <div class="page">
    <Breadcrumb :home="home" :model="items" />
    <div class="container_title">
      <p class="title">Shop By Category</p>
      <hr />
    </div>
    <div class="container_content">
      <div class="accordion">
        <Accordion value="0">
          <AccordionPanel value="0">
            <AccordionHeader>Category</AccordionHeader>
            <AccordionContent>
              <div
                v-for="category in categories"
                :key="category.id"
                class="accordion_category"
              >
                <div class="accordion_title">
                  <div class="accordion-hover-indicator"></div>
                  <p>
                    {{ category?.node?.name }}
                  </p>
                  <Icon
                    name="material-symbols:chevron-right-rounded"
                    style="color: black; font-size: 25px"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
      <div class="categories">
        <div v-for="category in categories" :key="category.id" class="category">
          <NuxtLink
            :to="{
              path: `/categories/${category?.node?.name}`,
              query: {
                categoryId: `${category.node.id}`
              }
            }"
          >
            <img
              :src="category?.node?.backgroundImage?.url"
              :alt="category.title"
            />
            <div class="category_title">
              <p>{{ category?.node?.name }}</p>
              <Icon
                name="material-symbols:chevron-right-rounded"
                style="color: black; font-size: 35px"
              />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
    text-decoration-color: #314151;
  }
  .p-divider {
    margin: 0;
  }
  .accordion {
    flex: 0 0 20%;
  }
  .accordion_title {
    height: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem 0;
    cursor: pointer;
    border-top: 0.5px solid black;
  }
  .accordion_title:not(:last-child) {
    border-bottom: 0.5px solid black;
  }
  .accordion_category {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .accordion_category p {
    font-size: small;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    margin-right: 8px;
    white-space: nowrap;
    line-height: 2;
  }
  .accordion-hover-indicator {
    width: 3px;
    height: 100%;
    background-color: transparent;
    transition: background-color 0.3s ease;
  }
  .accordion_category:hover .accordion-hover-indicator {
    background-color: black; /* Change color when the parent is hovered */
  }

  .page {
    /* background-color: aqua; */
    width: 100vw;
    padding: 0 14rem;
    overflow-x: hidden;
  }
  .container_content {
    display: flex;
    max-width: 100%;
    overflow: hidden;
  }
  .category_title {
    display: flex;
    align-items: center;
    font-size: x-large;
    font-weight: 700;
    color: #314151;
    text-decoration: none !important;
  }
  .category_title p {
    text-transform: uppercase;
    font-size: medium;
  }
  .category img {
    height: 100px;
    width: 150px;
    object-fit: cover;
  }
  .category {
    border-right: 2px solid lightgray;
    padding-right: 2rem;
  }
  .categories {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .container_title {
    width: 100%;
  }
  .title {
    font-weight: 700;
    font-size: x-large;
    margin-bottom: 0;
  }
  hr {
    background-color: yellow;
    width: 100%;
    height: 0.2rem;
    border-radius: 5px;
    border: none;
  }
</style>
