<script setup>
const query = gql`
  query GetProduct($id: ID!, $channel: String!) {
    product(id: $id, channel: $channel) {
      id
      channel
      category {
        description
        level
        metadata {
          key
          value
        }
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
      name
      images {
        url(format: ORIGINAL, size: 600)
      }
    }
  }
`;

const variables = {
  id: "UHJvZHVjdDoxNTI=", // Replace with actual product ID
  channel: "default-channel", // Replace with the correct channel
};
const {
  data: {
    value: { product },
  },
} = await useAsyncQuery(query, variables);
console.log("🦆 ~ data:", product);
</script>

<template>
  <div class="page">
    <div class="container_product_display">
      <div class="container_product_image">
        <img :src="product?.images?.[0]?.url" :alt="product.title" />
      </div>
      <div class="container_product_name">
        <p class="title">{{ product?.name }}</p>
        <hr />
      </div>
    </div>
    <p class="price">${{ product.price }}</p>
    <p class="category">{{ product.description }}</p>
  </div>
</template>

<style scoped>
hr {
  background-color: yellow;
  width: 100%;
  border-radius: 5px;
}

.page {
  width: 80vw;
  margin: 0 auto;
  background-color: red;
}
.container_product_display {
  width: 100%;
  display: flex;
}

.container_product_image {
  flex: 1;
}

.container_product_name {
  background-color: pink;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
