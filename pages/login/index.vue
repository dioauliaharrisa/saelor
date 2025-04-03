<script setup>
  import { LOG_IN } from '../../gql/mutations/LogIn.ts'
  import { GET_USER } from '../gql/queries/GetUser.ts'
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'

  const { accessToken, refreshAccessToken, refreshToken } = useAuth()
  const { mutate: logIn } = useMutation(LOG_IN)
  // const router = useRouter()

  const FormRegister = z.object({
    email: z.string(),
    password: z.string()
  })
  const initialValues = reactive({
    email: '',
    password: ''
  })
  const router = useRouter()

  const loading = ref(false)

  const resolver = zodResolver(FormRegister)

  const onFormSubmit = async ({ valid, values }) => {
    if (valid) {
      loading.value = true
      try {
        const { data } = await logIn({
          email: values.email,
          password: values.password
        })

        const errors = data?.tokenCreate?.errors || []
        if (errors.length) {
          console.error('Error login', errors)
        }
        if (data.tokenCreate?.token && data.tokenCreate?.refreshToken) {
          refreshToken.value = data.tokenCreate.refreshToken
          accessToken.value = data.tokenCreate.token

          await refreshAccessToken()
          // await refetchUser()
          router.push('/')
        }
      } catch (error) {
        console.error('🦆 ~ onFormSubmit ~ error:', error)
      } finally {
        loading.value = false
      }
    }
  }
</script>

<template>
  <div class="page">
    <div class="container-register">
      <div class="container-header"><p>Login</p></div>
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
            :loading="loading"
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
    max-width: 80vw;
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
