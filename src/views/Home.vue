<template>
  <div class="app-container">
    <main class="page-home">
      <section class="block-featured">
        <img class="img_home" src="../assets/home_img_2.jpg" alt="">        
      </section>          
    </main>
    <Calendar ></Calendar>
  </div>
  
</template>

<script>

import Calendar from "@/components/Calendar.vue";

export default {
  name: "Home",
  data() {
    return {
      
    };
  },
  components: {
    Calendar    
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

.img_home{
  max-height: 650px;  
}
.page-home {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.page-home .block-featured {
  background: linear-gradient(73.24deg, #cff37d 0%, #7de88c 100%);
}
.page-home .block-featured .block-featured-content {
  max-width: 550px;
}
.page-home .block-featured .featured-text {
  margin-bottom: 25px;
}
.page-home .block-featured .container {
  background-image: url(../assets/featured_dog.png),
    url(../assets/hero_image_bg.svg);
  background-repeat: no-repeat;
  background-position: 50% 100%, 50% 100%;
  background-size: 400px auto, auto 500px;
  min-height: 870px;
  padding-top: 100px;
}
@media (min-width: 992px) {
  .page-home .block-featured .container {
    background-position: 80% 100%, 100% 100%;
    background-size: 450px auto, contain;
    min-height: 600px;
    padding-top: 150px;
    padding-bottom: 120px;
  }
}
@media (max-width: 992px) {
  .page-home .block-featured .block-featured-content {
    text-align: center;
    margin: 0 auto;
  }
}
.page-home .block-list {
  padding-top: 50px;
  padding-bottom: 60px;
}
.page-home .block-actions {
  background: linear-gradient(180deg, #cff37d 0%, #7de88c 100%);
  margin-top: auto;
  padding-top: 15px;
  padding-bottom: 15px;
}
.page-home .block-actions .action-item a {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;
  text-decoration: none;
  padding-top: 15px;
  padding-bottom: 15px;
}
.page-home .block-actions .action-item a .action-title {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 3px;
}
.page-home .block-actions .action-item a .action-text {
  margin-bottom: 0;
}
.page-home .block-actions .action-item a .ball-icon {
  margin-right: 15px;
}
.page-home .block-actions .action-item a:hover .action-content {
  color: #5b49fe;
}
.page-home .block-actions .action-item a:hover .ball-icon {
  background-color: #5b49fe;
}
.page-home .block-actions .action-item a:hover img {
  filter: invert(100%);
}
@media (min-width: 992px) {
  .page-home .block-actions .action-item a {
    flex-direction: column;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .page-home .block-actions .action-item a .action-content {
    text-align: center;
  }
  .page-home .block-actions .action-item a .ball-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
@media (max-width: 992px) {
  .page-home .block-actions .col {
    flex-basis: auto;
    -webkit-box-flex: 1;
    flex-grow: 1;
    max-width: 50%;
  }
}
@media (max-width: 768px) {
  .page-home .block-actions .col {
    flex-basis: auto;
    -webkit-box-flex: 1;
    flex-grow: 1;
    max-width: 100%;
  }
}
</style>