<!-- components/RichTextRenderer.vue -->
<template>
  <div class="rich-text" :style="{ fontSize: fontSize }">
    <div v-for="block in parsedBlocks" :key="block.id" class="rich-text-block">
      <p v-if="block.type === 'paragraph'" v-html="block.data.text"></p>
      <!-- Add other block types as needed -->
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    content: {
      type: [String, Object],
      required: true
    },
    fontSize: {
      type: [String],
      default: '16px',
      required: true
    }
  })

  const parsedBlocks = computed(() => {
    try {
      const parsed =
        typeof props.content === 'string'
          ? JSON.parse(props.content)
          : props.content
      return parsed.blocks || []
    } catch {
      return []
    }
  })
</script>

<style scoped>
  .rich-text {
    line-height: 1.6;
  }

  .rich-text :deep(b) {
    font-weight: 600;

    color: var(--color-primary);
  }
</style>
