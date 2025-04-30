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

  const breakpoints = useBreakpoints({
    mobile: 0,
    mobileLarge: 425,
    tablet: 768,
    laptop: 1024,
    desktop: 1440
  })

  const isBelowDesktop = breakpoints.smaller('desktop')
  const isDrawerVisible = ref(false)
</script>

<template>
  <div class="wrapper">
    <DrawerFilters v-model:visible="isDrawerVisible" style="width: 100%" />

    <div class="header-left-part">
      <Button
        v-if="isBelowDesktop"
        style="width: 40px; height: 40px; padding: 0"
        @click="isDrawerVisible = !isDrawerVisible"
      >
        <template #icon>
          <Icon
            name="material-symbols:list-alt-outline-sharp"
            class="icon"
            style="color: white"
          />
        </template>
      </Button>
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
        <Button
          label="Account"
          variant="link"
          @click="router.push({ path: '/account' })"
          style="max-width: 4rem"
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
    position: sticky;
    top: 0;
    z-index: 90;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    background-color: white;
    gap: 1rem;
    padding: 0 4rem;

    min-height: 150px;
  }

  .mobile_top_part {
    display: flex;
    gap: 2rem;
    width: 100%;
  }

  .header-left-part {
    /* flex: 1; */
    cursor: pointer;
  }

  .header-left-part > img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .header_middle_part {
    flex: 7;
    width: 100%;
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
    .mobile_top_part {
      display: flex;
      gap: 1rem;
      width: 100%;
    }
    .wrapper {
      padding: 0.5rem 2rem;
      /* flex-direction: column; */
      align-items: center;
      gap: 1.5rem;
    }

    .header-left-part {
      flex: 1;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
    }
    .header-left-part > img {
      max-width: 100px;
    }

    .header-middle-part {
      flex: 1;
      margin-top: 1rem;
    }

    .header-right-part {
      width: 100%;
      justify-content: center;
      gap: 1rem;
    }

    .icon {
      font-size: 3rem;
    }

    .icons p {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .icon {
      font-size: 20px;
    }
    .wrapper {
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem 1rem;
      gap: 1rem;
    }

    .header-left-part,
    .header-middle-part,
    .header-right-part {
      width: 100%; /* <== Full width per row */
      justify-content: center;
    }

    .header-right-part {
      flex-direction: column; /* <== Stack icons/buttons vertically */
      align-items: center;
      order: 0;
    }
  }
</style>
