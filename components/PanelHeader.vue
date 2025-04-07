<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const visible = ref(false)

  const { handleSignOut, refreshAccessToken, refreshToken } = useAuth()

  const cartStore = useCartStore()
  const { user } = storeToRefs(cartStore)

  onMounted(async () => {
    if (refreshToken.value && !user.value) {
      await refreshAccessToken()
    }
  })
</script>

<template>
  <div class="wrapper">
    <div class="header-left-part">
      <img
        src="/Logo_Jayben.svg"
        alt="Logo Jayben"
        @click="router.push({ path: '/' })"
      />
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
      <div class="icons" @click="router.push({ path: '/cart' })">
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
          label="Sign out"
          @click="handleSignOut"
        />
        <Button
          v-if="user"
          id="button-sign-out"
          severity="secondary"
          label="Change Password"
          @click="router.push({ path: '/change-password' })"
        />
      </div>
    </Drawer>
  </div>
</template>

<style scoped>
  #button-sign-in {
    background-color: var(--primary-color);
    color: white;
    grid-column: span 2;
    justify-self: center;
    border: none;
  }
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
    background-color: var(--primary-color);
    padding: 0.5rem 6rem;
    gap: 1rem;
  }

  .header-left-part {
    width: 10%;
    display: flex;
    align-items: center;
    cursor: pointer;
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
