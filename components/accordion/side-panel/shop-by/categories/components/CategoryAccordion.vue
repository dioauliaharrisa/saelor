<script setup lang="ts">
  defineProps({
    category: {
      type: Object,
      default: () => ({ node: { name: '', id: '', children: { edges: [] } } })
    }
  })
  const router = useRouter()
  const useStore = useCartStore()
  const handleClick = (category) => {
    useStore.breadcrumb = category.node.name
    router.push(`/category/${category.node.id}`)
  }
</script>

<template>
  <Accordion
    v-if="category.node.children?.edges.length > 0"
    :value="[0]"
    multiple
  >
    <AccordionPanel :value="category.node.id">
      <AccordionHeader>{{ category.node.name }}</AccordionHeader>
      <AccordionContent>
        <CategoryAccordion
          v-for="subCategory in category.node.children.edges"
          :key="subCategory.node.id"
          :category="subCategory"
        />
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
  <p v-else class="text" @click="handleClick(category)">
    {{ category.node.name }}
  </p>
</template>

<style>
  .text {
    padding: 1rem 1.2rem;
    font-size: 1rem;
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  .text:hover {
    background-color: var(--secondary-color);
  }
</style>
