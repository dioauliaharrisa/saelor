<script setup>
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'

  const { login } = useAuth()

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

  const resolver = zodResolver(FormLogin)
  const { showFieldErrors } = useShowNotification()
  const onFormSubmit = async ({ valid, values }) => {
    if (valid) {
      loading.value = true
      try {
        await login({
          email: values.email,
          password: values.password
        })
        router.push('/')
      } catch (error) {
        showFieldErrors(Array.isArray(error) ? error : [error])
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
          <p id="link-forgot-password" @click="router.push('/reset-password')">
            Forgot password?
          </p>
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
  #link-forgot-password {
    font-size: xx-small;
    padding: 0;
    margin: 0;
    align-self: flex-end;
  }
  #link-forgot-password:hover {
    text-decoration: underline;
    cursor: pointer;
  }
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
