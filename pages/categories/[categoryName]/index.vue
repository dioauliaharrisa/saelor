<script setup>
  const route = useRoute()
  const categoryId =
    ref(decodeURIComponent(route.query.categoryId))?.value || ''
  const categoryName = route.params.categoryName
  const { data } = await useAsyncQuery(
    gql`
      query GetProductsByCategory($categoryId: ID!) {
        products(
          channel: "default-channel"
          first: 16
          filter: { categories: [$categoryId] }
        ) {
          edges {
            node {
              id
              name
              pricing {
                priceRangeUndiscounted {
                  start {
                    net {
                      amount
                    }
                  }
                }
              }
              media {
                url(format: ORIGINAL)
              }
              description
            }
          }
        }
      }
    `,
    { categoryId: categoryId }
  )
  const products = data.value?.products?.edges || []
  console.log('🦆 ~ products:', products)
</script>

<template>
  <div class="page">
    <Breadcrumb />
    <div class="category_title">
      <p>{{ categoryName }}</p>
      <hr />
    </div>
    <div class="container-content">
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
      <div class="container-products">
        <p>Showing {{ products.length }} of {{ products.length }}</p>
        <div class="products-grid">
          <div v-for="product in products" :key="product.id" class="product">
            <NuxtLink :to="`/${product?.node?.id}`">
              <img :src="product?.node?.media?.[0]?.url" :alt="product.title" />
              <div class="product_title">
                <p>{{ product?.node?.name }}</p>
                <p class="product-description">
                  ${{ product?.node?.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .product-description {
    font-size: 0.5rem;
  }
  .product_title {
    color: black;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
    text-decoration-color: #314151;
  }
  .container-products {
    display: flex;
    flex-direction: column;
  }
  .container-content {
    display: flex;
  }
  .page {
    width: 100vw;
  }
  hr {
    background-color: yellow;
    width: 100%;
    height: 0.2rem;
    border-radius: 5px;
    border: none;
  }
  .products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 6 columns */
    gap: 16px;
  }
  .product {
    border: 1px solid #ddd;
    padding: 10px;
    /* text-align: center; */
    border-radius: 8px;
  }
  .product:hover {
    border: 1px solid black;
  }
  .product img {
    width: 100%;
    height: 100px; /* Adjust image height */
    object-fit: contain;
  }
  .category_title p {
    text-transform: uppercase;
    font-size: larger;
    font-weight: 700;
  }
</style>
