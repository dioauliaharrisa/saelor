import Cookies from 'js-cookie'
import { GET_USER } from '../gql/queries/GetUser'
import { REFRESH_TOKEN } from '../gql/mutations/RefreshToken'
import { useRouter } from 'vue-router'
export const useAuth = () => {
  const router = useRouter()

  const refreshToken = ref('')
  const accessToken = ref(null)
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

  onMounted(() => {
    if (import.meta.client) {
      refreshToken.value = localStorage.getItem('refreshToken')
      accessToken.value = Cookies.get('accessToken') || null
    }
  })

  // Handle sign-out
  const handleSignOut = () => {
    Cookies.remove('accessToken', { secure: true })
    Cookies.remove('refreshToken', { secure: true })
    accessToken.value = null
    refreshToken.value = null
    cartStore.resetUser()
    router.push('/login')
  }

  const refreshAccessToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken')
      if (!storedRefreshToken) {
        console.warn('No refresh token')
        return
      }

      const { data } = await refreshTokenMutation({
        refreshToken: storedRefreshToken
      })
      console.log('🦆 ~ refreshAccessToken ~ data:', data)

      if (data?.tokenRefresh?.token) {
        // Update token in cookies and reactive state
        Cookies.set('accessToken', data.tokenRefresh.token, {
          expires: 1,
          secure: true
        })
        accessToken.value = data.tokenRefresh.token

        // Refetch user with new token
        const fetchedUser = await refetchUser()
        console.log('🦆 ~ refreshAccessToken ~ fetchedUser:', fetchedUser)
        console.log('🦆 ~ refreshAccessToken ~ userResult:', userResult)
        // console.log('🦆 ~ refreshAccessToken ~ error:', error)

        cartStore.user = fetchedUser.me
      }
    } catch (error) {
      console.error('Failed to refresh token:', error)
    }
  }

  // Watch for changes in the query result
  watch(userResult, (newValue) => {
    if (newValue?.me) {
      // Also update in cart store if needed
      cartStore.user = newValue.me
    }
  })

  watchEffect(() => {
    if (accessToken.value) {
      refetchUser()
    }
  })

  return { accessToken, refreshAccessToken, refreshToken, handleSignOut }
}
