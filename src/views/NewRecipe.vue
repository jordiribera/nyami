<template>
  <main class="mt-4 new-pet">
    <section class="box-auth">
      <img class="logo" alt="logo" src="@/assets/icon_nyami.svg" />
      <h1 class="main-title">NOVA RECEPTA</h1>
      <p class="auth-intro">Apunta el què vulguis però pensa que ho hauràs de cuinar!</p>
      <p class="comment">(Els camps marcats amb <span>*</span> són obligatoris)</p>

      <form v-on:submit.prevent="createRecipe">
        <div class="form-group">
          <label class="form-label" for="recipe.name">Nom <span>*</span></label>
          <input
            v-model="recipe.name"
            placeholder="Nom"
            type="text"
            id="recipe.name"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="recipe.description">Descripció</label>
          <textarea
            v-model="recipe.description"
            placeholder="4 cullerades de com anirà"
            name="recipe.description"
            id="recipe.description"
            cols="30"
            rows="5"
            class="form-control"            
          />
        </div>
        
          
        <div class="form-group">
            <label class="form-label" for="myFile">Seleccionar imatge</label>
            <input
                v-on:change="putMyFile"
                type="file"
                id="myFile"
                class="form-control"                
            />
            <img
                class="mt-3"
                v-if="myFile != null"
                :src="myFileURL"
                alt=""
                height="200"
            />
        </div>
        <div class="form-group">
            <label class="form-label" for="image_url">O enganxa la Url d'una imatge</label>
            <input
              v-model="recipe.image_url"
              placeholder="Url de la imatge"
              type="text"
              id="image_url"
              class="form-control"              
            />
            <img
                class="mt-3"
                v-if="recipe.image_url != ''"
                :src="recipe.image_url"
                alt=""
                height="200"
            />
          </div>
        <div class="form-group">
            <label class="form-label" for="recipe.thermomix">És una recepta de Thermomix? <span>*</span></label>
            <div class="d-flex justify-content-center gap-2">
                <p>
                    <input
                        v-model="recipe.thermomix"            
                        type="radio"
                        id="thermomix"
                        class="form-check-input"
                        value="Sí"
                        required
                    />
                    Sí
                </p>
                <p>
                    <input
                        v-model="recipe.thermomix"            
                        type="radio"
                        id="no_thermomix"
                        class="form-check-input"
                        value="No"
                        required
                    />
                    No
                </p>                
            </div>  
          
        </div>          
        <div class="form-group">
          <label class="form-label" for="recipe.recipeLink">Enllaç a la recepta</label>
          <input
            v-model="recipe.recipeLink"
            placeholder="On ens explicaran com ho hem de fer?"
            type="text"
            id="recipeLink"
            class="form-control"            
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="recipe.rations">Racions <span>*</span></label>
          <input
            v-model="recipe.rations"
            placeholder="Quants en menjarem?"
            type="number"
            id="rations"
            class="form-control" 
            required           
          />
        </div>
        
        <div class="form-group">
            <label class="form-label" for="ingredients">Ingredients</label>
            <div class="container ">                      
                <input class="form-control" type="text" v-model="searchValue" placeholder="ingredient" id="search-input"/>          
                <ul class="mt-3" v-if="searchValue!=''">
                    <li v-for="ingredient in filteredIngredients" v-bind:key="ingredient.name">
                        {{ingredient.name}}                        
                        <input v-model="actualIngredient.quantity" type="number" class="w-25">
                        <select name="unit_mesure" id="unit_mesure" v-model="actualIngredient.mesure_unit">
                            <option :value="ingredient.mesure_unit">{{ingredient.mesure_unit}}</option>
                            <option :value="ingredient.alternative_mesure">{{ingredient.alternative_mesure}}</option>                        
                        </select>
                        <button class="btn btn-inverse btn-sm" @click.prevent="addIngredientInArray(ingredient.name)">+</button>                        
                    </li>
                </ul>
                <ul>
                    <li class="mt-2" v-for="(item, index) in recipe.ingredients" :key="item.name">
                        {{ item.name }} {{item.quantity}} {{item.mesure_unit}}<button class="mx-2 btn btn-danger btn-sm " @click="removeIngredient(index)">x</button>
                    </li>
                </ul>
                <p class="mt-3">Si algun ingredient no el trobes al buscador el pots afegir <button @click.prevent="toggleNewIngredientView" class="btn btn-inverse btn-sm">+</button></p>
                
                <div v-if="newIngredientView" class="url d-flex justify-content-center">
                    <form class="mt-2" v-on:submit.prevent="addNewIngredient">
                        <div class="form-group">
                            <label class="form-label" for="name">Nom de l'ingredient</label>                         
                            <input
                                v-model="newIngredient.name"
                                type="text"
                                class="form-control"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="mesure_unit">Unitat de mesura</label>                         
                            <input
                                v-model="newIngredient.mesure_unit"
                                type="text"
                                class="form-control"
                                placeholder="grams"
                                required
                            />
                        </div>                
                        <div class="form-group">
                            <label class="form-label" for="alternative_mesure">Unitat de mesura alternativa</label>                         
                            <input
                                v-model="newIngredient.alternative_mesure"
                                type="text"
                                class="form-control"
                                placeholder="unitats"                            
                            />
                        </div>                
                        <button type="submit" class="mt-2 btn btn-inverse btn-md">Crear</button>
                    </form>
                </div>            
            </div>
        </div>          
        <button type="submit" class="btn btn-inverse btn-md">Registrar</button>
      </form>
    </section>
  </main>
