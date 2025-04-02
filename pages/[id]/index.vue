<script setup>
  // import Dialog from 'primevue/dialog'
  import { GET_PRODUCT } from '../../gql/queries/GetProduct.ts'
  import { CREATE_CHECKOUT } from '../../gql/mutations/CreateCHeckout.ts'
  import { ADD_ITEM_TO_CHECKOUT } from '../../gql/mutations/AddItemToCheckout.ts'
  definePageMeta({
    layout: 'default'
  })
  const route = useRoute()
  const id = route.params.id

  const toast = useToast()

  const variables = {
    id,
    channel: 'default-channel'
  }
  const { data } = await useAsyncQuery(GET_PRODUCT, variables)
  const product = data?.value?.product || null

  const productVariantId = data?.value?.product?.variants[0]?.id || null
  const home = ref({ label: 'Home', to: '/' })
  const items = ref([{ label: 'Shop', to: '/shop' }, { label: 'Categories' }])

  const visible = ref(false)

  const showToast = () => {
    toast.add({
      severity: 'success',
      summary: 'Info',
      detail: `${product?.name} has been added to your cart`,
      life: 3000
    })
  }
  const cartStore = useCartStore()
  const handleAddToCart = async () => {
    let checkoutId = cartStore.checkoutId
    console.log('🦆 ~ handleAddToCart ~ checkoutId:', checkoutId)

    if (checkoutId) {
      try {
        const { mutate } = useMutation(ADD_ITEM_TO_CHECKOUT)
        const { data } = await mutate({
          checkoutId,
          variantId: productVariantId
        })
        console.log('🦆 ~ handleAddToCart ~ data:', data)
      } catch (error) {
        console.error('Mutation error:', error)
      }
    }

    if (!checkoutId) {
      try {
        const { mutate } = useMutation(CREATE_CHECKOUT)
        const { data } = await mutate({
          id: productVariantId,
          channel: 'default-channel'
        })

        checkoutId = data?.checkoutCreate?.checkout?.id
        console.log('🦆 ~ handleAddToCart ~ checkoutId:', checkoutId)

        if (checkoutId) cartStore.checkoutId = checkoutId
        console.log('🦆 ~ handleAddToCart ~ cartStore:', cartStore)
      } catch (error) {
        console.error('Mutation error:', error)
      }
    }

    showToast()
  }
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
        <Button
          id="button-add-to-cart"
          label="Add to cart"
          @click="handleAddToCart()"
        ></Button>
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
    <Dialog
      v-model:visible="visible"
      modal
      :closable="false"
      :dismissableMask="true"
      style="width: 100%; padding: 0"
      :style="{ width: '65vw', borderRadius: '0px' }"
    >
      <template #header>
        <div style="width: 100%; padding: 0">
          <p id="warranty-information-title">Warranty Information</p>
          <hr id="divider-title" />
        </div>
      </template>

      <p id="warranty-information-content">
        Generally, warranty for parts purchased on Parts.Cat.Com is 12 months
        from the invoice date as defined in the Caterpillar Limited Warranty.
        Parts Warranty covers defects in material and workmanship throughout the
        Warranty period once it has been installed. For complete Warranty detail
        contact your local Cat Dealer.
      </p>
      <hr id="divider-content" />
      <p id="contact-us">Need more help? Contact Us</p>
      <div id="container-ctas">
        <div class="icons">
          <Icon
            name="material-symbols:android-emergency-location-service"
            style="color: black; font-size: 15px"
          />
          <p
            style="color: black; font-size: x-small; text-transform: uppercase"
          >
            Find A Dealer
          </p>
        </div>
        <div class="icons">
          <Icon
            name="material-symbols:mail-rounded"
            style="color: black; font-size: 15px"
          />
          <p style="color: black; font-size: x-small">Email</p>
        </div>
      </div>
    </Dialog>
    <Toast />
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
  #divider-title {
    background-color: yellow;
    width: 100%;
    height: 0.2rem;
    border-radius: 5px;
    border: none;
    margin: 0; /* Remove any default margin */
    padding: 0;
  }
  .icons {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.2rem;
    gap: 0.5rem;
  }
  .icons:hover {
    cursor: pointer;
  }
  .icons > p {
    text-transform: uppercase;
  }
  #container-ctas {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
  }

  #divider-content {
    background-color: black;
    width: 100%;
    height: 0.01rem;
  }
  #warranty-information-title {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
  }
  #contact-us {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
  }
  #warranty-information-content {
    font-size: 0.75rem;
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
    width: 100%; /* Make it fill the container */
    height: 100%; /* Ensure it scales correctly */
    /* max-height: 300px; Adjust as needed */
    object-fit: cover; /* Prevents distortion */
  }

  .container_product_name {
    display: flex;
    flex: 1;
    /* background-color: pink; */
    flex-direction: column;
  }
</style>
