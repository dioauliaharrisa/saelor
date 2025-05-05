<script setup lang="ts">
  const { onClose } = defineProps({
    onClose: {
      type: Function,
      required: false,
      default: undefined
    }
  })
  import CategoryAccordion from './components/CategoryAccordion.vue'
  const categories = useCategories()
  const dataCategories = reactive(categories.data)
</script>

<template>
  <Accordion :value="[0]" multiple>
    <AccordionPanel value="0">
      <AccordionHeader>Categories</AccordionHeader>
      <AccordionContent>
        <CategoryAccordion
          :onClose="onClose"
          v-for="category in dataCategories"
          :key="category.node.id"
          :category="category"
        />
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
