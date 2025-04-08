<script setup>
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import { COMPLETE_CHECKOUT } from '../../gql/mutations/CompleteCheckout'
  import { UPDATE_CHECKOUT_EMAIL } from '../../gql/mutations/UpdateCheckoutEmail'
  import { CHECKOUT_UPDATE_SHIPPING_ADDRESS } from '../../gql/mutations/CheckoutUpdateShippingAddress'
  import { CHECKOUT_UPDATE_BILLING_ADDRESS } from '../../gql/mutations/CheckoutUpdateBillingAddress'
  import { CHECKOUT_UPDATE_DELIVERY_METHOD } from '../../gql/mutations/CheckoutUpdateDeliveryMethod'

  import { GET_SHIPPING_METHODS } from '../../gql/queries/CheckoutGetShippingMethods'

  const FormCheckout = z.object({
    email: z.string(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    streetAddress1: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    countryArea: z.string().optional(),
    country: z.string(),
    shippingMethod: z.string().optional()
  })

  const cartStore = useCartStore()
  const user = cartStore.user || {}
  const userFirstAddress = user?.addresses?.[0] || {}
  const checkoutId = computed(() => cartStore.checkoutId)

  const { mutate: completeCheckout } = useMutation(COMPLETE_CHECKOUT)
  const { mutate: updateEmail } = useMutation(UPDATE_CHECKOUT_EMAIL)
  const { mutate: updateShippingAddress } = useMutation(
    CHECKOUT_UPDATE_SHIPPING_ADDRESS
  )
  const { mutate: updateBillingAddress } = useMutation(
    CHECKOUT_UPDATE_BILLING_ADDRESS
  )
  const { mutate: updateDeliveryMethod } = useMutation(
    CHECKOUT_UPDATE_DELIVERY_METHOD
  )
  const { data: resultShippingMethods } = useAsyncQuery(
    GET_SHIPPING_METHODS,
    {
      id: checkoutId
    },
    { skip: !checkoutId.value }
  )

  const shippingMethods =
    resultShippingMethods?.value?.checkout?.shippingMethods || []
  // console.log('🦆 ~ shippingMethods:', shippingMethods)

  const initialValues = reactive({
    email: user.email || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    streetAddress1: userFirstAddress?.streetAddress1 || '',
    city: userFirstAddress.city || '',
    postalCode: userFirstAddress.postalCode || '',
    countryArea: userFirstAddress.countryArea || '',
    country: 'AU',
    shippingMethod: ''
  })
  // const router = useRouter()
  const loading = ref(false)

  const resolver = zodResolver(FormCheckout)
  const { showFieldErrors } = useShowNotification()

  const onFormSubmit = async ({ valid, values }) => {
    loading.value = true
    try {
      if (!valid) {
        throw 'Form is invalid'
      }
      if (!checkoutId.value) {
        throw 'No checkout ID found'
      }
      const emailResult = await updateEmail({
        checkoutId: checkoutId.value,
        email: values.email
      })

      const errorsCheckoutEmailUpdate =
        emailResult?.data?.checkoutEmailUpdate?.errors
      if (errorsCheckoutEmailUpdate.length) {
        throw errorsCheckoutEmailUpdate
      }

      const resultCheckoutUpdateShippingAddress = await updateShippingAddress({
        id: checkoutId.value,
        shippingAddress: {
          firstName: values.firstName,
          lastName: values.lastName,
          streetAddress1: values.streetAddress1,
          city: values.city,
          postalCode: values.postalCode,
          countryArea: values.countryArea,
          country: values.country
        }
      })

      const errorsCheckoutUpdateShippingAddress =
        resultCheckoutUpdateShippingAddress?.data?.checkoutShippingAddressUpdate
          ?.errors
      if (errorsCheckoutUpdateShippingAddress.length) {
        throw errorsCheckoutUpdateShippingAddress
      }

      const resultCheckoutUpdateBillingAddress = await updateBillingAddress({
        id: checkoutId.value,
        billingAddress: {
          firstName: values.firstName,
          lastName: values.lastName,
          streetAddress1: values.streetAddress1,
          city: values.city,
          postalCode: values.postalCode,
          countryArea: values.countryArea,
          country: values.country
        }
      })

      const errorsCheckoutUpdateBillingAddress =
        resultCheckoutUpdateBillingAddress?.data?.checkoutBillingAddressUpdate
          ?.errors
      if (errorsCheckoutUpdateBillingAddress.length) {
        throw errorsCheckoutUpdateBillingAddress
      }

      const { data: resultUpdateDeliveryMethod } = await updateDeliveryMethod({
        id: checkoutId.value,
        deliveryMethodId: values.shippingMethod
      })

      const errorsCheckoutUpdateDeliveryMethod =
        resultUpdateDeliveryMethod?.checkoutDeliveryMethodUpdate?.errors
      if (errorsCheckoutUpdateDeliveryMethod.length) {
        throw errorsCheckoutUpdateDeliveryMethod
      }

      const resultCompleteCheckout = await completeCheckout({
        checkoutId: checkoutId.value
      })

      const errorsCompleteCheckout =
        resultCompleteCheckout?.completeCheckout?.errors
      if (errorsCompleteCheckout.length) {
        throw errorsCompleteCheckout
      }

      cartStore.resetCart()
    } catch (error) {
      showFieldErrors(Array.isArray(error) ? error : [error])
    } finally {
      loading.value = false
    }
  }

  const formUserDetailsFields = [
    { name: 'email', type: 'text', placeholder: 'Email' }
  ]

  const formShippingAddressFields = [
    { name: 'country', type: 'text', placeholder: 'Country' },
    { name: 'firstName', type: 'text', placeholder: 'First Name' },
    { name: 'lastName', type: 'text', placeholder: 'Last Name' },
    { name: 'streetAddress1', type: 'text', placeholder: 'Street Address' },
    { name: 'city', type: 'text', placeholder: 'City' },
    { name: 'postalCode', type: 'text', placeholder: 'Postal Code' },
    { name: 'countryArea', type: 'text', placeholder: 'Country Area' },
    { name: 'phone', type: 'text', placeholder: 'Phone Number' }
  ]
</script>

<template>
  <div class="page">
    <h3>Checkout</h3>
    <Form
      v-slot="$form"
      :initial-values="initialValues"
      :resolver="resolver"
      class="container-content"
      @submit="onFormSubmit"
    >
      <div class="container-user-details">
        <h5 style="align-self: flex-start">User details</h5>
        <div
          v-for="(field, index) in formUserDetailsFields"
          :key="index"
          class="form-input"
        >
          <FloatLabel variant="on">
            <label for="on_label">{{ field.placeholder }}</label>
            <InputText
              :name="field.name"
              :type="field.type"
              fluid
              variant="filled"
              size="small"
            />
          </FloatLabel>
          <Message
            v-if="$form[field.name]?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            <span>{{ $form[field.name].error.message }}</span>
          </Message>
        </div>
      </div>
      <Divider />
      <div class="container-shipping-address">
        <h5 style="align-self: flex-start">Shipping Address</h5>
        <div
          v-for="(field, index) in formShippingAddressFields"
          :key="index"
          class="form-input"
        >
          <FloatLabel variant="on">
            <label for="on_label">{{ field.placeholder }}</label>
            <InputText
              :name="field.name"
              :type="field.type"
              fluid
              variant="filled"
              size="small"
            />
          </FloatLabel>
          <Message
            v-if="$form[field.name]?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            <span>{{ $form[field.name].error.message }}</span>
          </Message>
        </div>
      </div>
      <Select
        name="shippingMethod"
        option-label="name"
        option-value="id"
        :options="shippingMethods"
        placeholder="Select a shipping method"
      />
      <div>
        <Button
          id="button-submit"
          severity="secondary"
          label="Choose delivery method"
          :loading="loading"
        />
        <Button
          id="button-submit"
          type="submit"
          severity="secondary"
          label="Checkout"
          :loading="loading"
        />
      </div>
    </Form>
  </div>
</template>

<style scoped>
  .page {
    max-width: 80vw;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  .container-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container-user-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    max-width: 300px;
    width: 100%;
  }
  .container-shipping-address {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    max-width: 300px;
    width: 100%;
  }
  .form-input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    width: 100%;
  }
  h5 {
    margin: 1rem 0;
  }
  #button-submit {
    background-color: var(--primary-color);
    color: white;

    justify-self: center;
    max-width: 100px;
    margin: 1rem auto;
  }
</style>
