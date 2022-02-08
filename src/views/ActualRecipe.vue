<template>
  <div class="app-container text-center">
    <main class="page-home">      
      <section class="block-list">
        <div class="container">
          <h1 class="main-title">FA BONA PINTA</h1>          
          <div class="row mt-3 d-flex justify-content-center">
            <div class="col-sm-6 col-md-4 ">
              <RecipeCard v-bind:recipeCard="recipe"></RecipeCard>
            </div>
          </div>
        </div>
      </section>      
    </main>
  </div>
</template>

<script>
import { getRecipe } from "@/db";
import RecipeCard from "@/components/RecipeCard.vue";


export default {
  name: "Recipes",
  data() {
    return {      
      recipe: {},       
    };
  },

  components: {    
    RecipeCard
  },
  
  

  async mounted() {
    //crida la funció getAllPets de la base de dades i posa el resultat a l'array pets
    this.recipe= await getRecipe(this.$route.params.name);           
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