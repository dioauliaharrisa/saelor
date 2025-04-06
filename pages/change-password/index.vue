<script setup>
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import { CHANGE_PASSWORD } from '../../gql/mutations/ChangePassword.ts'
  import useShowNotification from '../../composables/useShowNotification.ts'
  const { showFieldErrors, showSuccessToast } = useShowNotification()

  const { accessToken, refreshAccessToken } = useAuth()

  const { mutate: changePassword } = useMutation(CHANGE_PASSWORD)

  const router = useRouter()

  const FormLogin = z.object({
    oldPassword: z.string(),
    newPassword: z.string()
  })
  const initialValues = reactive({
    oldPassword: '',
    newPassword: ''
  })

  const loading = ref(false)

  const resolver = zodResolver(FormLogin)

  const onFormSubmit = async ({ valid, values }) => {
    loading.value = true
    if (valid) {
      await refreshAccessToken()
      try {
        console.log('🦆 ~ onFormSubmit ~ values:', values)
        const { data } = await changePassword(
          {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
          },
          {
            context: {
              headers: {
                Authorization: `Bearer ${accessToken.value}`
              }
            }
          }
        )
        console.log('🦆 ~ onFormSubmit ~ data:', data)
        const errors = data?.passwordChange?.errors || []
        if (errors.length) {
          throw errors
        }

        showSuccessToast('Password changed successfully')
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
    <div class="container-change-password">
      <div class="container-header"><p>Change Password</p></div>
      <div class="container-content">
        <Form
          v-slot="$form"
          :initial-values="initialValues"
          :resolver="resolver"
          @submit="onFormSubmit"
          class="form-change-password"
        >
          <div class="form-input">
            <Password
              name="oldPassword"
              placeholder="Old Password"
              :feedback="false"
              toggleMask
              fluid
              inputClass="form-control"
            />
            <Message
              v-if="$form.oldPassword?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              <ul class="my-0 px-4 flex flex-col gap-1">
                <li
                  v-for="(error, index) of $form.oldPassword.errors"
                  :key="index"
                >
                  {{ error.message }}
                </li>
              </ul>
            </Message>
          </div>
          <div class="form-input">
            <Password
              name="newPassword"
              placeholder="New Password"
              :feedback="false"
              toggleMask
              fluid
              inputClass="form-control"
            />
            <Message
              v-if="$form.newPassword?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              <ul class="my-0 px-4 flex flex-col gap-1">
                <li
                  v-for="(error, index) of $form.newPassword.errors"
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
  }
  .form-change-password {
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
