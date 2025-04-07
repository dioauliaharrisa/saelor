<template>
  <div class="page">
    <!-- <div class="container-register">
      <div class="container-header"><p>Create Account</p></div>
      <Form
        v-slot="$form"
        :initial-values="initialValues"
        :resolver="resolver"
        class="container-content"
        @submit="onFormSubmit"
      >
        <div
          v-for="(field, index) in formFields"
          :key="index"
          class="form-input"
        >
          <InputText
            v-if="field.type !== 'password'"
            :name="field.name"
            :type="field.type"
            :placeholder="field.placeholder"
            fluid
          />
          <Password
            v-else
            :name="field.name"
            :placeholder="field.placeholder"
            :feedback="false"
            toggle-mask
            fluid
            input-class="form-control"
          />
          <Message
            v-if="$form[field.name]?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            <ul
              v-if="Array.isArray($form[field.name]?.errors)"
              class="my-0 px-4 flex flex-col gap-1"
            >
              <li
                v-for="(error, index) of $form[field.name].errors"
                :key="index"
              >
                {{ error.message }}
              </li>
            </ul>
            <span v-else>{{ $form[field.name].error.message }}</span>
          </Message>
        </div>
        <Button
          id="button-submit"
          type="submit"
          severity="secondary"
          label="Submit"
          :loading="loading"
        />
      </Form>
    </div> -->
  </div>
</template>
