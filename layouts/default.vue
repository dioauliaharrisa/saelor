<script setup></script>

<template>
  <div class="container">
    <PanelHeader></PanelHeader>
    <slot />
    <PanelFooter></PanelFooter>
    <button class="floating-button" @click="handleClick">+</button>
  </div>
</template>

<style scoped>
  .container {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;
    box-sizing: border-box;
  }

  .floating-button {
    position: fixed; /* Ensures the button stays in the same position on the screen */
    bottom: 20px; /* Distance from the bottom of the screen */
    right: 20px; /* Distance from the right of the screen */
    width: 60px; /* Width of the button */
    height: 60px; /* Height of the button */
    border-radius: 50%; /* Makes the button circular */
    background-color: var(--primary-color); /* Use your primary color */
    color: white;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000; /* Ensures it stays above other elements */
    transition: transform 0.2s ease-in-out;
  }
</style>
