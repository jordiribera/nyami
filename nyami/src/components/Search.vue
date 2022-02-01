<template>
  <form v-on:submit.prevent="search" class="search-bar">
    <input
      type="text"
      v-model="searchText"
      placeholder="Busca a tu nuevo mejor amigo"
      class="form-control search-control"
    />
    <button aria-label="searchButton" type="submit" class="btn-icon search-button"></button>
  </form>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    search() {
      //redirecció a la pàgina de resultat de cerca passant com a paràmetre una paraula
      this.$router.push("/search/" + this.searchText);
      this.searchText = "";
    },
  },
};
</script>

<style scoped lang="scss">
.search-bar {
  position: relative;

  .search-control {
    padding-left: 45px;
    height: 58px;
  }

  .search-button {
    background: #fff url(../assets/icons/icon_search.svg) 0px 50% no-repeat;
    position: absolute;
    top: 1px;
    left: 5px;
    color: $grey;
    width: 42px;
    height: 56px;
  }
}
</style>

