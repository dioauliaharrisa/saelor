<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function navigateToHome() {
    router.push({ path: '/' })
  }
  function navigateToCart() {
    router.push({ path: '/cart' })
  }
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
      <div class="icons">
        <Icon
          name="material-symbols:person"
          style="color: white; font-size: 15px"
        />
        <p style="color: white; font-size: xx-small">Sign In</p>
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
