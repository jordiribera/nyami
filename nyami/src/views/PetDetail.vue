<template>
  <div v-if="pet!=null" class="app-container">
    <main class="page-detail">
      <section class="pet-attributes">
        <div class="container">
          <div class="row ps-3 d-flex align-items-center">
            <div class="detail-header col-md-5">
              <img class="card-img-top" v-bind:src="pet.image_url" alt="" />
            </div>
            <div class="col-md-7 d-flex justify-content-center">
              <div>
                <h1>
                  {{ pet.name }} <span>{{ age }} años, {{ pet.location }}</span>
                </h1>
                <div class="attributes-and-buttons">
                  <ul>
                    <li>
                      <strong>Especie</strong> <span>{{ pet.species }}</span>
                    </li>
                    <li>
                      <strong>Sexo</strong><span>{{ pet.sex }}</span>
                    </li>
                    <li>
                      <strong>Medida</strong><span>{{ pet.size }}</span>
                    </li>
                    <li>
                      <strong>Fecha de nacimiento</strong
                      ><span>{{ pet.birth_date }}</span>
                    </li>
                    <li>
                      <strong>Estado</strong><span>{{ pet.status }}</span>
                    </li>
                  </ul>
                  <div class="d-flex justify-content-between mt-5">
                    <button class="btn btn-inverse">Lo quiero adoptar</button>
                    <button class="btn btn-light btn-share">
                      <span></span>Compartir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="history mt-5">
            <h2>Mi historia</h2>
            <p>{{ pet.bio }}</p>
          </div>
          <div
            class="
              row
              mt-4
              d-flex
              justify-content-center justify-content-md-between
            "
          >
            <div class="personalidad col-md-6 col-lg-4 mb-5">
              <h2>Mi personalidad</h2>
              <ul class="d-flex gap-1 flex-wrap">
                <li v-for="item in pet.personality" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="col-md-6 col-lg-4 mb-5 entregan">
              <h2>Me entregan</h2>
              <ul>
                <li>
                  <strong>Vacunado</strong
                  ><span class="yes" v-if="pet.handle_status.vaccinated"
                    >Sí</span
                  ><span v-else>No</span>
                </li>
                <li>
                  <strong>Desparasitado</strong
                  ><span class="yes" v-if="pet.handle_status.dewormed">Sí</span
                  ><span v-else>No</span>
                </li>
                <li>
                  <strong>Esterelizado</strong
                  ><span class="yes" v-if="pet.handle_status.sterilized"
                    >Sí</span
                  ><span v-else>No</span>
                </li>
                <li>
                  <strong>Microchip</strong
                  ><span class="yes" v-if="pet.handle_status.microchip">Sí</span
                  ><span v-else>No</span>
                </li>
              </ul>
            </div>
            <div
              class="col-md-6 col-lg-4 mb-5 saber"
              v-if="pet.info_notes.length > 0"
            >
              <h2>Tienes que saber</h2>
              <ul>
                <li v-for="item in pet.info_notes" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section class="pet-search">
        <div class="container">
          <p>
            Si <strong>{{ pet.name }}</strong> ya ha sido adoptado/a o no hacéis
            match, tenemos otros animales que te necesitan. Encuentralos
          </p>
          <Search></Search>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { getPet } from "@/db";
import Search from "@/components/Search.vue";

export default {
  name: "PetDetail",
  data() {
    return {      
      pet: null,
    };
  },
  components: {
    Search,
  },

  async created() {
    //agafa la id dels paràmetres de la URL
    const petId = this.$route.params.petId;
    console.log(petId);
    //agafa la mascota amb la ID passada de la base de dades i la posa a l'objecte pet    
    this.pet = await getPet(petId);  
    
  },
  computed: {
    //calcula l'edat del gos
    age() {
      var birthdayArr = this.pet.birth_date.split("-");
      var birthYear = birthdayArr[0];
      var birthMonth = birthdayArr[1];
      var birthDay = birthdayArr[2];
      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();
      if (nowYear == birthYear) {
        return 0;
      } else {
        var ageDiff = nowYear - birthYear;
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay;
          if (dayDiff < 0) {
            return ageDiff - 1;
          } else {
            return ageDiff;
          }
        } else {
          var monthDiff = nowMonth - birthMonth;
          if (monthDiff < 0) {
            return ageDiff - 1;
          } else {
            return ageDiff;
          }
        }
      }
    },
  },
  updated() {   
    //canvi de color dels fons dels animals 
    var bgPet = document.getElementsByClassName("detail-header");
    for (var i = 0; i < bgPet.length; i++) {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      bgPet[i].style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    }
  }, 
};
</script>

<!-- Añadimos "scoped" para limitar el CSS a este componente -->
<style scoped lang="scss">
h1 {
  font-size: 36px;
}
h2 {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
}
.page-detail {
  margin-top: 100px;
}
h1 span {
  color: $primary;
}
.detail-header {
  border: 15px solid white;
  box-shadow: 0px 0px 1px 1px rgb(219, 218, 218);
  height: 350px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}

.card-img-top {
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  margin-bottom: -1px;
}
.attributes-and-buttons {
  max-width: 333px;
}

.btn-share {
  background-image: url(../assets/icons/share.svg);
  background-repeat: no-repeat;

  background-size: 24px 24px;
  background-position: 15px;
  padding-left: 45px;
}
.btn-share:hover {
  background-image: url(../assets/icons/share_white.png);
  background-repeat: no-repeat;

  background-size: 24px 24px;
  background-position: 15px;
  padding-left: 45px;
}

.history {
  box-sizing: border-box;
  padding: 10px;
  background: #f9feee;
  border: 0.5px solid #bcf8bc;
}

.personalidad,
.entregan,
.saber {
  max-width: 345px;
}

.personalidad li {
  background: $primary;
  border-radius: 15px;
  color: white;
  padding: 5px;
  font-size: 13px;
  height: 20px;
}
li {
  padding: 8px 0;
  border-bottom: 1px solid $primary;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
li:last-child {
  border-bottom: none;
}
.entregan span {
  border-radius: 15px;
  padding: 0 10px;
  background: rgba(255, 122, 122, 1);
  color: white;
}
span.yes {
  background: rgb(31, 116, 42);
}
.pet-search {
  background: linear-gradient(73.24deg, #cff37d 0%, #7de88c 100%);
}

.pet-search .container {
  max-width: 460px;
  text-align: center;
  padding: 30px 0;
}
</style>
