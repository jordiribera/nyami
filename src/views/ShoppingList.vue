<template>
  <div class="container">
    
    <div class="row">
      <div class="col-md-6 text-center d-flex flex-column justify-content-center">
        <h1>Llista de la compra</h1>
        <p>Selecciona els dies que vols que s'afegeixin a la llista de la compra</p>
        <p class="mt-4">També pots afegir les botigues on compraràs els ingredients</p>
       
        <div class="d-flex justify-content-center">
          <form v-on:submit.prevent="addNewShop">
            <div class="form-group">
              <!-- <label class="form-label" for="name"></label>  -->                        
              <input
                v-model="newShop.name"
                placeholder="Nom de la botiga"
                type="text"
                class="form-control"
                required
              />
            </div>                                                                 
            <button type="submit" class="mt-2 btn btn-inverse btn-md">Afegir</button>
          </form>
        </div>
      </div>
      <div class="col-md-6 mt-2">
        <DateRange v-bind:events="events" v-on:selectedDays="putRecipeNames" ></DateRange>
      </div>      
      <div v-if="ingredients.length!=0" class="col-md-12 mt-5">        
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Ingredient</th>
              <th scope="col">Quantitat</th>
              <th scope="col">Unitat de mesura</th>              
              <th scope="col">Botiga</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ingredient in ingredients" v-bind:key="ingredient">                 
              <Ingredient :shops="shops" :ingredient="ingredient"></Ingredient>
            </tr>
          </tbody>
        </table>        
      </div>
    </div>    
    
  </div>
  
</template>

<script>

import DateRange from "@/components/DateRange.vue";
import Ingredient from "@/components/Ingredient.vue";
import { getAllEvents } from "@/db";
import { getRecipe } from "@/db"; 
import { addShop } from "@/db"; 
import { getAllShops } from "@/db";
 
export default {
  name: "ShoppingList",
  data() {
    return {      
      events:[],      
      ingredients:[],
      newShop:{
        name:""
      },
      shops:[]
      
    };
  },
  components: {
    DateRange,
    Ingredient   
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
      
      /* for(var n=0;n<repeatedIngredients.length-1;n++){
        for(var o=n+1;o<repeatedIngredients.length;o++){
          if(repeatedIngredients[n].name==repeatedIngredients[o].name){
            repeatedIngredients[n].quantity+=repeatedIngredients[o].quantity;
            repeatedIngredients.splice(o,1); 
          }
        }        
      }
      this.ingredients=repeatedIngredients;
      */

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
    },
    async addNewShop(){
      await addShop(this.newShop);
      this.newShop={};
      this.newShop.name="";
      this.shops= await getAllShops();
    }  
  },
 
  async created(){
    this.events=await getAllEvents();
    this.shops=await getAllShops(); 
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