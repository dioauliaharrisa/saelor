<script setup>
  defineProps({
    loading: Boolean
  })

  const route = useRoute()
  const categoryId = route.params.id

  const products = useProducts()
  const productTypes = computed(() => products.productTypes)
  const attributes = computed(() => products.attributes)
  console.log('🦆 ~ attributes:', attributes)
  const filters = products.filters

  onMounted(async () => {
    await products.refetchProductTypes({})
  })
</script>

<template>
  <div v-if="loading" class="container">
    <SkeletonCardProduct />
  </div>
  <div v-else class="container">
    <p>Types</p>
    <div
      v-for="productType of productTypes.value"
      :key="productType.node.id"
      style="display: flex; padding: 1rem 0; gap: 0.5rem"
    >
      <Checkbox
        v-model="filters.productTypes"
        :inputId="productType.node.id"
        name="product-type"
        :value="productType.node.id"
      />
      <label :for="productType.node.id">{{ productType.node.name }}</label>
    </div>

    <Accordion :value="[0]" multiple>
      <AccordionPanel value="0">
        <AccordionHeader>Attributes</AccordionHeader>
        <AccordionContent>
          <Accordion
            v-for="attribute in attributes.value.attributes.edges"
            :key="attribute.node.id"
            :value="[0]"
            multiple
          >
            <AccordionPanel value="0">
              <AccordionHeader>{{ attribute.node.name }}</AccordionHeader>
              <AccordionContent>
                <!-- <pre>{{ attribute.node }}</pre> -->
                <div
                  v-for="choice of attribute.node.choices.edges"
                  :key="choice.node.id"
                  style="display: flex; padding: 1rem 0; gap: 0.5rem"
                >
                  <Checkbox
                    :value="choice.node.id"
                    :inputId="choice.node.id"
                    :checked="
                      filters.attributes.some(
                        (attr) =>
                          attr.slug === attribute.node.slug &&
                          attr.values.includes(choice.node.slug)
                      )
                    "
                    @change="
                      products.toggleAttributeFilter(
                        attribute.node.slug,
                        choice.node.slug
                      )
                    "
                  />
                  <label :for="choice.node.id">
                    {{ choice.node.name }}
                  </label>
                </div>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>

    <button
      class="button_new"
      @click="
        products.refetchProducts({
          first: 8,
          filter: { ...toRaw(filters), categories: [categoryId] }
        })
      "
    >
      Filter
    </button>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid #ddd;
    border-radius: 8px;

    /* height: 300px; */
    max-width: 300px;

    padding: 1rem;
  }
</style>
