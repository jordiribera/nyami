<template>
  <div class="container">
      <div class="row">
          <div class="col-md-6 d-flex align-items-center">
            <div class="text-center">
              <h1>Llista de la compra</h1>
              <p>Selecciona els dies que vols que s'afegeixin a la llista de la compra</p>
            </div>            
          </div>
          <div class="col-md-6">
            <DateRange v-bind:events="events" v-on:selectedDays="putRecipeNames" class="dateRange"></DateRange>
          </div>
          <div class="col-md-6 d-flex justify-content-center">
            <div class="text-center">
              <ul>
                <li v-for="ingredient in ingredients" v-bind:key="ingredient">
                  {{ingredient.name}} {{ingredient.quantity}} {{ingredient.mesure_unit}}
                </li>
              </ul>
            </div>
          </div>
      </div>    
    
  </div>
  
</template>

<script>

import DateRange from "@/components/DateRange.vue";
import { getAllEvents } from "@/db";
import { getRecipe } from "@/db"; 
 
export default {
  name: "ShoppingList",
  data() {
    return {      
      events:[],      
      ingredients:[]       
    };
  },
  components: {
    DateRange   
  },
  methods:{
    async putRecipeNames(selectedDays){  
      //rep els dies i crea un array de noms de recepta             
      var recipeNameList=[];
      for(var j=0;j<this.events.length;j++){      
        for(var i=0;i<selectedDays.length;i++){
          if(this.events[j].start==selectedDays[i]){
            recipeNameList.push(this.events[j].title);            
          }
        }                        
      }      
      //crea un array de receptes a partir de l'array de noms
      var recipesList=[];
      for(var k=0;k<recipeNameList.length;k++){        
        var actualRecipe= await getRecipe(recipeNameList[k]);        
        recipesList.push(actualRecipe); 
      }
      //crea un array d'ingredients sense distingir si estan repetits      
      var repeatedIngredients=[];
      for(var l=0;l<recipesList.length;l++){        
        for(var m=0;m<recipesList[l].ingredients.length;m++){          
          repeatedIngredients.push(recipesList[l].ingredients[m]);          
          }                 
      }
      
      /* for(var n=0;n<this.repeatedIngredients.length-1;n++){
        for(var o=n+1;o<this.repeatedIngredients.length;o++){
          if(this.repeatedIngredients[n].name==this.repeatedIngredients[o].name){
            this.repeatedIngredients[n].quantity+=this.repeatedIngredients[o].quantity;
            this.repeatedIngredients.splice(o,1); 
          }
        }        
      } */

      this.ingredients = repeatedIngredients.reduce((acc, curr) => {
        const exists = acc.find(item => item.name === curr.name);
        if (exists) {
          exists.quantity += curr.quantity;
          return acc;
        }
        return [...acc, curr]
      }, []);
      
      //ordena alfabèticament
      this.ingredients.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });     
    }  
  },
 
  async mounted(){
    this.events=await getAllEvents();
  },
};
</script>

<!-- Añadimos "scoped" para limitar el CSS a este componente -->
<style scoped lang="scss">
// Estils
.row{
    margin-top: 100px;
}
</style>