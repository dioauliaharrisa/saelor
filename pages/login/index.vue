<script setup>
  import { LOG_IN } from '../../gql/mutations/LogIn.ts'
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import Cookies from 'js-cookie'

  const { accessToken, refreshAccessToken, refreshToken } = useAuth()
  const { mutate: logIn } = useMutation(LOG_IN)
  // const router = useRouter()

  const FormLogin = z.object({
    email: z.string(),
    password: z.string()
  })
  const initialValues = reactive({
    email: '',
    password: ''
  })
  const router = useRouter()

  const loading = ref(false)
  const toast = useToast()
  const showToast = (errors) => {
    console.log('🦆 ~ showToast ~ errors:', errors)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `${errors[0].message}`,
      life: 6000
    })
  }

  const resolver = zodResolver(FormLogin)

  const onFormSubmit = async ({ valid, values }) => {
    if (valid) {
      loading.value = true
      try {
        const { data } = await logIn({
          email: values.email,
          password: values.password
        })
        console.log('🦆 ~ onFormSubmit ~ data:', data)

        const errors = data?.tokenCreate?.errors || []
        if (errors.length) {
          throw errors
        }

        const fetchedToken = data?.tokenCreate?.token
        const fetchedRefreshToken = data?.tokenCreate?.refreshToken
        if (fetchedToken && fetchedRefreshToken) {
          refreshToken.value = fetchedRefreshToken
          accessToken.value = fetchedRefreshToken
          localStorage.setItem('refreshToken', fetchedRefreshToken)
          Cookies.set('accessToken', fetchedToken, {
            expires: 1,
            secure: true
          })
          await refreshAccessToken()
          router.push('/')
        }
      } catch (error) {
        showToast(error)
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
          :initial-values="initialValues"
          :resolver="resolver"
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
    <Toast />
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
