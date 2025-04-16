<script setup>
  import noImage from '/no-image.png'
  defineProps({
    product: Object
  })
  const router = useRouter()
  const quantity = ref(1)

  const { handleAddToCart } = useCart()
</script>

<template>
  <div v-if="!product.node">666</div>
  <div v-else class="container">
    <img
      v-if="product?.node.media?.[0]?.url"
      :src="product?.node.media?.[0]?.url"
      :alt="product?.title"
      @click="router.push(`/${product?.node.id}`)"
    />
    <img v-else :src="noImage" :alt="product?.title" />
    <div class="product-text">
      <h4 class="title" @click="router.push(`/${product?.node.id}`)">
        {{ product?.node?.name }}
      </h4>
      <RichTextRenderer
        v-if="product?.node?.description"
        :content="JSON.parse(product?.node?.description)"
        :font-size="'.75rem'"
      />
      <div class="bottom-part">
        <p class="price">
          ${{ product?.node?.pricing?.priceRange?.start?.gross?.amount }}
        </p>
        <div
          style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem"
        >
          <div class="input-wrapper">
            <InputNumber
              v-model="quantity"
              show-buttons
              button-layout="horizontal"
              :min="0"
              :max="99"
            >
              <template #incrementicon>
                <Icon
                  name="material-symbols:chevron-right-rounded"
                  style="color: black; font-size: 25px"
                />
              </template>
              <template #decrementicon>
                <Icon
                  name="material-symbols:chevron-right-rounded"
                  style="color: black; font-size: 25px"
                />
              </template>
            </InputNumber>
          </div>
          <button
            class="button-add-to-cart"
            @click="
              handleAddToCart({
                productVariantId: product.node.variants?.[0]?.id,
                quantity
              })
            "
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .input-wrapper :deep(.p-inputnumber) {
    width: 100%;
  }
  .input-wrapper :deep(.p-inputnumber-input) {
    width: 2rem;
    padding: 0.25rem;
    text-align: center;
  }
  .input-wrapper :deep(.p-inputnumber-button) {
    width: 2rem;
  }
  .price,
  .button-add-to-cart,
  .input-wrapper {
    flex: 1;
    min-width: 0;
  }
  .price {
    font-size: 1.25rem;
    font-weight: 700;
  }
  .button-add-to-cart,
  .input-wrapper {
    height: 2.5rem;
  }
  .input-wrapper {
    display: flex;
    justify-content: center;
  }
  .bottom-part {
    display: flex;
    align-items: flex-end;
    gap: 2rem;
    min-width: 0;
  }

  .CheckboxRoot {
    background-color: white;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px var(--black-a7);
  }
  .CheckboxRoot:hover {
    background-color: var(--grass-3);
  }
  .CheckboxRoot:focus {
    box-shadow: 0 0 0 2px black;
  }

  .CheckboxIndicator {
    color: var(--grass-11);
  }

  .button-add-to-cart {
    font-size: 15px;
    padding: 0 15px;
    line-height: 35px;
    height: 35px;
    cursor: pointer;
    border-radius: 4px;
    border: none;
    background-color: var(--primary-color);
    color: white;
    font-size: small;
    /* box-shadow: 0 2px 10px gray; */
  }
  .button-add-to-cart:hover {
    background-color: var(--primary-color);
  }
  .button-add-to-cart:focus {
    /* box-shadow: 0 0 0 2px black; */
  }
  .container {
    display: flex;
    flex-direction: column;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid #ddd;
    border-radius: 8px;

    height: 300px;
    max-width: 300px;

    padding: 1rem;
    cursor: pointer;
  }
  .container img {
    flex: 1;
    width: 100%;
    height: auto;
    max-height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }
  .product-text {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
