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
        <!-- <Button label="Verify" /> -->
      </div>
    </div>
    <p class="price">${{ product.price }}</p>
    <p class="category">{{ product.description }}</p>
  </div>
</template>

<style scoped>
.title {
  font-size: x-large;
  font-weight: 700;
  margin-bottom: 0;
}

hr {
  background-color: yellow;
  width: 100%;
  height: 0.2rem;
  border-radius: 5px;
  border: none;
}

.page {
  width: 80vw;
  margin: 0 auto;
  background-color: red;
}
.container_product_display {
  display: flex;
  width: 100%;
}

.container_product_image {
  flex: 1;
}

.container_product_image img {
  width: 100%; /* Make it fill the container */
  height: 100%; /* Ensure it scales correctly */
  /* max-height: 300px; Adjust as needed */
  object-fit: cover; /* Prevents distortion */
}

.container_product_name {
  display: flex;
  flex: 1;
  background-color: pink;
  flex-direction: column;
}
</style>
