<template>
  <div class="app-container">
    <main class="page-not-found">
      <img class="logo" alt="logo" src="@/assets/icon.svg" />
      <h1>404</h1>
      <h2>Lo sentimos, la página que buscas no existe.</h2>
      <h2>
        Tal vez quieras ver nuestras <router-link to="/">mascotas</router-link>
      </h2>
    </main>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<!-- Añadimos "scoped" para limitar el CSS a este componente -->
<style scoped lang="scss">
.page-not-found {
  background: linear-gradient(73.24deg, #cff37d 0%, #7de88c 100%);
  text-align: center;
  padding-top: 200px;
}
.page-not-found h1 {
  font-weight: 900;
  //font-family: $font-family-title;
  font-size: 52px;
}
.logo {
  width: 120px;
  margin-bottom: 20px;
}
</style>
