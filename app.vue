<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <!-- tackling layout mismatch bug -->
      <div>
        <NuxtPage />
      </div>
      <Toast />
    </NuxtLayout>
  </div>
</template>

<style>
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Roboto;
  }
</style>
