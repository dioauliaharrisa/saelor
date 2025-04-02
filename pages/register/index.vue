<script setup>
  import { REGISTER_ACCOUNT } from '../../gql/mutations/RegisterAccount.ts'
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'

  const { mutate: registerAccount } = useMutation(REGISTER_ACCOUNT)

  const FormRegister = z.object({
    email: z.string(),
    password: z.string()
  })
  const initialValues = reactive({
    email: '',
    password: ''
  })

  const resolver = zodResolver(FormRegister)

  const onFormSubmit = async ({ valid, values }) => {
    if (valid) {
      try {
        const data = await registerAccount({
          email: values.email,
          password: values.password,
          channel: 'default-channel'
        })
        console.log('🦆 ~ onFormSubmit ~ data:', data)
      } catch (error) {
        console.error('🦆 ~ onFormSubmit ~ error:', error)
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
          <Button
            id="button-submit"
            type="submit"
            severity="secondary"
            label="Submit"
          />
        </Form>
      </div>
    </div>
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
    width: 100%;
    padding: 0 15rem;
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
