<script setup>
  defineProps({
    icon: {
      type: String,
      required: true
    },
    to: {
      type: String,
      default: '#' // Default to no navigation
    }
  })

  defineEmits(['click'])
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="icon_button" @click="$emit('click')">
    <Icon :name="icon" style="color: black; font-size: 25px" />
  </NuxtLink>
  <button v-else class="icon_button" @click="$emit('click')">
    <Icon :name="icon" style="color: black; font-size: 25px" />
  </button>
</template>

<style scoped>
  .icon_button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: #d3d3d3;
    padding: 8px;
    border-radius: 99px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .icon_button:hover {
    background-color: #a9a9a9;
  }
</style>
