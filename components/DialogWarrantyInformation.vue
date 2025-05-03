<script setup>
  import RichTextRenderer from '../components/RichTextRenderer.vue'
  import { GET_PAGES } from '../gql/queries/GetPages.ts'
  defineProps({
    visible: {
      type: Boolean,
      required: true
    }
  })
  const variables = {
    channel: 'australia-direct-sales'
  }
  const { data } = await useAsyncQuery(GET_PAGES, variables)
  const pages = computed(() => data?.value?.pages?.edges || [])
  const warranty = computed(() =>
    pages.value.find((page) => {
      return page?.node?.title === 'Warranty' || null
    })
  )

  const parsedContent = computed(() => {
    try {
      const raw = warranty?.value?.node?.content
      return raw ? JSON.parse(raw) : null
    } catch (e) {
      console.error('Failed to parse warranty content:', e)
      return null
    }
  })
  const emit = defineEmits(['update:visible'])
</script>

<template>
  <Dialog
    modal
    :closable="false"
    :dismissable-mask="true"
    :visible="visible"
    style="width: 100%; padding: 0"
    :style="{ width: '65vw', borderRadius: '0px' }"
    @update:visible="emit('update:visible', $event)"
  >
    <template #header>
      <div style="width: 100%; padding: 0">
        <p id="warranty-information-title">Warranty Information</p>
        <hr id="divider-title" />
      </div>
    </template>

    <pre>{{ warranty?.value?.node?.content }}</pre>
    <div v-html="warranty?.value?.node?.content?.blocks?.[0]?.data?.text"></div>
    <!-- <RichTextRenderer
      v-if="warranty?.value?.node?.content"
      :content="JSON.parse(warranty?.value?.node?.content)"
      :font-size="'.75rem'"
    /> -->
    <RichTextRenderer
      v-if="parsedContent?.blocks?.length"
      :content="parsedContent"
      :font-size="'.75rem'"
    />
  </Dialog>
</template>

<style scoped>
  #divider-title {
    background-color: yellow;
    width: 100%;
    height: 0.2rem;
    border-radius: 5px;
    border: none;
    margin: 0; /* Remove any default margin */
    padding: 0;
  }
  .icons {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.2rem;
    gap: 0.5rem;
  }
  .icons:hover {
    cursor: pointer;
  }
  .icons > p {
    text-transform: uppercase;
  }
 

  #divider-content {
    background-color: black;
    width: 100%;
    height: 0.01rem;
  }
  #warranty-information-title {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
  }
  #contact-us {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
  }
  #warranty-information-content {
    font-size: 0.75rem;
  }
</style>
