<template>
    <div class="container">
      <vue-cal 
            xsmall            
            :time="false"  
            style="height: 350px"
            hide-view-selector
            :disable-views="['years', 'year', 'week','day']"
            today-button
            :events="events"
            locale="ca"  
            @cell-click="addDay"     
            active-view="month"                                     
        />              
    </div>        
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/ca.js'



export default {
  components: { VueCal },
  data() {
    return {      
      /* events: [], */
      selectedDays: []            
    };
  },
  props: {
    events:Array
  },
  
  /* async mounted(){
    this.events=await getAllEvents();
  }, */
  methods:{
    addDay(event){        
        var num=0;
        var total=this.selectedDays.length;
        for(var i=0;i<this.selectedDays.length;i++){
            if(this.selectedDays[i]==event.format()){
                this.selectedDays.splice(i,1);
                var actual2=document.querySelector(".vuecal__cell--selected div");
                actual2.classList.remove("selected");                   
            }else{
                num++;                
            }
        }
        if(num==total){
            this.selectedDays.push(event.format());                     
            var actual=document.querySelector(".vuecal__cell--selected div");            
            actual.classList.add("selected");                                     
        }              
        this.$emit('selectedDays', this.selectedDays);                                                    
    }
  }
}
</script>

<style lang="scss">



.vuecal__menu, .vuecal__cell-events-count {background-color: $primary }
.vuecal__title-bar {background-color: $secundary;}
.vuecal__cell--selected:before {border-color: $primary;}
.selected{
    background-color: $primary;
}



</style>