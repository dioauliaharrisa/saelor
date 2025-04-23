<script setup lang="ts">
  const router = useRouter()
  const collections = useCollections()
  const categories = useCategories()

  const dataCollections = reactive(collections.data)
  const dataCategories = reactive(categories.data)

  const useStore = useCartStore()

  const handleClick = (collection) => {
    console.log('🦆 ~ handleClick ~ collection:', collection)
    useStore.breadcrumb = collection.node.name
    router.push(`/collections/${collection.node.id}`)
  }
</script>

<template>
  <Accordion multiple>
    <template #expandicon></template>
    <template #collapseicon></template>
    <AccordionTab>
      <template #expandicon></template>
      <template #header>
        <div style="display: flex; justify-content: space-between; width: 100%">
          <span>Collections</span>
          <div
            style="
              width: 100%;
              max-width: 50px;
              display: flex;
              justify-content: center;
            "
          >
            <Icon @click.stop="handleClick" name="material-symbols:home" />
          </div>
        </div>
      </template>
      <Accordion multiple>
        <template #expandicon></template>
        <template #collapseicon></template>
        <AccordionContent>
          <div
            v-for="collection in dataCollections"
            :key="collection.node.id"
            style="display: flex; padding: 1rem 2rem; gap: 0.5rem"
          >
            <p @click="handleClick(collection)" style="cursor: pointer">
              {{ collection.node.name }}
            </p>
          </div>
        </AccordionContent>
      </Accordion>
    </AccordionTab>

    <AccordionTab header="Categories">
      <Accordion multiple>
        <template #expandicon></template>
        <template #collapseicon></template>
        <template v-for="category in dataCategories" :key="category.node.id">
          <AccordionTab :header="category.node.name">
            <Accordion multiple>
              <template #expandicon></template>
              <template #collapseicon></template>
              <template
                v-for="subCategory in category.node.children.edges"
                :key="subCategory?.node?.id"
              >
                <AccordionTab :header="subCategory.node?.name">
                  <Accordion multiple>
                    <template #expandicon></template>
                    <template #collapseicon></template>
                    <template
                      v-for="subSubCategory in subCategory.node.children.edges"
                      :key="subSubCategory?.node?.id"
                    >
                      <AccordionTab :header="subSubCategory.node.name">
                        <pre>
                      {{ subSubCategory }}
                      </pre
                        >
                      </AccordionTab>
                    </template>
                  </Accordion>
                </AccordionTab>
              </template>
            </Accordion>
          </AccordionTab>
        </template>
      </Accordion>
    </AccordionTab>
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
