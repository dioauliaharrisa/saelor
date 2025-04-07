<script setup>
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import { COMPLETE_CHECKOUT } from '../../gql/mutations/CompleteCheckout'
  import { UPDATE_CHECKOUT_EMAIL } from '../../gql/mutations/UpdateCheckoutEmail'
  import { CHECKOUT_UPDATE_SHIPPING_ADDRESS } from '../../gql/mutations/CheckoutUpdateShippingAddress'
  import { GET_SHIPPING_METHODS } from '../../gql/queries/CheckoutGetShippingMethods'

  const FormCheckout = z.object({
    email: z.string(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    streetAddress1: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    countryArea: z.string().optional(),
    country: z.string()
  })

  const email = ref('daharrisa@gmail.com')

  const cartStore = useCartStore()
  const user = cartStore.user || {}
  const userFirstAddress = user.addresses[0] || {}
  const checkoutId = computed(() => cartStore.checkoutId)
  console.log('🦆 ~ user:', user)

  const { mutate: completeCheckout } = useMutation(COMPLETE_CHECKOUT)
  const { mutate: updateEmail } = useMutation(UPDATE_CHECKOUT_EMAIL)
  const { mutate: updateShippingAddress } = useMutation(
    CHECKOUT_UPDATE_SHIPPING_ADDRESS
  )
  const { data: resultShippingMethods } = useAsyncQuery(
    GET_SHIPPING_METHODS,
    {
      id: checkoutId
    },
    { skip: !checkoutId.value }
  )
  console.log('🦆 ~ data:', checkoutId, resultShippingMethods)

  const shippingMethods =
    resultShippingMethods?.value?.checkout?.shippingMethods || []
  console.log('🦆 ~ resultShippingMethods:', resultShippingMethods)

  const initialValues = reactive({
    email: '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    streetAddress1: userFirstAddress?.streetAddress1 || '',
    city: userFirstAddress.city || '',
    postalCode: userFirstAddress.postalCode || '',
    countryArea: userFirstAddress.countryArea || '',
    country: 'AU'
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
        email: email.value
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

      await completeCheckout({
        checkoutId: checkoutId.value
      })
    } catch (error) {
      console.log('🦆 ~ onFormSubmit ~ error:', error)
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
        v-model="selectedCity"
        :options="shippingMethods"
        option-label="name"
        placeholder="Select available shipping method"
        class="w-full md:w-56"
      />
      <div>
        <Button
          id="button-submit"
          type="submit"
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
