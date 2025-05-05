<script setup lang="ts">
  const { onClose } = defineProps({
    category: {
      type: Object,
      default: () => ({ node: { name: '', id: '', children: { edges: [] } } })
    },
    onClose: {
      type: Function,
      required: false,
      default: undefined
    }
  })
  const router = useRouter()
  // const useStore = useCartStore()
  const handleClick = (category) => {
    // useStore.breadcrumb = category.node.name
    router.push(`/category/${category.node.id}`)
    onClose?.()
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
  <p v-else class="j-accordion-text" @click="handleClick(category)">
    {{ category.node.name }}
  </p>
</template>
