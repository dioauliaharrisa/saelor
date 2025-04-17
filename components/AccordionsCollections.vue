<script setup lang="ts">
  const router = useRouter()
  const collections = useCollections()
  const categories = useCategories()

  const data = collections.data
  const dataCategories = categories.data
  const useStore = useCartStore()

  const handleClick = (collection) => {
    useStore.breadcrumb = collection.node.name
    router.push(`/collections/${collection.node.id}`)
  }
</script>

<template>
  <Accordion multiple>
    <AccordionTab header="Outer Tab 1">
      <Accordion multiple>
        <AccordionTab header="Inner Tab 1">Content of Inner Tab 1</AccordionTab>
        <AccordionTab header="Inner Tab 2">Content of Inner Tab 2</AccordionTab>
      </Accordion>
    </AccordionTab>

    <AccordionTab header="Outer Tab 2">Content of Outer Tab 2</AccordionTab>
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
    padding-left: 1rem; /* Add padding to indent child items */
    border-bottom: 1px solid lightgray;
    display: flex;
    align-items: center;
    height: 3rem;
    cursor: pointer;
  }

  :deep(.p-accordioncontent-content) {
    padding: 0;
  }

  /* Style nested accordions */
  :deep(.p-accordion .p-accordion) {
    margin-left: 1rem;
    border-left: 2px solid #e0e0e0;
    padding-left: 0.5rem;
  }
  :deep(.p-accordion-header) {
    padding: 0.5rem 1rem;
  }
</style>
