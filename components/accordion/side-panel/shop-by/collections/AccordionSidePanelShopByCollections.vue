<script setup>
  const collections = useCollections()
  const dataCollections = computed(() => collections.data?.value || [])
  const handleClick = (collection) => {
    useStore.breadcrumb = collection.node.name
    router.push(`/collections/${collection.node.id}`)
  }
</script>

<template>
  <Accordion v-if="dataCollections.length" :value="[0]" multiple>
    <AccordionPanel
      v-for="collection in dataCollections"
      :key="collection.node?.id"
      :value="collection.node?.id"
    >
      <AccordionContent>
        <p @click="handleClick(collection)" style="cursor: pointer">
          {{ collection.node?.name }}
        </p>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
