<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
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
            description
            pricing {
              priceRange {
                start {
                  gross {
                    amount
                  }
                }
                stop {
                  gross {
                    amount
                  }
                }
              }
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

  function parseDescription(description) {
    try {
      return JSON.parse(description)
    } catch (error) {
      console.error('Failed to parse description:', error)
      return null
    }
  }
</script>

<template>
  <div class="page">
    <div class="container-search-box">
      <div class="container-search-box-title">
        <h1>Product Catalogue</h1>
      </div>
      <p class="container-description">
        Search our extensive range of Hofparts: improved engineered parts that
        are interchangeable with the OEM’s.
      </p>
      <div class="container-selects">
        <Select
          v-model="selectedCity"
          :options="cities"
          optionLabel="name"
          placeholder="OEM Application"
        />
        <Select
          v-model="selectedCity"
          :options="cities"
          optionLabel="name"
          placeholder="OEM Name"
        />
        <Select
          v-model="selectedCity"
          :options="cities"
          optionLabel="name"
          placeholder="OEM Model"
        />

        <Select
          v-model="selectedCity"
          :options="cities"
          optionLabel="name"
          placeholder="Location"
        />
        <Button
          label="Search Product Catalogue"
          style="background-color: maroon; border: none"
        />
      </div>
    </div>
    <div v-if="edges && edges.length" class="grid">
      <div
        v-for="product in edges"
        :key="product.id"
        class="product"
        @click="router.push({ path: `/${product?.node?.id}` })"
      >
        <img :src="product?.node?.thumbnail?.url" :alt="product.title" />
        <p class="price">
          ${{ product?.node.pricing.priceRange.start.gross.amount }}
        </p>
        <p class="title">{{ product?.node?.name }}</p>
        <RichTextRenderer
          v-if="product?.node?.description"
          :content="parseDescription(product.node.description)"
          :font-size="'.75rem'"
        />
      </div>
    </div>

    <p v-else class="error">No products available.</p>
  </div>
</template>

<style scoped>
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

  .price {
    font-size: small;
    font-weight: 700;
    text-decoration: none;
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
