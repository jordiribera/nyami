<template>
  <div class="text-center app-container">
    <br />
    <br />
    <br />
    <h1 class=" main-title">Resultados de {{ text }}</h1>
    <section class="block-list">
      <div class="container">
        <PetList v-bind:pets="pets"></PetList>
        <p v-if="emptyPets">
          No se ha encontrado ningún gatete ni perrete que coincida con la
          búsqueda
        </p>
        <h2>Nueva búsqueda</h2>
        <Search></Search>
        <button 
          @click="toggleAdvancedSearchView"
          class="mt-4 mb-2 btn btn-primary btn-md"
        >
          Búsqueda avanzada
        </button>
        <div class="d-flex justify-content-center">
            <form class="mt-4 advancedSearch" v-if="advancedSearchView" v-on:submit.prevent="getAdvancedSearch">
          <div class="form-group">
            <label class="form-label" for="species">Especie</label>
            <div class="d-flex justify-content-center gap-4">
              <p>
                <input
                  v-model="species"
                  type="radio"
                  id="Perro"
                  name="species"
                  value="Perro"
                  class="form-check-input"
                  required
                />
                Perro
              </p>
              <p>
                <input
                  v-model="species"
                  type="radio"
                  id="Gato"
                  name="species"
                  value="Gato"
                  class="form-check-input"
                  required
                />
                Gato
              </p>
              <p>
                <input
                  v-model="species"
                  type="radio"
                  id="TodasEspecies"
                  name="species"
                  value="Todos"
                  class="form-check-input"
                  required
                />
                Todos
              </p>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="sex">Sexo</label>
            <div class="d-flex justify-content-center gap-4">
              <p>
                <input
                  v-model="sex"
                  type="radio"
                  id="Macho"
                  name="sex"
                  value="Macho"
                  class="form-check-input"
                  required
                />
                Macho
              </p>
              <p>
                <input
                  v-model="sex"
                  type="radio"
                  id="Hembra"
                  name="sex"
                  value="Hembra"
                  class="form-check-input"
                  required
                />
                Hembra
              </p>
              <p>
                <input
                  v-model="sex"
                  type="radio"
                  id="TodosSexos"
                  name="sex"
                  value="Todos"
                  class="form-check-input"
                  required
                />Todos
              </p>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="size">Tamaño</label>
            <div class="d-flex justify-content-center gap-4">
              <p>
                <input
                  v-model="size"
                  type="radio"
                  id="Pequeño"
                  name="size"
                  value="Pequeño"
                  class="form-check-input"
                  required
                />
                Pequeño
              </p>
              <p>
                <input
                  v-model="size"
                  type="radio"
                  id="Mediano"
                  name="size"
                  value="Mediano"
                  class="form-check-input"
                  required
                />
                Mediano
              </p>
              <p>
                <input
                  v-model="size"
                  type="radio"
                  id="Grande"
                  name="size"
                  value="Grande"
                  class="form-check-input"
                  required
                />
                Grande
              </p>
              <p>
                <input
                  v-model="size"
                  type="radio"
                  id="TodosTamaños"
                  name="size"
                  value="Todos"
                  class="form-check-input"
                  required
                />
                Todos
              </p>
            </div>
          </div>
          <button type="submit" class="mb-2 btn btn-primary btn-md">Buscar</button>
        </form>
        </div>
        
      </div>
    </section>
  </div>
</template>

<script>
import { search } from "@/db";
import { advancedSearch } from "@/db";
import PetList from "@/components/PetList.vue";
import Search from "@/components/Search.vue";

export default {
  name: "searchResults",
  data() {
    return {
      text: "",
      pets: [],
      advancedSearchView: false,
      species: "",
      sex: "",
      size: "",
    };
  },
  watch: {
    //comprova si hi ha algun canvi en la URL per si hi ha una nova recerca des de la mateixa pàgina
    async $route(to) {      
      this.text = await to.params.text;
      this.pets = [];
      if(this.text!=undefined){
        //separa els diferents paràmetres per fer una recerca avançada
        if (this.text.includes(" ")) {
          //recerca avançada amb els paràmetres de la URL
          var arrayAdvanced = this.text.split(" ");
          this.pets = await advancedSearch(
            arrayAdvanced[0],
            arrayAdvanced[1],
            arrayAdvanced[2]
          );
        } else {
          //recerca normal amb el paràmetre de la URL
          this.pets = await search(this.text);
        }
      }      
    },
  },
  components: {
    PetList,
    Search,
  },
  async created() {
    //llegeix els paràmetre de la URL al carregar la pàgina
    this.text = await this.$route.params.text;
    //executa la cerca
    this.pets = await search(this.text);
  },
  computed: {
    //comprova si hi ha resultats de la cerca
    emptyPets() {
      return this.pets.length == 0;
    },
  },
  methods: {
    //canvia la visualització del formulari de recerca avançada
    toggleAdvancedSearchView() {
      this.advancedSearchView = !this.advancedSearchView;
    },
    //posa els paràmetres de la cerca avançada a la URL
    async getAdvancedSearch() {
      console.log(this.species + " " + this.sex + " " + this.size);      
      this.$router.push(
        "/search/" + this.species + " " + this.sex + " " + this.size
      );
      this.advancedSearchView = false;
      this.species = "";
      this.sex = "";
      this.size = "";
    },
  },
};
</script>

<style scoped lang="scss">
.advancedSearch{
    width: fit-content;
    border: $primary 5px solid;
    border-radius: 20px;
    margin-bottom: 10px;
    padding: 10px;
}
</style>
