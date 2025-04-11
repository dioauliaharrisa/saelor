<script setup lang="ts">
  // const { categories, selectedCategory, categoryHeader } = useCategories()
  const categories = useCategories()
  console.log('🦆 ~ categories:', categories)

  const collections = useCollections()
  const handleClick = (category) => {
    if (!category?.node?.children?.totalCount) return
    categories.selectedCategory.value = category?.node?.id
  }
  const handleBack = () => {
    console.log('🦆 ~ handleBack ~ handleBack:', handleBack)
    categories.selectedCategory.value = null
  }
</script>

<template>
  <div>
    <p @click="handleBack">Back</p>
    <Accordion :value="['0']" multiple>
      <AccordionPanel value="0">
        <AccordionHeader>
          <Icon
            v-if="categories.selectedCategory !== null"
            name="material-symbols:chevron-right-rounded"
            style="color: black; font-size: 25px"
          />
          <h3>
            {{ categories.categoryHeader.value || 'Category' }}
          </h3>
        </AccordionHeader>
        <AccordionContent>
          <div
            v-for="category in categories.categories.value"
            :key="category.id"
            class="accordion_category"
          >
            <div class="accordion_title">
              <div class="accordion-hover-indicator"></div>
              <p @click="handleClick(category)">
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
  </div>
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
