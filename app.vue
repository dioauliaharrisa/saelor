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
    width: 100vw;
    height: 100dvh;
    font-family: Roboto;
  }
</style>
