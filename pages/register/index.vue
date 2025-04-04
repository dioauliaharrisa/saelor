<script setup>
  import { REGISTER_ACCOUNT } from '../../gql/mutations/RegisterAccount.ts'
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  // import { useRouter } from 'vue-router'

  const { mutate: registerAccount } = useMutation(REGISTER_ACCOUNT)
  const router = useRouter()
  const toast = useToast()

  const FormRegister = z.object({
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
  })
  const initialValues = reactive({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })
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
      try {
        const { data } = await registerAccount({
          email: values.email,
          password: values.password,
          channel: 'default-channel',
          firstName: values.firstName,
          lastName: values.lastName
        })
        const errors = data?.accountRegister?.errors || []
        if (errors.length) {
          throw errors
        }
        router.push('/login')
      } catch (error) {
        showToast(error)
      }
    }
  }
</script>

<template>
  <div class="page">
    <div class="container-register">
      <div class="container-header"><p>Create Account</p></div>
      <div class="container-content">
        <Form
          v-slot="$form"
          :initialValues
          :resolver
          @submit="onFormSubmit"
          class="form-register"
        >
          <div class="form-input">
            <InputText name="email" type="text" placeholder="Email" fluid />
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.username.error.message }}
            </Message>
          </div>
          <div class="form-input">
            <Password
              name="password"
              placeholder="Password"
              :feedback="false"
              toggleMask
              fluid
              inputClass="form-control"
            />
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              <ul class="my-0 px-4 flex flex-col gap-1">
                <li
                  v-for="(error, index) of $form.password.errors"
                  :key="index"
                >
                  {{ error.message }}
                </li>
              </ul>
            </Message>
          </div>
          <div class="form-input">
            <InputText
              name="firstName"
              type="text"
              placeholder="First Name"
              fluid
            />
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.username.error.message }}
            </Message>
          </div>
          <div class="form-input">
            <InputText
              name="lastName"
              type="text"
              placeholder="Last Name"
              fluid
            />
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.username.error.message }}
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
    <Toast />
  </div>
</template>

<style scoped>
  #button-submit {
    background-color: var(--primary-color);
  }
  .page {
    width: 80vw;
    margin: 0 auto;
    /* background-color: red; */
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
