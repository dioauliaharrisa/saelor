<template>
  <Form
    v-slot="$form"
    :initialValues="data"
    :resolver="currentResolver"
    @submit="onFormSubmit"
    :key="formKey"
  >
    <div
      v-for="(item, index) in data.inquiry || []"
      :key="index"
      class="flex flex-col gap-1"
    >
      Inquiry Product {{ index + 1 }}
      <InputText
        :name="`inquiry.[${index}].make`"
        type="text"
        placeholder="Make"
        fluid
      />
      <InputText
        :name="`inquiry.[${index}].model`"
        type="text"
        placeholder="Model"
        fluid
      />
      <InputText
        :name="`inquiry.[${index}].modelPartNumber`"
        type="text"
        placeholder="Model Part Number"
        fluid
      />
      <!-- <Button
        type="button"
        severity="danger"
        label="Delete"
        @click="removeFormGroup(index)"
      /> -->
    </div>
    <Button
      type="button"
      severity="info"
      label="Add Inquiry Product"
      @click="addFormGroup"
    />
    <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>

<script setup>
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  // Initialize fields with one set of fields

  const data = ref({
    inquiry: [
      { make: '123', model: '', modelPartNumber: '' },
      { make: '', model: '', modelPartNumber: '' }
    ]
  })

  // Function to add a new form group
  const addFormGroup = () => {
    data.value.inquiry.push({ make: '', model: '' })
  }

  // Function to remove a form group
  // const removeFormGroup = (index) => {
  //   data.value.splice(index, 1)
  // }

  // Handle form submission
  const onFormSubmit = (validationObject) => {
    if (validationObject.valid) {
      console.log('🦆 ~ onFormSubmit ~ validationObject:', validationObject)
    }
  }
</script>

<style scoped></style>
