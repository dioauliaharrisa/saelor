<script setup>
  const products = useProducts()
  const productTypes = computed(() => products.productTypes)
  const filters = products.filters
</script>

<template>
  <Accordion :value="[0]" multiple>
    <AccordionPanel value="0">
      <AccordionHeader>Types</AccordionHeader>
      <AccordionContent>
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
          <label :for="productType.node.id">
            {{ productType.node.name }}
          </label>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
