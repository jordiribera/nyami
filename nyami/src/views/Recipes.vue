<template>
  <div class="app-container text-center">
    <main class="page-home">      
      <section class="block-list">
        <div class="container">
          <h1 class="main-title">RECEPTES DISPONIBLES PEL DIA {{recipeDate.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1')}}</h1>
          <label class="form-label" for="apat">Primer de tot escull per quin àpat serà la recepta</label>
          <div class="d-flex justify-content-center gap-4">
            <p>
              <input v-model="meal" type="radio" value="esmorzar" class="form-check-input" required/>
              Esmorzar
            </p>
            <p>
              <input v-model="meal" type="radio" value="dinar" class="form-check-input" required/>
              Dinar
            </p>
            <p>
              <input v-model="meal" type="radio" value="berenar" class="form-check-input" required/>
              Berenar
            </p>
            <p>
              <input v-model="meal" type="radio" value="sopar" class="form-check-input" required/>
              Sopar
            </p>
          </div>
          <input class="form-control" type="text" v-model="searchValue" placeholder="Recepta" id="search-input"/>
          <div class="row mt-3">
            <div
              class="col-sm-6 col-md-4"
              v-for="recipeCard in filteredRecipes"
              v-bind:key="recipeCard.name"
            >
              <RecipeCard v-bind:recipeDate="recipeDate" v-bind:recipeCard="recipeCard" v-bind:meal="meal"></RecipeCard>
            </div>
          </div>
        </div>
      </section>      
    </main>
  </div>
</template>

<script>
import { getAllRecipes } from "@/db";
import RecipeCard from "@/components/RecipeCard.vue";


export default {
  name: "Recipes",
  data() {
    return {
      recipes: [],
      searchValue:"",
      recipeDate:"",
      meal:""      
    };
  },

  components: {    
    RecipeCard
  },
  
  computed: {
        filteredRecipes() {
            let filRec = this.recipes;    
            // Process search input
            if (this.searchValue != "") {
                filRec = filRec.filter((item) => {
                    return item.name.toUpperCase().includes(this.searchValue.toUpperCase())
                })
            }                     
            return filRec;
        }
    },

  async mounted() {
    //crida la funció getAllPets de la base de dades i posa el resultat a l'array pets
    this.recipes = await getAllRecipes();
    this.recipeDate = this.$route.params.date;         
  },
};
</script>

<!-- Añadimos "scoped" para limitar el CSS a este componente -->
<style scoped lang="scss">
// Estils
h1{
  margin-top: 80px;
}
</style>
