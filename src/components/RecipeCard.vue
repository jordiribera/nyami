<template>  
  <article class="card d-flex flex-column justify-content-between">
    <div>
      <div class="card-header">
        <router-link to="/">
          <button v-if="recipeDate==null"  type="button" class="close-card btn-close" aria-label="Close"></button>
        </router-link>        
        <img
          class="img-fluid"
          v-bind:src="recipeCard.image_url"
          :alt="recipeCard.name"
        />
      </div>
      <div class="mt-2">      
        <h2 class="card-title">{{ recipeCard.name }}</h2>
        <p class="px-2">{{recipeCard.description}}</p>                                                                                                            
      </div>
    </div>
    
    <div>
      <div class="d-flex justify-content-center gap-2 mt-4 mb-2">
        <button v-if="recipeCard.ingredients!=0" @click="toggleIngredientsView" class="btn btn-inverse">Ingredients <span v-if="!ingredientsView">+</span><span v-else>-</span></button>
        <a v-if="recipeCard.recipeLink!=''" :href="recipeCard.recipeLink">
          <button class="btn btn-inverse">Link</button>
        </a>
        <button v-if="recipeDate!=null" @click="addToCalendar" class="btn btn-light">Afegir</button>                  
      </div>
      <div v-if="ingredientsView" class="mt-4 mb-2">
        <ul>
          <li v-for="ingredient in recipeCard.ingredients" :key="ingredient">
            {{ingredient.name}}: {{ingredient.quantity}} {{ingredient.mesure_unit}}
          </li>
        </ul>
      </div> 
    </div>
  </article>
  
</template>

<script>
import { addEvent } from "@/db";

export default {
  name: "RecipeCard",
  data() {
    return {
      ingredientsView: false     
    };
  },
  props: {
    recipeCard: Object,
    recipeDate: String,
    meal: String
  },
  mounted() {
  },
  computed: {
    
  },
  methods: {
    //canvia la visualització dels ingredients de la recepta
    toggleIngredientsView() {
      this.ingredientsView = !this.ingredientsView;
    },
    async addToCalendar(){
      if(this.meal==""){
        alert("Has de decidir per quin àpat serà la recepta");
      }else{
        var newEvent={
          title: this.recipeCard.name,
          start: this.recipeDate,
          end: this.recipeDate,
          class: this.meal
        };
        await addEvent(newEvent);
        this.$router.push("/");
      }
      
    }
  },
};
</script>

<style scoped lang="scss">
.close-card{
  z-index: 10;
  position:absolute;
  top:15px;
  right:15px;
}

p{
  font-size: 14px;
}
.card {
  margin-bottom: 15px;
  min-height: 500px;

  .card-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 0;
  }

  .card-text {
    font-size: 14px;
    color: rgb(95, 95, 95);
  }

  .card-header {
    padding: 0 0 0 0;
    
    display: flex;
    
    justify-content: center;
    overflow: hidden;
  }

 

  
  

  &:hover {
    cursor: pointer;
    .card-header img {
      transform: scale(1.1);
      transition: transform 0.7s, filter 0.3s, -webkit-transform 0.7s,
        -webkit-filter 0.3s;
    }
    .card-body {
      background: #f9f9f9;
    }
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
}



</style>