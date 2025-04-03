<script setup>
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { GET_USER } from '../gql/queries/GetUser.ts'
  import { REFRESH_TOKEN } from '../gql/mutations/RefreshToken.ts'
  import Cookies from 'js-cookie'
  import { useQuery, useMutation } from '@vue/apollo-composable'

  const router = useRouter()
  const refreshToken = ref(Cookies.get('refreshToken'))
  const accessToken = ref(Cookies.get('accessToken')) // Keep token reference
  const user = ref(null) // Make user reactive
  const visible = ref(false)

  const cartStore = useCartStore()

  // Initialize query at top level with proper token handling
  const { result: userResult, refetch: refetchUser } = useQuery(
    GET_USER,
    null,
    {
      context: {
        headers: {
          Authorization: accessToken.value ? `Bearer ${accessToken.value}` : ''
        }
      },
      skip: !accessToken.value // Skip if no token
    }
  )

  // Watch for changes in the query result
  watch(userResult, (newValue) => {
    if (newValue?.me) {
      user.value = newValue.me
      // Also update in cart store if needed
      cartStore.user = newValue.me
    }
  })

  const { mutate: refreshTokenMutation } = useMutation(REFRESH_TOKEN)

  const refreshAccessToken = async () => {
    try {
      if (!refreshToken.value) {
        console.warn('No refresh token available')
        return
      }

      const { data } = await refreshTokenMutation({
        refreshToken: refreshToken.value
      })

      if (data?.tokenRefresh?.token) {
        // Update token in cookies and reactive state
        Cookies.set('accessToken', data.tokenRefresh.token, {
          expires: 1,
          secure: true
        })
        accessToken.value = data.tokenRefresh.token

        // Refetch user with new token
        await refetchUser({
          context: {
            headers: {
              Authorization: `Bearer ${data.tokenRefresh.token}`
            }
          }
        })
      }
    } catch (error) {
      console.error('Failed to refresh token:', error)
    }
  }

  onMounted(async () => {
    if (refreshToken.value && !user.value) {
      await refreshAccessToken()
    }
  })

  // Rest of your component code...
</script>

<template>
  <div class="wrapper">
    <div class="header-left-part">
      <img src="/Logo_Jayben.svg" alt="Logo Jayben" @click="navigateToHome" />
    </div>
    <div class="header-middle-part">
      <SearchBar />
    </div>
    <div class="header-right-part">
      <div class="icons">
        <Icon
          name="material-symbols:android-emergency-location-service"
          style="color: white; font-size: 15px"
        />

        <p style="color: white; font-size: xx-small">Select Store</p>
      </div>
      <div class="icons" @click="visible = true">
        <Icon
          name="material-symbols:person"
          style="color: white; font-size: 15px"
        />
        <p v-if="user" style="color: white; font-size: xx-small">
          {{ user.firstName }}
        </p>
      </div>
      <div class="icons">
        <Icon
          name="fa6-solid:boxes-stacked"
          style="color: white; font-size: 15px"
        />
      </div>
      <div class="icons" @click="navigateToCart">
        <Icon
          name="material-symbols:shopping-cart-rounded"
          style="color: white; font-size: 15px"
        />
      </div>
    </div>
    <Drawer
      v-model:visible="visible"
      :header="`Hi ${user?.firstName ?? 'User'}`"
    >
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <Button
          v-if="!user"
          id="button-sign-in"
          severity="primary"
          label="Sign In"
          @click="router.push({ path: '/login' })"
        />
        <Button
          v-if="!user"
          id="button-register"
          severity="secondary"
          label="Register"
          @click="router.push({ path: '/register' })"
        />
        <Button
          v-if="user"
          id="button-sign-out"
          severity="secondary"
          label="Register"
          @click="router.push({ path: '/register' })"
        />
      </div>
    </Drawer>
  </div>
</template>

<style scoped>
  .icons {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.2rem;
  }
  .icons:hover {
    background-color: gray;
    cursor: pointer;
  }
  .wrapper {
    display: flex;
    align-items: center;

    width: 100%;
    background-color: black;
    padding: 0.5rem 6rem;
    gap: 1rem;
  }

  .header-left-part {
    width: 10%;
    display: flex;
    align-items: center;
  }

  .header-left-part > img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .header-middle-part {
    flex: 1;
  }

  .header-right-part {
    width: 25%;
    display: flex;
    align-items: center;
    text-wrap: nowrap;
    gap: 0.5rem;
  }
</style>
