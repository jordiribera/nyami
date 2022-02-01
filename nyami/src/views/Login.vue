<template>
  <main class="page-login">
    <section class="box-auth">
      <img class="logo" alt="logo" src="@/assets/icon_nyami.svg" />
      <h1 class="main-title">INICIAR SESSIÓ</h1>
      <p class="auth-intro">
        Obre la sessió i mira què toca menjar avui!
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
        <button v-on:click="login" class="btn btn-inverse btn-md">
          Vinga
        </button>
      </form>

      <p class="auth-bottom">
        Enacra no t'has registrat?
        <router-link to="/Register" >Fes-ho ara</router-link>
      </p>
    </section>
  </main>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "login",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    //Inicia la sessió d'usuari
    login: function (e) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(
            "Sessió iniciada correctament amb el correu: " + user.email
          );
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
    },
  },
};
</script>



<style scoped lang="scss">
a{
    color:$primary;
    text-decoration:none;
}
a:hover{
    color:$primary;
    text-decoration: none;
}
</style>