</template>

<script>

import { getAllIngredients } from "@/db";
import { addIngredient } from "@/db";
import { addRecipe } from "@/db";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
    name: "newRecipe",
    data: function () {
        return {
            ingredients: [],              
            searchValue:"",
            recipe:{
                name:"",
                description:"",
                image_url:"",
                thermomix:"",
                recipeLink:"",
                rations:0,
                ingredients:[]
            },        
            actualIngredient: {
                name:"",
                mesure_unit:"",
                quantity:0
            },
            
            myFile: null,
            myFileURL: "",
            fileURL: "",
            newIngredientView:false,
            newIngredient:{
                name:"",
                mesure_unit:"",
                alternative_mesure:""
            }
    
        };
    },

    async created() {    
        this.ingredients = await getAllIngredients();
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
            return filIng
        }
    },

    methods: {    
        async createRecipe(){
            if (this.myFile != null) {
                this.recipe.image_url = await this.uploadFile();
            } /* else {
                this.recipe.image_url ="";
            } */
            await addRecipe(this.recipe);
            this.$router.push("/");
        },

        //afegeix un ingredient a l'array d'ingredients
        addIngredientInArray(name) {     
            this.actualIngredient.name=name;   
            this.recipe.ingredients.push(this.actualIngredient);
            this.actualIngredient={};
            this.actualIngredient.name="";
            this.actualIngredient.mesure_unit="";
            this.actualIngredient.quantity=0;
            this.searchValue="";      
        },

        //borra un ingredient de l'array
        removeIngredient(index) {
            this.recipe.ingredients.splice(index, 1);
        },

        //carrega l'arxiu i en guarda la URL local
        putMyFile(event) {
            this.myFile = event.target.files[0];
            this.myFileURL = URL.createObjectURL(this.myFile);            
        },

        //carrega una imatge a Storage i en reotorna la URL
        async uploadFile() {
            const storage = getStorage();
            const storageRef = ref(storage, "images/" + this.myFile.name);
            await uploadBytes(storageRef, this.myFile);
            const fileUrl = await getDownloadURL(storageRef);            
            return fileUrl;
        },

        toggleNewIngredientView() {
            this.newIngredientView = !this.newIngredientView;
        },

        async addNewIngredient() {                 
            await addIngredient(this.newIngredient);
            this.newIngredient={};
            this.newIngredient.name="";
            this.newIngredient.mesure_unit="";            
            this.newIngredient.alternative_mesure="";            
            this.ingredients = await getAllIngredients();
        },
  },
};
</script>

<style scoped lang="scss">
.new-pet{
  background: linear-gradient(73.24deg, $accent-light 0%, $accent 100%);
}

.addNote-bar {
  position: relative;

  .addNote-control {
    padding-left: 45px;
    height: 58px;
  }

  .addNote-button {    
    position: absolute;
    font-size: 30px;
    top: 0px;
    left: 5px;
    color: $primary;
    width: 42px;
    height: 56px;
  }  
}
.comment{
    font-size:10px;
    
  }

span{
      color:$primary;
      font-size:15px;
    }

.url{
    //width: fit-content;
    border: rgba(128, 128, 128, 0.397) 1px solid;
    border-radius: 10px;    
    padding: 10px;
}
</style>
