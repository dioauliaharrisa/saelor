<template>
  <div class="footer">
    <hr />

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
    height: 100px;
    background-color: black;
  }
</style>
