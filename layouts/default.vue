<script setup></script>

<template>
  <div class="container">
    <PanelHeader></PanelHeader>
    <slot />
    <PanelFooter></PanelFooter>
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
</style>
