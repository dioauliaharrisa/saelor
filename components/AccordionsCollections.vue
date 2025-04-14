<script setup lang="ts">
  const router = useRouter()
  const collections = useCollections()

  const data = collections.data
  console.log('🦆 ~ data:', data)
</script>

<template>
  <!-- <pre>{{ collections }}</pre> -->
  <Accordion value="0" class="accordion">
    <AccordionPanel value="0">
      <AccordionHeader>Collections</AccordionHeader>
      <AccordionContent
        v-for="collection in data"
        :key="collection.node.id"
        class="accordion_content"
        @click="router.push(`/collections/${collection.node.id}`)"
      >
        <p style="font-size: small">{{ collection?.node?.name }}</p>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style scoped>
  .accordion {
    width: 100%;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    /* padding: 0 1rem; */
  }

  .accordion_content {
    padding: 0;
    border: solid 1px lightgray;
    display: flex;
    align-items: center;
    height: 3rem;
    /* justify-content: center; */
  }
  :deep(.p-accordioncontent-content) {
    padding: 0 1rem;
  }
</style>
