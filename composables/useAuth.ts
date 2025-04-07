// import Cookies from 'js-cookie'
import { GET_USER } from '../gql/queries/GetUser'
import { LOG_IN } from '../gql/mutations/LogIn.ts'
import { REFRESH_TOKEN } from '../gql/mutations/RefreshToken'
import { useRouter } from 'vue-router'
export const useAuth = () => {
  const router = useRouter()
  const { showFieldErrors } = useShowNotification()
  const refreshToken = ref('')
  const accessToken = ref('')
  const { mutate: refreshTokenMutation } = useMutation(REFRESH_TOKEN)
  const cartStore = useCartStore()
  const { load: refetchUser, result: userResult } = useLazyQuery(
    GET_USER,
    null,
    {
      fetchPolicy: 'network-only',
      context: computed(() => ({
        headers: {
          Authorization: accessToken.value ? `Bearer ${accessToken.value}` : ''
        }
      }))
    }
  )
  console.log('🦆 ~ useAuth ~ userResult:', userResult, 66, accessToken.value)

  const { mutate: mutationLogin } = useMutation(LOG_IN)

  const login = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    console.log('🦆 ~ login ~ email, password:', email, password)
    const { data } = await mutationLogin({ email, password })
    console.log('🦆 ~ useAuth ~ data:', data)

    const errors = data?.tokenCreate?.errors || []
    if (errors.length) {
      throw errors
    }

    const fetchedToken = data?.tokenCreate?.token
    const fetchedRefreshToken = data?.tokenCreate?.refreshToken

    if (!fetchedToken || !fetchedRefreshToken) {
      throw [{ message: 'Login failed. Missing tokens.' }]
    }

    refreshToken.value = fetchedRefreshToken
    accessToken.value = fetchedToken

    localStorage.setItem('refreshToken', fetchedRefreshToken)
    localStorage.setItem('accessToken', fetchedToken)

    await refreshAccessToken()
    return fetchedToken
  }

  onMounted(() => {
    if (import.meta.client) {
      refreshToken.value = localStorage.getItem('refreshToken')
      accessToken.value = localStorage.getItem('accessToken')
    }
  })

  // Handle sign-out
  const handleSignOut = () => {
    localStorage.removeItem('accessToken') // Clear localStorage
    localStorage.removeItem('refreshToken')
    accessToken.value = ''
    refreshToken.value = ''
    cartStore.resetUser()
    // router.push('/login')
  }

  const refreshAccessToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken')
      if (!storedRefreshToken) {
        console.error('No refresh token')
        handleSignOut()
        return
      }

      const { data } = await refreshTokenMutation({
        refreshToken: storedRefreshToken
      })

      if (data?.tokenRefresh?.errors?.length) {
        handleSignOut()
        throw errorsAccountAddressCreate(data.tokenRefresh.errors)
      }
      console.log('🦆 ~ refreshAccessToken ~ data:', data)

      if (data?.tokenRefresh?.token) {
        const token = data.tokenRefresh.token
        console.log('🦆 ~ refreshAccessToken ~ token:', token)
        localStorage.setItem('accessToken', token)
        accessToken.value = token

        // Refetch user with new token
        const fetchedUser = await refetchUser()
        console.log('🦆 ~ refreshAccessToken ~ userResult:', userResult)

        cartStore.user = fetchedUser.me
        return token
      }
    } catch (error) {
      showFieldErrors(Array.isArray(error) ? error : [error])
    }
  }

  // Watch for changes in the query result
  watch(userResult, (newValue) => {
    if (newValue?.me) {
      cartStore.user = newValue.me
    }
  })

  watchEffect(() => {
    if (accessToken.value) {
      refetchUser()
    }
  })

  return { accessToken, refreshAccessToken, refreshToken, handleSignOut, login }
}
