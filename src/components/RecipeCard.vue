<template>  
  <article class="card d-flex flex-column justify-content-between">
    <div>
      <div class="card-header">
        <img
          class="card-img-top"
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
        <button @click="toggleIngredientsView" class="btn btn-inverse">Ingredients <span v-if="!ingredientsView">+</span><span v-else>-</span></button>
        <a :href="recipeCard.recipeLink">
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
    //height: 200px;
    display: flex;
    //align-items: flex-end;
    justify-content: center;
    overflow: hidden;
  }

  .card-body {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    //justify-content: space-between;
  }

  .card-img-top {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    margin-bottom: -1px;
  }

  .card-icons {
    display: flex;
    align-items: center;
    li {
      margin-left: 7px;
    }
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