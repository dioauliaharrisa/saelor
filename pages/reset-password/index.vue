<script setup>
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import { REQUEST_PASSWORD_RESET } from '../../gql/mutations/RequestPasswordReset.ts'
  import useShowNotification from '../../composables/useShowNotification.ts'
  // const {
  //   public: { ngrokUrl }
  // } = useRuntimeConfig()
  const { showFieldErrors, showSuccessToast } = useShowNotification()

  const { mutate: resetPassword } = useMutation(REQUEST_PASSWORD_RESET)

  // const router = useRouter()

  const FormResetPassword = z.object({
    email: z.string()
  })
  const initialValues = reactive({
    email: ''
  })

  const loading = ref(false)

  const resolver = zodResolver(FormResetPassword)

  const onFormSubmit = async ({ valid, values }) => {
    loading.value = true
    if (valid) {
      // await refreshAccessToken()
      try {
        console.log('🦆 ~ onFormSubmit ~ values:', values)
        const { data } = await resetPassword({
          email: 'daharrisa@gmail.com',
          redirectUrl: `https://a62129e9c42950e042140e945dc856ab.serveo.net/` // ngrokUrl + '/reset-password'
        })
        // {
        //   oldPassword: values.oldPassword,
        //   newPassword: values.newPassword
        // },
        // {
        //   context: {
        //     headers: {
        //       Authorization: `Bearer ${accessToken.value}`
        //     }
        //   }
        // }
        console.log('🦆 ~ onFormSubmit ~ data:', data)
        const errors = data?.requestPasswordReset?.errors || []
        if (errors.length) {
          throw errors
        }

        showSuccessToast('Password reset successfully')
        //       router.push('/')
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
    <div class="container-reset-password">
      <div class="container-header"><p>Change Password</p></div>
      <div class="container-content">
        <Form
          v-slot="$form"
          :initial-values="initialValues"
          :resolver="resolver"
          @submit="onFormSubmit"
          class="form-reset-password"
        >
          <div class="form-input">
            <InputText name="email" type="text" placeholder="Email" fluid />
            <Message
              v-if="$form.email?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.email.error.message }}
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
  }
  .form-reset-password {
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
