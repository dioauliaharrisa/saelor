<script setup>
  // const cart = useCartStore()
</script>

<template>
  <div class="page">
    <div class="container_title">
      <p class="title">Cart</p>
      <hr />
    </div>
    <div class="container_content">
      <div class="text-indicator-cart-items">
        <p class="title">Items in cart</p>
        <p class="title">0 items</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container_title {
    width: 100%;
  }
  hr {
    background-color: yellow;
    width: 100%;
    height: 0.2rem;
    border-radius: 5px;
    border: none;
  }
  .page {
    width: 100vw;
    padding: 0 8rem;
    overflow-x: hidden;
  }
  .title {
    font-weight: 700;
    font-size: x-large;
    margin-bottom: 0;
  }
  .text-indicator-cart-items {
    display: flex;
    gap: 1rem;
  }
</style>
