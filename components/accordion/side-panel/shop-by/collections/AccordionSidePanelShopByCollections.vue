<script setup>
  const { onClose } = defineProps({
    onClose: {
      type: Function,
      required: false,
      default: undefined
    }
  })
  const collections = useCollections()
  const dataCollections = computed(() => collections.collections?.value || [])
  const useStore = useCartStore()
  const router = useRouter()
  const handleClick = (collection) => {
    useStore.breadcrumb = collection.node.name
    router.push(`/collections/${collection.node.id}`)
    onClose?.()
  }
</script>

<template>
  <Accordion :value="[0]" multiple>
    <AccordionPanel>
      <AccordionHeader>Collections</AccordionHeader>
      <AccordionContent>
        <p
          v-for="collection in dataCollections"
          :key="collection.node?.id"
          :value="collection.node?.id"
          style="cursor: pointer"
          class="j-accordion-text"
          @click="handleClick(collection)"

        >
          {{ collection.node?.name }}
        </p>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
