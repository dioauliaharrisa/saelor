<script setup lang="ts">
  // import {
  //   AccordionContent,
  //   AccordionHeader,
  //   AccordionItem,
  //   AccordionRoot,
  //   AccordionTrigger
  // } from 'reka-ui'
  // const { categories, selectedCategory, categoryHeader } = useCategories()
  const categories = useCategories()
  // const collections = useCollections()
  // const handleClick = (category) => {
  //   if (!category?.node?.children?.totalCount) return
  //   categories.selectedCategory.value = category?.node?.id
  // }
  const handleBack = () => {
    categories.selectedCategory.value = null
  }

  const router = useRouter()
</script>

<template>
  <div>
    <p @click="handleBack">Back</p>
    <AccordionRoot
      class="AccordionRoot"
      type="multiple"
      collapsible
      defaultValue=""
    >
      <AccordionItem
        v-for="category in categories.data.value"
        :key="category.value"
        class="AccordionItem"
        :value="category?.node?.id"
      >
        <AccordionHeader class="AccordionHeader">
          <AccordionTrigger class="AccordionTrigger">
            <span>{{ category.node.name }}</span>
          </AccordionTrigger>
          <div
            class="AccordionHeaderCTA"
            @click="router.push(`/category/${category.node.id})`)"
          >
            -->
          </div>
        </AccordionHeader>
        <template
          v-for="subCategory in category?.node?.children?.edges"
          :key="subCategory.id"
        >
          <AccordionContent class="AccordionContent">
            <div class="AccordionContentText">
              {{ subCategory?.node?.name }}
            </div>
            <div
              class="AccordionContentCTA"
              @click="router.push(`/category/${subCategory.node.id})`)"
            >
              -->
            </div>
          </AccordionContent>
        </template>
      </AccordionItem>
    </AccordionRoot>
  </div>
</template>

<style scoped>
  .custom-accordion-header {
    background-color: #f0f0f0;
    padding: 1rem;
    cursor: pointer;
  }
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

  button,
  h3 {
    all: unset;
  }

  .AccordionRoot {
    border-radius: 6px;
    width: 300px;
    background-color: #eeeeee;
    box-shadow: 0 2px 10px var(--black-a4);
    border: solid 1.5px gray;
  }

  .AccordionItem {
    overflow: hidden;
    margin-top: 1px;
  }

  .AccordionItem:first-child {
    margin-top: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .AccordionItem:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .AccordionItem:focus-within {
    position: relative;
    z-index: 1;
    box-shadow: 0 0 0 2px var(--mauve-12);
  }

  .AccordionHeader {
    display: flex;
  }

  .AccordionTrigger {
    font-family: inherit;
    background-color: transparent;
    padding: 0 20px;
    height: 45px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    line-height: 1;
    color: var(--grass-11);
    box-shadow: 0 1px 0 var(--mauve-6);
    background-color: white;
  }

  .AccordionTrigger:hover {
  }

  .AccordionContent {
    overflow: hidden;
    font-size: 15px;
    justify-content: space-between;
    align-items: stretch;

    display: flex;
  }

  .AccordionContent[data-state='open'] {
    animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
  .AccordionContent[data-state='closed'] {
    animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  .AccordionContentText {
    flex: 1;
    padding: 15px 40px;
  }
  .AccordionContentCTA {
    background-color: black;
    color: white;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .AccordionHeaderCTA {
    display: none;
  }
  .AccordionHeader:hover .AccordionHeaderCTA {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    color: white;
    width: 40px;
    visibility: visible;
    cursor: pointer;
  }

  .AccordionChevron {
    color: var(--grass-10);
    transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
  .AccordionTrigger[data-state='open'] > .AccordionChevron {
    transform: rotate(180deg);
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--reka-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--reka-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
</style>
