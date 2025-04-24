<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const visible = ref(false)

  const { handleSignOut, refreshAccessToken, refreshToken } = useAuth()

  const cartStore = useCartStore()
  const { user } = storeToRefs(cartStore)

  // to get the amount of items on the cart
  const { checkoutItems } = useCart()
  const data = computed(() => checkoutItems.value?.lines || [])

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
      <InputSearch />
    </div>

    <div class="header-right-part">
      <!-- <div class="icons">
        <Icon
          name="material-symbols:android-emergency-location-service"
          style="color: white; font-size: 15px"
        />

        <p style="color: white; font-size: xx-small">Select Store</p>
      </div> -->
      <div class="icons" @click="visible = true">
        <Icon name="material-symbols:person" class="icon" />
        <p v-if="user" style="color: var(--primary-color); font-size: medium">
          {{ user.firstName }}
        </p>
      </div>

      <div class="icons" @click="router.push({ path: '/cart' })">
        <Icon name="material-symbols:shopping-cart-rounded" class="icon" />

        <p v-if="user" style="color: var(--primary-color); font-size: medium">
          {{ data.length }} items
        </p>
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
    width: 100%;
    justify-content: center;
  }
  .icons:hover {
    background-color: var(--tertiary-color);
    cursor: pointer;
  }
  .icon {
    color: var(--primary-color);
    font-size: 35px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    background-color: white;
    gap: 1rem;
    padding: 0 4rem;

    min-height: 150px;
  }

  .header-left-part {
    flex: 1;
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
    flex: 6;
  }

  .header-right-part {
    flex: 1;
    display: flex;
    align-items: center;
    text-wrap: nowrap;
    gap: 0.5rem;
  }

  /* Responsive styles */
  @media (max-width: 1024px) {
    .wrapper {
      padding: 0.5rem 3rem;
    }

    .header-left-part {
      width: 15%;
    }

    .header-middle-part {
      flex: 2;
    }

    .header-right-part {
      width: 35%;
      gap: 1rem;
    }

    .icon {
      font-size: 30px;
    }
  }

  @media (max-width: 768px) {
    .wrapper {
      padding: 0.5rem 2rem;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .header-left-part {
      width: 100%;
      justify-content: center;
    }

    .header-middle-part {
      width: 100%;
      margin-top: 1rem;
    }

    .header-right-part {
      width: 100%;
      justify-content: center;
      gap: 1rem;
    }

    .icon {
      font-size: 25px;
    }

    .icons p {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .wrapper {
      padding: 0.5rem 1rem;
    }

    .header-left-part > img {
      max-width: 80%;
    }

    .icon {
      font-size: 20px;
    }

    .header-right-part {
      width: 100%;
      justify-content: space-between;
      gap: 0.5rem;
    }
  }
</style>
