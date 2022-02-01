<template>
  <router-link :to="'/pet/' + petCard.id">
    <article class="card">
      <div class="card-header">
        <img
          class="card-img-top"
          v-bind:src="petCard.image_url"
          :alt="petCard.name"
        />
      </div>
      <div class="card-body">
        <div class="card-main">
          <h3 class="card-title">{{ petCard.name }}</h3>
          <p class="card-text">{{ petCard.location }}</p>
        </div>
        <ul class="card-icons">
          <li v-if="isCat">
            <img
              class="card-icon"
              src="../assets/icons/icon_cat.svg"
              alt="Gato"
            />
          </li>
          <li v-if="isDog">
            <img
              class="card-icon"
              src="../assets/icons/icon_dog.svg"
              alt="Perro"
            />
          </li>
          <li v-if="isMale">
            <img
              class="card-icon"
              src="../assets/icons/icon_male.svg"
              alt="Macho"
            />
          </li>
          <li v-if="isFemale">
            <img
              class="card-icon"
              src="../assets/icons/icon_female.svg"
              alt="Hembra"
            />
          </li>
        </ul>
      </div>
    </article>
  </router-link>
</template>

<script>
export default {
  name: "PetCard",
  props: {
    petCard: Object,
  },
  mounted() {
    //canvi de color dels fons dels animals
    var bgPet = document.getElementsByClassName("card-header");
    for (var i = 0; i < bgPet.length; i++) {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      bgPet[i].style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    }
  },
  computed: {
    //comprovacions d'espècie i sexe
    isCat() {
      return this.petCard.species == "Gato";
    },
    isDog() {
      return this.petCard.species == "Perro";
    },
    isMale() {
      return this.petCard.sex == "Macho";
    },
    isFemale() {
      return this.petCard.sex == "Hembra";
    },
  },
  method: {
    //redireccionament a la pàgina de detall passant com a paràmetre l'ID
    goTo() {
      this.$router.push("/pet/" + this.petCard.id);
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 15px;

  .card-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 0;
  }

  .card-text {
    font-size: 14px;
    color: rgb(95, 95, 95);
  }

  .card-header {
    padding: 10px 0 0 0;
    height: 200px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
  }

  .card-body {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-img-top {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    margin-bottom: -1px;
  }

  .card-icons {
    display: flex;
    align-items: center;
    li {
      margin-left: 7px;
    }
  }

  &:hover {
    cursor: pointer;
    .card-header img {
      transform: scale(1.1);
      transition: transform 0.7s, filter 0.3s, -webkit-transform 0.7s,
        -webkit-filter 0.3s;
    }
    .card-body {
      background: #f9f9f9;
    }
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  color: inherit;
}
</style>
