<script setup>
  import { REGISTER_ACCOUNT } from '../../gql/mutations/RegisterAccount.ts'
  import { CREATE_ACCOUNT_ADDRESS } from '../../gql/mutations/CreateAccountAddress.ts'
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import { ACCOUNT_SET_DEFAULT_ADDRESS } from '../../gql/mutations/AccountSetDefaultAddress.ts'
  import { useRouter } from 'vue-router'

  const { mutate: registerAccount } = useMutation(REGISTER_ACCOUNT)
  const { mutate: createAccountAddress } = useMutation(CREATE_ACCOUNT_ADDRESS)
  const { mutate: setAccountDefaultAddress } = useMutation(
    ACCOUNT_SET_DEFAULT_ADDRESS
  )

  const router = useRouter()
  const loading = ref(false)
  const { login } = useAuth()
  const { showFieldErrors, showSuccessToast } = useShowNotification()
  const FormRegister = z.object({
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    city: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
    countryArea: z.string().min(1),
    streetAddress1: z.string().min(1),
    phone: z.string().min(1)
  })
  const initialValues = reactive({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    city: '',
    postalCode: '',
    country: 'AU',
    countryArea: '',
    streetAddress1: '',
    phone: ''
  })
  // const initialValues = reactive({
  //   email: 'kerasakti@example.com',
  //   password: 'password123',
  //   firstName: 'Kera',
  //   lastName: 'Sakti',
  //   city: 'Melbourne',
  //   postalCode: '7320',
  //   country: 'AU',
  //   countryArea: 'Tasmania',
  //   streetAddress1: '123 Collins St',
  //   phone: '+6281298590750'
  // })

  const resolver = zodResolver(FormRegister)

  const onFormSubmit = async ({ valid, values }) => {
    if (valid) {
      loading.value = true
      try {
        const { data } = await registerAccount({
          email: values.email,
          password: values.password,
          channel: 'default-channel',
          firstName: values.firstName,
          lastName: values.lastName
        })
        console.log('🦆 ~ onFormSubmit ~ data:', data)
        const errorsRegisterAccount = data?.accountRegister?.errors || []
        console.log(
          '🦆 ~ onFormSubmit ~ errorsRegisterAccount:',
          errorsRegisterAccount
        )
        if (errorsRegisterAccount.length) {
          throw errorsRegisterAccount
        }
        const token = await login({
          email: values.email,
          password: values.password
        })
        const { data: accountAddress } = await createAccountAddress(
          {
            // userId: data?.accountRegister?.user?.id,
            input: {
              firstName: values.firstName,
              lastName: values.lastName,
              city: values.city,
              postalCode: values.postalCode,
              country: values.country,
              countryArea: values.countryArea,
              streetAddress1: values.streetAddress1,
              phone: values.phone
            }
          },
          {
            context: {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          }
        )

        const errorsAccountAddressCreate =
          accountAddress?.accountAddressCreate?.errors || []
        if (errorsAccountAddressCreate.length) {
          throw errorsAccountAddressCreate
        }
        const accountAddressId =
          accountAddress?.accountAddressCreate?.address?.id

        const { data: accountdefaultAddress } = await setAccountDefaultAddress(
          {
            // userId: data?.accountRegister?.user?.id,
            id: accountAddressId,
            type: 'SHIPPING'
          },
          {
            context: {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          }
        )
        console.log(
          '🦆 ~ onFormSubmit ~ accountdefaultAddress:',
          accountdefaultAddress
        )

        const errorsSetDefaultAddress =
          accountdefaultAddress.accountSetDefaultAddress.errors || []

        if (errorsSetDefaultAddress.length) {
          throw errorsAccountAddressCreate
        }
        showSuccessToast('Account created successfully')
        router.push('/')
      } catch (error) {
        showFieldErrors(Array.isArray(error) ? error : [error])
      } finally {
        loading.value = false
      }
    }
  }
  const formFields = [
    { name: 'email', type: 'text', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'firstName', type: 'text', placeholder: 'First Name' },
    { name: 'lastName', type: 'text', placeholder: 'Last Name' },
    { name: 'city', type: 'text', placeholder: 'City' },
    { name: 'postalCode', type: 'text', placeholder: 'Postal Code' },
    { name: 'country', type: 'text', placeholder: 'Country' },
    { name: 'countryArea', type: 'text', placeholder: 'Country Area' },
    { name: 'streetAddress1', type: 'text', placeholder: 'Street Address' },
    { name: 'phone', type: 'text', placeholder: 'Phone Number' }
  ]
</script>

<template>
  <div class="page">
    <div class="container-register">
      <div class="container-header"><p>Create Account</p></div>
      <Form
        v-slot="$form"
        :initial-values="initialValues"
        :resolver="resolver"
        class="container-content"
        @submit="onFormSubmit"
      >
        <div
          v-for="(field, index) in formFields"
          :key="index"
          class="form-input"
        >
          <InputText
            v-if="field.type !== 'password'"
            :name="field.name"
            :type="field.type"
            :placeholder="field.placeholder"
            fluid
          />
          <Password
            v-else
            :name="field.name"
            :placeholder="field.placeholder"
            :feedback="false"
            toggle-mask
            fluid
            input-class="form-control"
          />
          <Message
            v-if="$form[field.name]?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            <ul
              v-if="Array.isArray($form[field.name]?.errors)"
              class="my-0 px-4 flex flex-col gap-1"
            >
              <li
                v-for="(error, index) of $form[field.name].errors"
                :key="index"
              >
                {{ error.message }}
              </li>
            </ul>
            <span v-else>{{ $form[field.name].error.message }}</span>
          </Message>
        </div>
        <Button
          id="button-submit"
          type="submit"
          severity="secondary"
          label="Submit"
          :loading="loading"
        />
      </Form>
    </div>
  </div>
</template>

<style scoped>
  .container-register {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    margin: 1rem;
  }
  #button-submit {
    background-color: var(--primary-color);
    color: white;
    grid-column: span 2;
    justify-self: center;
  }
  .page {
    width: 100%;
    max-width: 40vw;
    margin: 0 auto;
    /* background-color: red; */
  }
  .container-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 2rem;
    column-gap: 2rem;
  }
  .form-register {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 0;
  }
  .form-input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    width: 100%;
  }
  .form-input > input {
    font-size: 0.8rem;
    width: 100%;
  }

  :deep(.form-control),
  :deep(.p-password-input) {
    font-size: 0.8rem !important;
    width: 100%;
  }
</style>
