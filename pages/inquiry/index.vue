<template>
  <Form
    v-slot="$form"
    :initialValues="data"
    :resolver="resolver"
    @submit="onFormSubmit"
    :key="formKey"
  >
    <div
      v-for="(item, index) in data.inquiry || []"
      :key="index"
      style="display: flex; flex-direction: column; gap: 1rem; width: 100%"
    >
      Inquiry Product {{ index + 1 }}

      <div style="display: flex; flex-direction: column; gap: 1rem">
        <InputText
          :name="`inquiry.[${index}].make`"
          type="text"
          placeholder="Make"
          fluid
        />
        <Message
          v-if="$form[`inquiry[${index}].make`]?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form[`inquiry[${index}].make`]?.error?.message }}
        </Message>
      </div>

      <!-- model -->
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <InputText
          :name="`inquiry.[${index}].model`"
          type="text"
          placeholder="Model"
          fluid
        />
        <Message
          v-if="$form[`inquiry[${index}].model`]?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form[`inquiry[${index}].model`]?.error?.message }}
        </Message>
      </div>

      <!-- modelPartNumber -->
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <InputText
          :name="`inquiry.[${index}].modelPartNumber`"
          type="text"
          placeholder="Model Part Number"
          fluid
        />
        <Message
          v-if="$form[`inquiry[${index}].modelPartNumber`]?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form[`inquiry[${index}].modelPartNumber`]?.error?.message }}
        </Message>
      </div>
      <Divider />
      <!-- <Button
        type="button"
        severity="danger"
        label="Delete"
        @click="removeFormGroup(index)"
      /> -->
    </div>
    <div
      style="
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        padding-top: 1rem;
      "
    >
      <Button
        fluid
        type="button"
        label="Add Inquiry Product"
        @click="addFormGroup"
      />
      <Button fluid type="submit" label="Submit" />
    </div>
  </Form>
</template>

<script setup>
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'

  const InquirySchema = z.object({
    make: z.string().min(1, 'Make is required'),
    model: z.string().min(1, 'Model is required'),
    modelPartNumber: z.string().min(1, 'Model Part Number is required')
  })

  const FormSchema = z.object({
    inquiry: z.array(InquirySchema).min(1)
  })

  const resolver = zodResolver(FormSchema)

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
  const onFormSubmit = async (validationObject) => {
    if (validationObject.valid) {
      await generatePDFInquiredProducts(validationObject.values.inquiry)
    }
  }
</script>

<style scoped></style>
