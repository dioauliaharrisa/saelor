<template>
  <div class="search_bar">
    <InputGroup class="small-input-group">
      <InputGroupAddon id="search-bar-right-add-on">
        Select Equipment
        <img>
      </InputGroupAddon>
      <InputText placeholder="Search for part number or name" />
      <InputGroupAddon id="search_bar_right_add_on">
        <Icon name="material-symbols:search" severity="secondary" />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>

<style scoped>
  .search_bar {
    flex-grow: 1;
    max-width: 800px;
    position: relative;
    height: 40px;
  }

  .small-input-group {
    height: 30px;
    font-size: 0.8rem;
  }
  .small-input-group .p-inputtext {
    height: 30px;
    font-size: 0.5rem;
    line-height: 30px;
  }

  #search-bar-right-add-on {
    font-size: 0.5rem !important;
    padding: 0;
    margin: 0;
  }

  #search_bar_right_add_on {
    background-color: yellow;
  }
</style>
