<template>
  <div v-if="!isLoggedIn">
    <img class="img-fluid" src="../assets/home_img.jpg" alt="">        
  </div> 
  <div class="container ">    
    <div class="calendar" v-if="isLoggedIn">         
      <Calendar :view="this.view"></Calendar>      
    </div>   
  </div>
  
</template>

<script>

import Calendar from "@/components/Calendar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Home",
  data() {
    return {
      isLoggedIn:false,
      view:""
    };
  },
  components: {
    Calendar    
  },  

  created() {    
    this.view = this.$route.params.view;  
    //Comprova si algun usuari ha iniciat la sessió    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUser = user.email;
        console.log(this.currentUser);
        //treu el comportament onscroll quan es demunta la pàgina
        window.onscroll = function () {      
        };
        //posa la classe sticky quan es demunta la pàgina
        var header = document.getElementById("header");
        header.classList.add("sticky");        
      } else {
        this.isLoggedIn = false;
        this.currentUser = "";
        
      }      
    });
  },
  unmounted() {
    //treu el comportament onscroll quan es demunta la pàgina
    window.onscroll = function () {      
    };
    //posa la classe sticky quan es demunta la pàgina
    var header = document.getElementById("header");
    header.classList.add("sticky");
  },

  async mounted() {
    
      // SCROLL
      // cuando el usuario hace scroll se ejecuta la función stickyfy
      window.onscroll = function () {
        stickyfy();
      };

      var header = document.getElementById("header");
      header.classList.remove("sticky");

      // Se añade la clase "sticky" al header cuando se llega a la posición de scroll definida y se quita cuando no se cumple la condición
      function stickyfy() {
        if (window.pageYOffset > 1) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }
    
    
    
  },
};
</script>

<!-- Añadimos "scoped" para limitar el CSS a este componente -->
<style scoped lang="scss">
// Estils
.calendar{
  margin-top: 70px;
}

/* .img_home{
  max-height: 650px;  
} */



</style>