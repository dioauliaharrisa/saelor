<script setup>
import { ref } from "vue";

const showOverlay = ref(false);
</script>

<template>
  <div class="container">
    <Teleport to="body">
      <div v-if="showOverlay" class="overlay" @click="showOverlay = false">
        <div class="overlay-content" @click.stop>
          <div class="container_icon">
            <Icon
              name="solar:cart-4-bold"
              style="color: red; font-size: 4rem"
            />
          </div>
          <p style="font-size: 1.5rem; font-weight: 600">Your Cart is Empty</p>
          <p style="color: darkslategrey; font-size: 1rem; font-weight: 600">
            You haven't added any items to your cart yet.
          </p>
        </div>
      </div>
    </Teleport>
    <div class="wrapper">
      <div class="header_icon_buttons">
        <IconButton icon="fluent:home-12-filled" />
        <IconButton icon="tabler:category-filled" to="/categories" />
        <IconButton icon="tabler:category-filled" to="/categories" />
      </div>
      <div class="search_bar">
        <Icon
          name="material-symbols:search"
          style="color: black; font-size: 30px"
          class="search_bar_icon"
        />
        <input
          type="text"
          placeholder="Search..."
          class="input"
          @input="onInput"
        />
      </div>
      <div class="header_cart_button">
        <IconButton
          icon="solar:cart-4-bold"
          @click="
            console.log('IconButton clicked');
            showOverlay = !showOverlay;
            console.log('Overlay state:', showOverlay.value);
          "
        />
      </div>
    </div>
    <slot />
  </div>
</template>
<!-- v-model="searchQuery" -->
<style scoped>
.wrapper {
  width: 100%;
  display: flex;
}

.container_icon {
  width: 6rem;
  height: 6rem;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 99px;
  background-color: pink;
}

.header_icon_buttons {
  display: flex;
  gap: 1rem;
}

.container {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  margin: 0 3rem;
  box-sizing: border-box;
}

.search_bar {
  flex-grow: 1;
  max-width: 800px;
  position: relative;
  height: 40px;
}

.search_bar_icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: black;
}

.input {
  width: 100%;
  height: 40px;
  padding: 0 10px 0 45px;
  line-height: 40px;

  border: 1px solid lightgray;
  border-radius: 99px;

  background-color: lightgray;
}

.input::placeholder {
  opacity: 1;
  font-size: smaller;
  font-weight: 700;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  z-index: 666;
}

.overlay-content {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 3rem;
  width: 500px;
  height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
