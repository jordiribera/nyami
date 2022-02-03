<template>
  <div class="text-center app-container">
    <br />
    <br />
    <br />
    <h1 class="main-title">TRIA ELS INGREDIENTS</h1>
    <section class="block-list">                   
        <div class="container ">                      
            <input class="form-control" type="text" v-model="searchValue" placeholder="ingredient" id="search-input"/>            
            <button v-on:click="ascending = !ascending" class="btn btn-inverse">
                Ascendent/Descendent
            </button> 
            <ul>
                <li v-for="ingredient in filteredIngredients" v-bind:key="ingredient.name">{{ingredient.name}}</li>
            </ul>            
        </div>      
    </section>
    <section >
        <h2 class="mt-4">
            Afegir ingredient
        </h2>                
        <div class="d-flex justify-content-center">
            <form class="mt-2" v-on:submit.prevent="newIngredient">
                <div class="form-group">
                    <label class="form-label" for="name">Nom de l'ingredient</label>                         
                        <input
                            v-model="name"
                            type="text"
                            class="form-control"
                            required
                        />
                </div>
                <div class="form-group">
                    <label class="form-label" for="mesure_unit">Unitat de mesura</label>                         
                        <input
                            v-model="mesure_unit"
                            type="text"
                            class="form-control"
                            placeholder="grams"
                            required
                        />
                </div>                
                <div class="form-group">
                    <label class="form-label" for="alternative_mesure">Unitat de mesura alternativa</label>                         
                        <input
                            v-model="alternative_mesure"
                            type="text"
                            class="form-control"
                            placeholder="unitats"                            
                        />
                </div>
                
              
              
             
          <button type="submit" class="mt-2 btn btn-inverse btn-md">Crear</button>
        </form>
        </div>
    </section>
  </div>
</template>

<script>
import { getAllIngredients } from "@/db";
import { addIngredient } from "@/db";


export default {
    name: "ingredients",
    data() {
        return {      
            ingredients: [],
            ascending:false,
            searchValue:"",
            name:"",
            mesure_unit:"",            
            alternative_mesure:"",            
        };
    },
  
    components: {
    
    },

    async created() {    
        this.ingredients = await getAllIngredients();
    },

    methods:{
        async newIngredient() {     
            var ingredient = {
                name: this.name,
                mesure_unit: this.mesure_unit,                
                alternative_mesure: this.alternative_mesure,                       
            };      
            await addIngredient(ingredient);
            this.name="";
            this.mesure_unit="";            
            this.alternative_mesure="";            
            this.ingredients = await getAllIngredients();
        },
    },
    
    computed: {
        filteredIngredients() {
            let filIng = this.ingredients
    
            // Process search input
            if (this.searchValue != "") {
                filIng = filIng.filter((item) => {
                    return item.name.toUpperCase().includes(this.searchValue.toUpperCase())
                })
            }     
           
            // Sort by alphabetical order
            filIng = filIng.sort((a, b) => {            
                let fa = a.name.toLowerCase(), fb = b.name.toLowerCase();          
                if (fa < fb) {
                    return -1
                }
                if (fa > fb) {
                    return 1 
                }
                return 0               
                
            })
        
            // Show sorted array in descending or ascending order
            if (!this.ascending) {
                filIng.reverse()
            }
        
            return filIng
        }
    }

};
</script>

<style scoped lang="scss">

</style>