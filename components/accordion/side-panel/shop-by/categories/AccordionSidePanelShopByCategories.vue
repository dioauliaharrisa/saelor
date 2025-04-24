<script setup lang="ts">
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
          v-for="category in dataCategories"
          :key="category.node.id"
          :category="category"
        />
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
