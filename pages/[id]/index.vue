<script setup>
import { GET_PRODUCT } from "../../gql/queries/GetProduct.ts";
import { CREATE_CHECKOUT } from "../../gql/mutations/CreateCheckout.ts";
import { ADD_ITEM_TO_CHECKOUT } from "../../gql/mutations/AddItemToCheckout.ts";
definePageMeta({
  layout: "default",
});
const { mutate: addItemToCheckout } = useMutation(ADD_ITEM_TO_CHECKOUT);
const { mutate } = useMutation(CREATE_CHECKOUT);

const route = useRoute();
const id = route.params.id;

const variables = {
  id,
  channel: "default-channel",
};
const { data } = await useAsyncQuery(GET_PRODUCT, variables);
const product = data?.value?.product || null;

const productVariantId = data?.value?.product?.variants[0]?.id || null;
const home = ref({ label: "Home", to: "/" });
const items = ref([{ label: "Shop", to: "/shop" }, { label: "Categories" }]);

const visible = ref(false);

const { showFieldErrors } = useShowNotification();

const cartStore = useCartStore();
const handleAddToCart = async () => {
  let checkoutId = cartStore.checkoutId;

  if (checkoutId) {
    try {
      const {
        data: {
          checkoutLinesAdd: {
            // checkout,
            errors,
          },
        },
      } = await addItemToCheckout({
        checkoutId,
        variantId: productVariantId,
      });

      if (errors.length) throw errors;
    } catch (error) {
      showFieldErrors(Array.isArray(error) ? error : [error]);
    }
  }

  if (!checkoutId) {
    try {
      const { data } = await mutate({
        input: {
          channel: "default-channel",
          lines: [
            {
              quantity: 1,
              variantId: productVariantId,
            },
          ],
          validationRules: {
            billingAddress: {
              checkRequiredFields: false,
              checkFieldsFormat: false,
            },
          },
        },
      });

      checkoutId = data?.checkoutCreate?.checkout?.id;

      if (checkoutId) cartStore.checkoutId = checkoutId;
    } catch (error) {
      showFieldErrors(Array.isArray(error) ? error : [error]);
    }
  }
};
</script>

<template>
  <div class="page">
    <Breadcrumb :home="home" :model="items" />
    <div class="container_product_display">
      <div class="container_product_image">
        <img :src="product?.images?.[0]?.url" :alt="product.title" />
      </div>
      <div class="container_product_name">
        <p class="title">{{ product?.name }}</p>
        <hr />
        <RichTextRenderer
          v-if="product?.description"
          :content="product.description"
          :font-size="'.75rem'"
        />
        <p id="product-warranty-information" @click="visible = true">
          Warranty Information
        </p>
        <Button id="button-add-to-cart" label="Add to cart" @click="handleAddToCart()" />
      </div>
    </div>
    <div class="container-product-informations">
      <div class="container-product-informations-title">
        <p class="title">Product Information</p>
        <hr />
      </div>
      <div class="container-product-informations-content">
        <div v-for="attribute in product?.attributes" :key="attribute.id">
          <p class="title">{{ attribute.attribute.name }}</p>
          <ul>
            <li v-for="value in attribute.values" :key="value.id">
              {{ value.name }} {{ attribute.attribute.unit?.toLowerCase() }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <DialogWarrantyInformation v-model:visible="visible" />
  </div>
</template>

<style scoped>
.container_product_name > button {
  background-color: gray;
  border: none;
}
.p-dialog-header {
  padding: 0;
  width: 100%;
}

#product-warranty-information {
  font-size: smaller;
  text-transform: uppercase;
  font-weight: 700;
  color: #0078d6;
}
#product-warranty-information:hover {
  cursor: pointer;
  color: navy;
  transition: color 0.3s ease;
}
.title {
  font-size: x-large;
  font-weight: 700;
  margin-bottom: 0;
}

.page {
  width: 80vw;
  margin: 0 auto;
  /* background-color: red; */
}
.container_product_display {
  display: flex;
  width: 100%;
}

.container_product_image {
  flex: 1;
}

.container_product_image img {
  width: 100%;
  height: 100%; /* Ensure it scales correctly */
  /* max-height: 300px; Adjust as needed */
  object-fit: cover;
}

.container_product_name {
  display: flex;
  flex: 1;
  /* background-color: pink; */
  flex-direction: column;
}
</style>
