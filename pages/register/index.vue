<script setup>
  import { REGISTER_ACCOUNT } from '../../gql/mutations/RegisterAccount.ts'
  import { CREATE_ACCOUNT_ADDRESS } from '../../gql/mutations/CreateAccountAddress.ts'
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  // import { useRouter } from 'vue-router'

  const { mutate: registerAccount } = useMutation(REGISTER_ACCOUNT)
  const { mutate: createAccountAddress } = useMutation(CREATE_ACCOUNT_ADDRESS)

  const router = useRouter()
  const toast = useToast()
  const loading = ref(false)
  const { accessToken, refreshAccessToken } = useAuth()

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
  //   postalCode: '30000',
  //   country: 'AU',
  //   countryArea: 'Tasmania',
  //   streetAddress1: '123 Collins St',
  //   phone: '+6281298590750'
  // })
  const showToast = (errors) => {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `${errors[0].message}`,
      life: 6000
    })
  }
  const resolver = zodResolver(FormRegister)

  const onFormSubmit = async ({ valid, values }) => {
    if (valid) {
      await refreshAccessToken()
      loading.value = true
      try {
        const { data } = await registerAccount({
          email: values.email,
          password: values.password,
          channel: 'default-channel',
          firstName: values.firstName,
          lastName: values.lastName
        })
        const errorsRegisterAccount = data?.accountRegister?.errors || []
        console.log(
          '🦆 ~ onFormSubmit ~ errorsRegisterAccount:',
          errorsRegisterAccount
        )
        if (errorsRegisterAccount.length) {
          throw errorsRegisterAccount
        }
        const { data: accountAddress } = await createAccountAddress(
          {
            input: {
              firstName: values.firstName,
              lastName: values.lastName,
              city: values.city,
              postalCode: values.postalCode,
              country: values.country,
              countryArea: values.countryArea,
              streetAddress1: values.streetAddress1,
              phone: values.phone
            },
            type: 'BILLING'
          },
          {
            context: {
              headers: {
                Authorization: `Bearer ${accessToken.value}`
              }
            }
          }
        )

        const errorsAccountAddressCreate =
          accountAddress?.accountAddressCreate?.errors || []
        if (errorsAccountAddressCreate.length) {
          throw errorsAccountAddressCreate
        }
        router.push('/login')
      } catch (error) {
        showToast(error)
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
        <!--
        country {
          code
          country
        }
         -->
        <Button
          id="button-submit"
          type="submit"
          severity="secondary"
          label="Submit"
          :loading="loading"
        />
      </Form>
    </div>
    <Toast />
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
  }
  .page {
    width: 100%;
    max-width: 80vw;
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
