<script setup>
  import { GET_PRODUCT } from '../../gql/queries/GetProduct.ts'
  import { CREATE_CHECKOUT } from '../../gql/mutations/CreateCheckout.ts'
  import { ADD_ITEM_TO_CHECKOUT } from '../../gql/mutations/AddItemToCheckout.ts'
  definePageMeta({
    layout: 'default'
  })
  const { mutate: addItemToCheckout } = useMutation(ADD_ITEM_TO_CHECKOUT)
  const { mutate } = useMutation(CREATE_CHECKOUT)

  const route = useRoute()
  const id = route.params.id

  const variables = {
    id,
    channel: 'default-channel'
  }
  const { data } = await useAsyncQuery(GET_PRODUCT, variables)
  const product = data?.value?.product || null

  const productVariantId = data?.value?.product?.variants[0]?.id || null
  // const home = ref({ label: 'Home', to: '/' })
  // const items = ref([{ label: 'Shop', to: '/shop' }, { label: 'Categories' }])

  const visible = ref(false)

  const { showFieldErrors } = useShowNotification()

  const cartStore = useCartStore()
  const handleAddToCart = async () => {
    let checkoutId = cartStore.checkoutId

    if (checkoutId) {
      try {
        const {
          data: {
            checkoutLinesAdd: {
              // checkout,
              errors
            }
          }
        } = await addItemToCheckout({
          checkoutId,
          variantId: productVariantId
        })

        if (errors.length) throw errors
      } catch (error) {
        showFieldErrors(Array.isArray(error) ? error : [error])
      }
    }

    if (!checkoutId) {
      try {
        const { data } = await mutate({
          input: {
            channel: 'default-channel',
            lines: [
              {
                quantity: quantity.value,
                variantId: productVariantId
              }
            ],
            validationRules: {
              billingAddress: {
                checkRequiredFields: false,
                checkFieldsFormat: false
              }
            }
          }
        })

        checkoutId = data?.checkoutCreate?.checkout?.id

        if (checkoutId) cartStore.checkoutId = checkoutId
      } catch (error) {
        showFieldErrors(Array.isArray(error) ? error : [error])
      }
    }
  }
  const responsiveOptions = ref([
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ])

  const quantity = ref(0)
</script>

<template>
  <div class="page">
    <!-- <Breadcrumb :home="home" :model="items" /> -->
    <div class="container_product_display">
      <div class="container_product_image">
        <Galleria
          :value="product?.media"
          :responsive-options="responsiveOptions"
          :num-visible="5"
        >
          <template #item="slotProps">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 300px;
              "
            >
              <img
                :src="slotProps.item.url"
                :alt="slotProps.title"
                style="
                  width: 100%;
                  width: 300px;
                  height: auto;
                  object-fit: contain;
                "
              />
            </div>
          </template>
          <template #thumbnail="slotProps">
            <img
              :src="slotProps.item.url"
              :alt="slotProps.item.alt"
              style="
                width: 100%;
                width: 100px;
                height: 50px;
                object-fit: contain;
                border: solid 1px #ddd;
              "
            />
          </template>
        </Galleria>
      </div>
      <div class="container_product_name">
        <p class="title">{{ product?.name }}</p>
        <p>{{ product?.variants?.[0]?.sku }}</p>
        <div style="display: flex; gap: 1rem">
          <p>{{ product?.pricing?.priceRange?.start?.currency }}</p>
          <p>{{ product?.pricing?.priceRange?.start?.gross?.amount }}</p>
        </div>
        <p>Stocks: {{ product?.variants?.[0]?.quantityAvailable }}</p>
        <Divider />
        <RichTextRenderer
          v-if="product?.description"
          :content="product.description"
          :font-size="'.75rem'"
        />
        <p id="product-warranty-information" @click="visible = true">
          Warranty Information
        </p>
        <div id="container-ctas">
          <InputNumber
            v-model="quantity"
            show-buttons
            button-layout="horizontal"
            :min="0"
            :max="99"
            style="flex: 1; height: 3rem"
          >
            <template #incrementIcon>
              <span class="pi pi-plus" />
            </template>
            <template #decrementIcon>
              <span class="pi pi-minus" />
            </template>
          </InputNumber>
          <Button
            id="button-add-to-cart"
            label="Add to cart"
            @click="handleAddToCart()"
          />
        </div>
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
  #container-ctas {
    display: flex;
    padding: 1rem 0;
    gap: 1rem;
  }
  #button-add-to-cart {
    height: 3rem;
    flex: 1;
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
    padding: 2rem 0;
  }
  .container_product_display {
    display: flex;
    width: 100%;
  }

  .container_product_image {
    flex: 2;
    /* background-color: red; */
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
    padding: 2rem;
    flex-direction: column;
  }
</style>
