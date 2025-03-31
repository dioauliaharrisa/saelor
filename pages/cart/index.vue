<script setup>
  import { useCartStore } from '../../stores/cart.js'
  const GET_CHECKOUT = gql`
    query GetCheckout($checkoutId: ID!) {
      checkout(id: $checkoutId) {
        id
        lines {
          id
          quantity
          variant {
            id
            name
            pricing {
              price {
                gross {
                  amount
                }
              }
            }
            media {
              url
            }
            product {
              description
              media {
                url
              }
            }
          }
        }
        totalPrice {
          gross {
            amount
          }
        }
      }
    }
  `

  const cartStore = useCartStore()

  const checkoutId = computed(() => cartStore.checkoutId)

  const { data } = useAsyncQuery(GET_CHECKOUT, {
    checkoutId: checkoutId.value
  })
  const totalPrice = data.value?.checkout?.totalPrice?.gross?.amount || 0
  const products = data.value?.checkout?.lines || []
  console.log('🦆 ~ products:', products[0])
</script>

<template>
  <div class="page">
    <div class="container_title">
      <p class="title">Cart</p>
      <hr />
    </div>
    <div class="container_content">
      <div class="text-indicator-cart-items">
        <p class="title">Items in cart</p>
        <p class="title">{{ products?.length }} items</p>
      </div>
      <div>
        <!-- <div v-for="product in products" :key="product.id">
          <img :src="product?.variant?.product?.media?.[0]?.url" />
        </div> -->
        <DataTable :value="products">
          <Column field="code" header="Quantity">
            <template #body="slotProps">
              {{
                slotProps.data.variant.pricing?.price?.gross?.amount.value ||
                '1'
              }}
            </template>
          </Column>
          <Column header="Image">
            <template #body="slotProps">
              <img
                :src="
                  slotProps.data.variant.media?.[0]?.url ||
                  slotProps.data.variant.product.media?.[0]?.url
                "
                alt="Product Image"
                style="width: 50px; height: 50px; object-fit: cover"
              />
            </template>
          </Column>
          <Column header="Product Description">
            <template #body="slotProps">
              <RichTextRenderer
                v-if="slotProps.data.variant.product.description"
                :content="slotProps.data.variant.product.description"
                :font-size="'.75rem'"
              />
            </template>
          </Column>
          <Column header="Total Price">
            <template #body="slotProps">
              ${{
                slotProps.data.variant.pricing?.price?.gross?.amount || '0.00'
              }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div id="container-checkout-total-price">
        <p class="title">Total Price: $ {{ totalPrice }}</p>
        <Button
          id="button-proceed-to-checkout"
          label="Proceed to checkout"
        ></Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #container-checkout-total-price {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 2rem 0;
  }
  .container_title {
    width: 100%;
  }
  hr {
    background-color: yellow;
    width: 100%;
    height: 0.2rem;
    border-radius: 5px;
    border: none;
  }
  .page {
    width: 100vw;
    padding: 0 8rem;
    overflow-x: hidden;
  }
  .title {
    font-weight: 700;
    font-size: x-large;
    margin-bottom: 0;
  }
  .text-indicator-cart-items {
    display: flex;
    gap: 1rem;
  }
</style>
