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

  const isBelowDesktop = breakpoints.smaller('laptop')
  const isDrawerVisible = ref(false)
</script>

<template>
  <div class="wrapper">
    <DrawerFilters v-model:visible="isDrawerVisible" style="width: 100%" />

    <div class="header-left-part">
      <Button
        style="width: 40px; height: 40px; padding: 0"
        class="button-drawer"
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
          v-if="user"
          label="Account"
          severity="secondary"
          @click="router.push({ path: '/account' })"
        />
      </div>
    </Drawer>
  </div>
</template>

<style scoped>
  .button-drawer {
    background-color: var(--primary-color);
  }
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

    display: grid;
    grid-template-areas: 'left middle right';
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    gap: 1rem;

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
    grid-area: left;

    cursor: pointer;

    display: grid;
    grid-template-columns: 1fr 5fr;
    align-items: center;
  }
  .header-middle-part {
    grid-area: middle;
  }
  .header-right-part {
    grid-area: right;
  }

  .header-left-part > img {
    /* max-width: 100%; */
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
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      grid-template-areas:
        'top-left top-right'
        'header header';
    }

    .header-left-part {
      grid-area: top-left;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .header-middle-part {
      grid-area: header;
    }

    .header-right-part {
      grid-area: top-right;
      justify-self: end;
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
  }
</style>
