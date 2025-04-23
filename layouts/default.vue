<script setup></script>

<template>
  <div class="container">
    <PanelHeader />
    <div class="box_content">
      <div style="display: flex; flex-direction: column; gap: 2rem">
        <AccordionsCategories />
        <AccordionsCollections />
        <CardFilters :loading="loading" />
      </div>
      <slot />
    </div>
    <PanelFooter />
    <ButtonFloating />
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
    width: 100vw;
  }
  .box_content {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    width: 100%;
    gap: 2rem;
    padding: 1rem;
  }
</style>
