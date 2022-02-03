<template>
  <main class="page-register">
    <section class="box-auth">
      <img class="logo" alt="logo" src="@/assets/icon_nyami.svg" />
      <h1 class="main-title">REGISTRE</h1>
      <p class="auth-intro">
        Registra't i podràs treure tot el partit de l'aplicació
      </p>

      <form>
        <div class="form-group">
          <label class="form-label" for="username">Email</label>
          <input
            v-model="email"
            placeholder="Correo electrónico"
            type="email"
            id="email"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Contraseya</label>
          <input
            v-model="password"
            placeholder="Contrasenya"
            type="password"
            id="password"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Confirmar contraseya</label>
          <input
            v-model="confirm"
            placeholder="Contrasenya"
            type="password"
            id="confirm"
            class="form-control"
            required
          />
        </div>
        <button v-on:click="register" class="btn btn-inverse btn-md">
          Som-hi
        </button>
      </form>

      <p class="auth-bottom">
        Ja tens un compte?
        <router-link to="/Login">Inicia la sessió</router-link>
      </p>
    </section>
  </main>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // completar import

export default {
  name: "register",
  data: function () {
    return {
      email: "",
      password: "",
      confirm:""
    };
  },
  methods: {
    //registre com a usuari
    register: function (e) {
      const auth = getAuth();
      if(this.password==this.confirm){
        createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          console.log("Nou usuari creat amb el correu: " + user.email);
          this.$router.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);          
          window.alert(errorMessage);
        });
        e.preventDefault();
      }else{
        window.alert("La contrasenya i la confirmació no coincideixen");
        e.preventDefault();
      }      
    },
  },
};
</script>

<style scoped lang="scss">
a{
    color:$primary;
    text-decoration: none;
}
a:hover{
    color:$primary;
    text-decoration: none;
}
</style>