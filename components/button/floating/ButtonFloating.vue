<template>
  <button class="floating-button" >+</button>
</template>

<style scoped>
  .floating-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: var(--primary-color);
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
