<template>
    <div class="container">
      <vue-cal 
            
            :time="false"  
            style="height: 500px"
            :disable-views="['years', 'year', 'week']"
            today-button
            :events="events"
            locale="ca"
            active-view="month"
            events-on-month-view="short"
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
      events: []      
    };
  },
  async mounted(){
    this.events=await getAllEvents();
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

.vuecal__event.esmorzar {background-color: $secundary;border: 1px solid rgb(184, 215, 189);color: #fff;}
.vuecal__event.dinar {background-color: $tertiary;border: 1px solid rgb(138, 194, 148);color: #fff;}
.vuecal__event.berenar {background-color: $quaternary;border: 1px solid rgb(49, 137, 64);color: #fff;}
.vuecal__event.sopar {background-color: $quinary;border: 1px solid rgb(16, 106, 32);color: #fff;}

.vuecal__menu, .vuecal__cell-events-count {background-color: $primary }
.vuecal__title-bar {background-color: $secundary;}
.vuecal__cell--selected:before {border-color: $primary;}
</style>
