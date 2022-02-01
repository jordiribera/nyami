<template>
    <div class="container">
        <button class="btn btn-inverse m-2" @click="events.push({
            start: '2022-1-31',
            end: '2022-1-31',
            title: 'Minjar!',
            class: 'dinar'
        })">Afegir recepta</button>
        <button class="btn btn-inverse m-2" @click="events.pop()">Borrar la última recepta</button>
        <vue-cal 
            class="vuecal--green-theme" 
            :time="false"  
            style="height: 500px"
            :disable-views="['years', 'year', 'week']"
            today-button
            :events="events"
            locale="ca"
            active-view="day"
            
            :onEventClick="addRecipe"
        />
        
        
    </div>
    
    
</template>
<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/ca.js'


export default {
  components: { VueCal },
  data: () => ({
    events: [
    {
      start: '2022-1-31',
      end: '2022-1-31',
      title: 'Llet amb cereals',      
      class: 'esmorzar'
    },
    {
      start: '2022-2-1',
      end: '2022-2-1',
      title: 'Formatge, amb raïm i nous',      
      class: 'esmorzar'
    },
    {
      start: '2022-2-1',
      end: '2022-2-1',
      title: 'Cuscus de vegetals',      
      class: 'dinar'
    },
    {
      start: '2022-2-1',
      end: '2022-2-1',
      title: 'Entrepà de pernil dolç i formatge',      
      class: 'berenar'
    },
    {
      start: '2022-2-1',
      end: '2022-2-1',
      title: 'Crema de pèsols',      
      class: 'sopar'
    }
  ]
  }),
  methods:{
      addRecipe(){
          this.$router.push("/recipes");
      }
  }
}
</script>

<style lang="scss">

.vuecal__event.esmorzar {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.dinar {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}
.vuecal__event.berenar {background-color: rgba(173, 185, 23, 0.9);border: 1px solid rgb(153, 165, 3);color: #fff;}
.vuecal__event.sopar {background-color: rgba(184, 28, 131, 0.9);border: 1px solid rgb(164, 8, 111);color: #fff;}
</style>
