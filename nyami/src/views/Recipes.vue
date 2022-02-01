<template>
  <div class="app-container text-center">
    <main class="page-home">      
      <section class="block-list">
        <div class="container">
          <h1 class="main-title">RECEPTES DISPONIBLES</h1>
          <input class="form-control" type="text" v-model="searchValue" placeholder="Recepta" id="search-input"/>
          <div class="row mt-3">
            <div
              class="col-sm-6 col-md-4"
              v-for="recipeCard in filteredRecipes"
              v-bind:key="recipeCard.name"
            >
              <RecipeCard v-bind:recipeCard="recipeCard"></RecipeCard>
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
