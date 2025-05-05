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
    style="width: 300px; max-width: 30%"
  >
    <CardFilters :onClose="handleClose" />
  </Drawer>
</template>
