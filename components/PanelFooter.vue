<script setup>
  const router = useRouter()
</script>

<template>
  <div class="footer">
    <div id="flex-top-part">
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <p @click="router.push('/account')">Account</p>
        <p>Placeholders</p>
        <p>Placeholders</p>
        <p>Placeholders</p>
      </div>
      <div>
        <p>Placeholders</p>
      </div>
      <div>
        <p>Placeholders</p>
      </div>
      <div>
        <p>Placeholders</p>
      </div>
    </div>
    <Divider />

    <div id="grid-bottom-part">
      <div id="grid-bottom-part-left">
        <p>About Jayben Group</p>
      </div>
      <div id="grid-bottom-part-right">
        <p>Jayben Group© 2025 All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  p {
    font-size: 0.8rem;
    color: white;
  }
  #flex-top-part {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    color: white;
    padding: 2rem 0;
  }
  #flex-top-part > div > p {
    cursor: pointer;
  }
  #grid-bottom-part {
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: white;
  }
  #grid-bottom-part-left {
    display: flex;
    justify-content: flex-start;
  }
  #grid-bottom-part-right {
    display: flex;
    justify-content: flex-end;
  }

  hr {
    background-color: white;
    width: 100%;
    height: 0.05rem;
    border-radius: 5px;
    border: none;
  }
  .footer {
    width: 100%;
    padding: 0 3rem;
    height: 400px;
    background-color: black;
  }
</style>
