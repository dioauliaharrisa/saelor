<script setup>
  const collections = useCollections()
  const dataCollections = computed(() => collections.data?.value || [])
  const useStore = useCartStore()
  const router = useRouter()
  const handleClick = (collection) => {
    useStore.breadcrumb = collection.node.name
    router.push(`/collections/${collection.node.id}`)
  }
</script>

<template>
  <Accordion :value="[0]" multiple>
    <AccordionPanel>
      <AccordionHeader>Collections</AccordionHeader>
      <AccordionContent>
        <p
          @click="handleClick(collection)"
          style="cursor: pointer"
          v-for="collection in dataCollections"
          :key="collection.node?.id"
          :value="collection.node?.id"
          class="j-accordion-text"
        >
          {{ collection.node?.name }}
        </p>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
