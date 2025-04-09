<script setup>
  const categories = useCategories()
  const collections = useCollections()
</script>

<template>
  <Accordion value="0">
    <AccordionPanel value="0">
      <AccordionHeader>Category</AccordionHeader>
      <AccordionContent>
        <div
          v-for="category in categories"
          :key="category.id"
          class="accordion_category"
        >
          <div class="accordion_title">
            <div class="accordion-hover-indicator"></div>
            <p>
              {{ category?.node?.name }}
            </p>
            <Icon
              name="material-symbols:chevron-right-rounded"
              style="color: black; font-size: 25px"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel value="1">
      <AccordionHeader>Collections</AccordionHeader>
      <AccordionContent>
        <div
          v-for="collection in collections"
          :key="collection.id"
          class="accordion_category"
        >
          <div class="accordion_title">
            <div class="accordion-hover-indicator"></div>
            <p>
              {{ collection?.node?.name }}
            </p>
            <Icon
              name="material-symbols:chevron-right-rounded"
              style="color: black; font-size: 25px"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style scoped>
  .accordion_category {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .accordion_category p {
    font-size: small;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    margin-right: 8px;
    white-space: nowrap;
    line-height: 2;
  }
  .accordion-hover-indicator {
    width: 3px;
    height: 100%;
    background-color: transparent;
    transition: background-color 0.3s ease;
  }
  .accordion_category:hover .accordion-hover-indicator {
    background-color: black;
  }
  .accordion_title {
    height: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem 0;
    cursor: pointer;
    border-top: 0.5px solid black;
  }
  .accordion_title:not(:last-child) {
    border-bottom: 0.5px solid black;
  }
</style>
