<script setup>
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'

  definePageMeta({
    layout: false
  })

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
        const token = await login({
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
    <div class="container-login">
      <div class="container-header">
        <img
          class="logo"
          src="/Logo_Jayben.svg"
          alt="Logo Jayben"
          @click="router.push({ path: '/' })"
        />
        <h3>Login</h3>
        <Divider />
      </div>
      <Form
        v-slot="$form"
        :initial-values="initialValues"
        :resolver="resolver"
        class="form-login"
        @submit="onFormSubmit"
      >
        <IftaLabel class="form-input">
          <InputText name="email" type="text" fluid />
          <label for="email">Email</label>
          <Message
            v-if="$form.username?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.username.error.message }}
          </Message>
        </IftaLabel>
        <IftaLabel class="form-input">
          <Password
            name="password"
            :feedback="false"
            toggleMask
            fluid
            inputClass="form-control"
          />
          <label for="password">Password</label>
          <Message
            v-if="$form.password?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            <ul class="my-0 px-4 flex flex-col gap-1">
              <li v-for="(error, index) of $form.password.errors" :key="index">
                {{ error.message }}
              </li>
            </ul>
          </Message>
        </IftaLabel>
        <p id="link-forgot-password" @click="router.push('/reset-password')">
          Forgot password?
        </p>
        <Button
          id="button-submit"
          type="submit"
          label="Submit"
          :loading="loading"
        />
      </Form>
    </div>
  </div>
</template>

<style scoped>
  .container-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .logo {
    max-width: 100px;
    cursor: pointer;
  }
  .page {
    min-height: 100vh;
    /* margin: 0 auto; */
    background: #004273;
    background: linear-gradient(
      90deg,
      rgba(0, 66, 115, 1) 0%,
      rgba(120, 155, 181, 1) 100%,
      rgba(240, 244, 247, 1) 100%
    );
    display: flex;
    align-items: center;
  }

  .form-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 0;
    /* border: 6px solid var(--primary-color); */
  }
  .container-login {
    background: #004273;
    background: linear-gradient(
      90deg,
      rgba(0, 66, 115, 1) 0%,
      rgba(120, 155, 181, 1) 0%,
      rgba(240, 244, 247, 1) 100%
    );
    /* border: 2px solid var(--primary-color); */
    padding: 2rem;
    border-radius: 0.2rem;
    max-width: 600px;
    margin: 0 auto;
  }
  .container-content {
  }
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
    /* background-color: var(--primary-color); */
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
