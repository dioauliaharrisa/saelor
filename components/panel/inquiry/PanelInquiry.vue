<script setup>
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  const value = ref(null)
  const items = ref([])
  const qModel = ref(null)
  const filteredModels = ref([])

  const products = useProducts()

  const makes = computed(
    () =>
      products.attributes?.value?.attributes?.edges.find((item) => {
        console.log(
          '🦆 ~ products.attributes?.value?.attributes?.edges.find ~ item:',
          item
        )
        return item.node.name === 'Compatible Make'
      })?.node?.choices?.edges || []
  )

  const models = computed(
    () =>
      products.attributes?.value?.attributes?.edges.find((item) => {
        return item.node.name === 'Compatible Models'
      })?.node?.choices?.edges || []
  )

  const search = (event) => {
    const query = event.query.toLowerCase() // Get the user's input
    console.log('🦆 ~ search ~ query:', makes.value)
    items.value = makes.value?.filter((make) => {
      console.log(
        '🦆 ~ items.value=makes.value.node?.filter ~ make:',
        make.node.name,
        query
      )
      return make.node.name.toLowerCase().includes(query)
    })
  }
  const searchModels = (event) => {
    const query = event.query.toLowerCase()

    filteredModels.value = models.value?.filter((model) => {
      console.log(
        '🦆 ~ items.value=models.value.node?.filter ~ model:',
        model.node.name,
        query
      )
      return model.node.name.toLowerCase().includes(query)
    })
  }

  const initialValues = ref({
    makes: '',
    models: ''
  })
  const resolver = ref(
    zodResolver(
      z.object({
        makes: z.string().min(1, 'Make is required'),
        models: z.string().min(1, 'Model is required')
      })
    )
  )

  const onFormSubmit = ({ valid }) => {
    console.log('🦆 ~ onFormSubmit ~ valid:', valid)
    if (valid) {
      generatePDFInquiredProducts({})
    }
  }
</script>

<template>
  <div class="container">
    <Form
      v-slot="$form"
      :resolver="resolver"
      :initialValues="initialValues"
      @submit="onFormSubmit"
      style="display: flex; flex-direction: column; gap: 2rem"
    >
      <FloatLabel variant="in">
        <AutoComplete
          id="compatible-make"
          v-model="value"
          :suggestions="items"
          option-label="node.name"
          @complete="search"
        />
        <label for="compatible-make">Compatible Make</label>
      </FloatLabel>
      <FloatLabel variant="in">
        <AutoComplete
          id="compatible-model"
          v-model="qModel"
          :suggestions="filteredModels"
          option-label="node.name"
          @complete="searchModels"
        />
        <label for="compatible-model">Compatible Model</label>
      </FloatLabel>
      <FloatLabel variant="in">
        <AutoComplete
          id="part-numbers"
          v-model="qModel"
          :suggestions="filteredModels"
          option-label="node.name"
          @complete="searchModels"
        />
        <label for="part-numbers">Model Part Numbers</label>
      </FloatLabel>
      <FloatLabel variant="in">
        <AutoComplete
          id="compatible-model"
          v-model="qModel"
          :suggestions="filteredModels"
          option-label="node.name"
          @complete="searchModels"
        />
        <label for="compatible-model">Compatible Model</label>
      </FloatLabel>
      <Button id="button-get-pdf" type="submit" label="Get PDF" />
      <!-- :loading="loading" -->
    </Form>
  </div>
</template>

<style scoped>
  .container {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid #ddd;
    /* border-radius: 8px; */

    background-color: #ffffff;
    min-width: 300px;

    padding: 2rem;
  }
</style>
