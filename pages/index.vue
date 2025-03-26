<script setup>
  import { ref, watchEffect } from 'vue'

  const selectedCategory = ref('')

  const { data: categories } = useFetch('/api/categories', {
    key: 'categories-list',
    default: () => []
  })

  // Fetch products reactively when category changes

  const selectCategory = (category) => {
    selectedCategory.value = category
    refresh()
  }

  watchEffect(() => {
    console.log('🦆 Categories updated:', categories.value)
  })

  const query = gql`
    query GetProducts {
      products(channel: "default-channel", first: 10) {
        edges {
          node {
            id
            name
            thumbnail {
              url
            }
          }
        }
      }
    }
  `
  const variables = { limit: 5 }
  const {
    data: {
      value: {
        products: { edges }
      }
    }
  } = await useAsyncQuery(query, variables)
  // console.log("🦆 ~ data:", edges[0].node);
</script>

<template>
  <div class="page">
    <div v-if="categories && categories.length" class="header">
      <div v-for="category in categories" :key="category">
        <div class="category_pill" @click="selectCategory(category)">
          <p>{{ category }}</p>
        </div>
      </div>
    </div>
    <div v-if="edges && edges.length" class="grid">
      <div v-for="product in edges" :key="product.id" class="product">
        <NuxtLink :to="`/${product?.node?.id}`">
          <img :src="product?.node?.thumbnail?.url" :alt="product.title" />
          <p class="price">${{ product.price }}</p>
          <p class="title">{{ product?.node?.name }}</p>
          <p class="category">{{ product.category }}</p>
        </NuxtLink>
      </div>
    </div>

    <p v-else class="error">No products available.</p>
  </div>
</template>

<style scoped>
  .page {
    width: 100vw;
  }

  .container {
    padding: 20px;
  }

  .header {
    display: flex;
    flex-direction: row;
  }

  .category_pill {
    cursor: pointer;
    background-color: aquamarine;
    padding: 0.01rem 1rem;
    margin: 0.4rem;
    border-radius: 99px;
  }

  .category_pill > p {
    font-size: smaller;
    text-transform: capitalize;
  }

  h1 {
    /* margin-bottom: 20px; */
  }

  .price {
    font-size: small;
    font-weight: 700;
  }

  .product > .title {
    font-size: small;
    font-weight: 700;
  }

  .product > .category {
    text-transform: capitalize;
    font-size: small;
    font-weight: 400;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr); /* 6 columns */
    gap: 16px;
  }

  /* Medium screens: 4 columns */
  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* Small screens: 2 columns */
  @media (max-width: 600px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .product {
    border: 1px solid #ddd;
    padding: 10px;
    /* text-align: center; */
    border-radius: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .product img {
    width: 100%;
    height: 100px; /* Adjust image height */
    object-fit: contain;
  }

  .error {
    color: red;
    text-align: center;
  }
</style>
