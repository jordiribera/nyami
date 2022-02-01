<template>
  <footer>
    <div class="container">
      <span>©nyami {{ actual_year }}</span>

      <ul class="legal-links">
        <li><router-link to="/">Termes i condicions d'ús</router-link></li>
        <li><router-link to="/">Política de privacitat</router-link></li>
        <li><router-link to="/">Cookies</router-link></li>
        <li><router-link to="/">FAQ</router-link></li>        
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    //any actual
    actual_year() {
      var d = new Date();
      return d.getFullYear();
    }
  }  
};
</script>

<style scoped lang="scss">
footer {
  background:white ;
  color: $primary;
  padding: 20px 0;
  margin-top: auto;
  font-size: 14px;
  font-weight: 500;

  a {
    color: black;
    &:hover {
      color: $primary;
    }
    text-decoration: none;
  }

  .legal-links {
    margin-top: 10px;
  }

  @media #{$min-sm} {
    .container {
      display: flex;
      justify-content: space-between;
    }

    .legal-links {
      display: flex;
      margin-top: 0;
      

      li {
        margin-right: 10px;
      }
    }
  }
}
</style>
