<template >
    <!-- <div v-if="show"  class="d-flex justify-content-end">
        {{ingredient.name}} 
        <input type="number" :value="quantity">       
         
        <select name="unit_mesure" id="unit_mesure"  v-model="final_mesure_unit">
            <option :value="mesure_unit">{{mesure_unit}}</option> 
            <option :value="alternative_mesure">{{alternative_mesure}}</option>                        
        </select>
        <button class="btn btn-sm btn-inverse" @click="show=false">x</button>
    </div> -->
    
        <td v-if="show">{{ingredient.name}} </td>
        <td v-if="show"><input type="number" :value="quantity" @change="actualizeQuantity()"></td>
        <td v-if="show">
          <select name="unit_mesure" id="unit_mesure"  v-model="finalIngredient.mesure_unit">
            <option :value="mesure_unit">{{mesure_unit}}</option> 
            <option :value="alternative_mesure">{{alternative_mesure}}</option>                        
          </select>
        </td>        
        <td v-if="show">
          <select name="shop" id="shop"  v-model="finalIngredient.shopToBuy">
            <option v-for="shop in shops" v-bind:key="shop" :value="shop.name">{{shop.name}}</option>                                     
          </select>                                 
        </td>
        <td v-if="show">
          <button class="btn btn-sm btn-inverse" @click="show=false">x</button>
        </td>
        <p>{{finalIngredient.name}} {{finalIngredient.quantity}} {{finalIngredient.mesure_unit}} {{finalIngredient.shopToBuy}}</p>                                       
    
  
</template>

<script>
import { getIngredient } from "@/db";

export default {
  name: "Ingredient",
  data() {
    return {
      quantity:0,
      
      mesure_unit:"",
      alternative_mesure:"", 
      final_mesure_unit:"",   
      show:true,      
      finalIngredient:{
        name:"",
        quantity:0,
        mesure_unit:"",
        shopToBuy:""
      }
    };
  },
  props: {
    ingredient: Object,
    shops: Array
    
  },
  
  async created() {
    var actuaIngredient=await getIngredient(this.ingredient.name);
    if(this.ingredient.mesure_unit==actuaIngredient.mesure_unit){
        this.alternative_mesure=actuaIngredient.alternative_mesure;
    }else{
        this.alternative_mesure=actuaIngredient.mesure_unit;
    }
    this.quantity=this.ingredient.quantity;
    this.mesure_unit=this.ingredient.mesure_unit;
    this.finalIngredient.mesure_unit=this.mesure_unit;
    this.finalIngredient.name=this.ingredient.name;
    
    
  },
  methods: {
    actualizeQuantity(){
      //algo haurem de fer
      
    }
    /* add(){
        this.quantity++
    },
    substract(){
        this.quantity--
    } */
  },
};
</script>

<style scoped lang="scss">
  input[type="number"] {
   width:50px;
  } 
</style>