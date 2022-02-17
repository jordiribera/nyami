<template>
    <div class="container">  
      <div  class="botom-navegation d-flex justify-content-center gap-4 fixed-bottom">
        <button @click="activeView = 'day'" :class="{active:activeView=='day'}" class="botom-btn"><img src="../assets/icons/icon_day.svg" height ="50" width="50" /></button>
        <button @click="activeView = 'month'" :class="{active:activeView=='month'}" class="botom-btn"><img src="../assets/icons/icon_month.svg" height ="50" width="50" /></button>
        
          <router-link to="/shoppingList">
            <button class="botom-btn">
              <img src="../assets/icons/icon_shopping.svg" height ="50" width="50" />
            </button>
          </router-link>
                
      </div>    
      <vue-cal 
            
            :time="false"  
            style="height: 500px"
            :disable-views="['years', 'year', 'week']"
            hide-view-selector
            today-button
            :events="events"            
            locale="ca"
            :active-view="activeView"
            events-on-month-view="true"
            @cell-dblclick="addRecipe"
            :onEventClick="viewRecipe"
        />
        
        
    </div>
    
    
    
</template>
<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/ca.js'
import { getAllEvents } from "@/db";


export default {
  components: { VueCal },
  data() {
    return {      
      events: [],
      activeView:"month"      
    };
  },
  props:{
    view:String
  },
  async created(){
    this.events=await getAllEvents();
    if(this.view==null){
      this.activeView="month";
    }else{
      this.activeView=this.view;
    }
  },
  methods:{
      //ha de passar el títol de la recepta com a paràmetre
      viewRecipe(event){          
          this.$router.push("/actualRecipe/"+event.title);
      },
      addRecipe(event){        
        this.$router.push("/recipes/"+event.format());        
      }
  }
}
</script>

<style lang="scss">
.botom-navegation{
  background-color: $primary;
  padding-bottom: 5px;
}
.botom-btn{
  background-color: inherit;
  border:0px;
  
}
.active{
  border-top: 5px solid white;
  border-radius: 5px;
  
}

.vuecal__cell--today{background-color: $secundary}
.vuecal__event.esmorzar {background-color: $tertiary;color: #fff;}
.vuecal__event.dinar {background-color: $quaternary;color: #fff;}
.vuecal__event.berenar {background-color: $quinary;color: #fff;}
.vuecal__event.sopar {background-color: $senary;color: #fff;} 

.vuecal__menu, .vuecal__cell-events-count {background-color: $primary }
.vuecal__title-bar {background-color: $secundary;}
.vuecal__cell--selected:before {border-color: $primary;}

.vuecal__event{
  font-size: 13px;
  border-radius: 5px;
}
</style>
