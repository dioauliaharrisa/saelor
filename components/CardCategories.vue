<script setup>
  defineProps({
    category: Object
  })
  const router = useRouter()
</script>

<template>
  <div
    class="container"
    @click="router.push(`/category/${category.node.id}`)"
  >
    <img :src="category?.node?.backgroundImage?.url" />
    <p>{{ category?.node?.name }}</p>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: space-between;

    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    background-color: white;
    max-height: 150px;

    cursor: pointer;
  }
  .container img {
    display: block;
    height: 100%;
    max-width: 100px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 5px;

    -webkit-mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0)
    );
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
  p {
    font-size: x-large;
    font-weight: 600;
    align-self: flex-end;
    text-align: end;
    padding: 0.5rem;
  }
</style>
