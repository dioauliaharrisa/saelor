// import Cookies from 'js-cookie'
import { GET_USER } from '../gql/queries/GetUser'
import { LOG_IN } from '../gql/mutations/LogIn'
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

  const { mutate: mutationLogin } = useMutation(LOG_IN)

  const login = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    const { data } = await mutationLogin({ email, password })

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
    cartStore.resetCart()
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

      if (data?.tokenRefresh?.token) {
        const token = data.tokenRefresh.token
        localStorage.setItem('accessToken', token)
        accessToken.value = token

        // Refetch user with new token
        const fetchedUser = await refetchUser()

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
