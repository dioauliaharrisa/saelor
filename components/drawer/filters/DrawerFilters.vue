<script setup>
  defineProps({
    visible: {
      type: Boolean,
      required: true
    }
  })
  const emit = defineEmits(['update:visible'])
  const handleClose = () => emit('update:visible', false)
</script>

<template>
  <Drawer
    :visible="visible"
    :header="`Hi there!`"
    @update:visible="emit('update:visible', $event)"
  >
    <!-- class="drawer" -->
    <CardFilters :onClose="handleClose" />
  </Drawer>
</template>

<style scoped>
  :deep(.p-drawer-left > .p-drawer) {
    width: 50% !important;
    max-width: 40% !important;
  }
  @media (max-width: 425px) {
    .drawer {
      max-width: 100%;
    }
  }
</style>
