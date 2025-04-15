<script setup lang="ts">
  const route = useRoute()
  const router = useRouter()

  const splittedRoute = route.path.split('/')

  const useStore = useCartStore()
  const breadcrumb = useStore.breadcrumb

  const isRouteEnd = (index: number) => {
    return index !== splittedRoute.length - 1 ? true : false
  }
</script>

<template>
  <div class="container-breadcrumb">
    <div v-for="(eachRoute, index) in splittedRoute" :key="index">
      <div v-if="!eachRoute" style="display: flex; align-items: center">
        <Icon @click="router.push('/')" name="material-symbols:home" style="" />
        <p class="separator">/</p>
      </div>
      <div style="display: flex; align-items: center" v-else>
        <div>
          <p class="route" v-if="eachRoute === 'collections'">
            {{ eachRoute }}
          </p>
          <p v-else class="route">{{ breadcrumb }}</p>
        </div>
        <p v-if="isRouteEnd(index)" class="separator">/</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .icon-home {
    color: black;
    font-size: 15px;
    cursor: pointer;
  }
  .container-breadcrumb {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 2rem 0;
  }
  .separator {
    padding: 0 1rem;
  }

  .route {
    text-transform: capitalize;
    cursor: pointer;
  }
</style>
