<script setup>
  defineProps({})

  defineEmits(['click'])
  const email = ref('')
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :closable="false"
    :dismissableMask="true"
    style="width: 100%; padding: 0"
    :style="{ width: '65vw', borderRadius: '0px' }"
  >
    <template #header>
      <div style="width: 100%; padding: 0">
        <p id="warranty-information-title">Input your email here</p>
        <hr id="divider-title" />
      </div>
    </template>
    <InputText type="text" v-model="email" />
    <Button
      id="button-proceed-to-checkout"
      label="Send Purchase Order"
      @click="handleCheckoutViaStripe()"
    />
  </Dialog>
</template>
