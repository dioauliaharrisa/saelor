<script setup>
  const { onClose } = defineProps({
    loading: Boolean,
    onClose: {
      type: Function,
      required: false,
      default: undefined
    }
  })

  const route = useRoute()
  const categoryId = route.params.id

  const products = useProducts()

  const attributes = computed(
    () => products.attributes?.value?.attributes?.edges
  )
  console.log('🦆 ~ attributes:', products?.attributes)
  const filters = products.filters
  const applyFilters = async () => {
    await products.refetchProducts({
      first: 8,
      filter: {
        ...toRaw(filters),
        categories: categoryId ? [categoryId] : []
      }
    })
    onClose?.()
  }
  onMounted(async () => {
    await products.refetchProductTypes({})
  })
</script>

<template>
  <div v-if="loading" class="container">
    <SkeletonCardProduct />
  </div>
  <div v-else class="container">
    <Divider align="center" type="dotted">
      <b>Shop by</b>
    </Divider>
    <AccordionSidePanelShopByCollections />
    <AccordionSidePanelShopByCategories />
    <Divider align="center" type="dotted">
      <b>Filter</b>
    </Divider>
    <Accordion :value="[0]" multiple>
      <AccordionPanel value="0">
        <AccordionHeader>Attributes</AccordionHeader>
        <AccordionContent>
          <Accordion
            v-for="attribute in attributes"
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
    <AccordionSidePanelFilterType />
    <Divider />
    <Button class="button-apply-filter" @click="applyFilters">Filter</Button>
  </div>
</template>

<style scoped>
  .button-apply-filter {
    background-color: var(--primary-color);
  }
  .container {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid #ddd;
    /* border-radius: 8px; */

    background-color: #ffffff;
    min-width: 300px;

    padding: 1rem;
  }
</style>
