<template>
  <header id="header" class="header sticky">
    <div class="header-container container">
      <nav class="gap-5">
        <router-link to="/" class="btn-icon logo-btn">
          <img
            class="logo logo-normal"
            src="../assets/logo_SVG.svg"
            alt="Logo petinder"
          />
          <img
            class="logo logo-white"
            src="../assets/logo_white_SVG.svg"
            alt="Logo petinder"
          />
        </router-link>

        <ul class="menu-links">
          <li><router-link to="/">Serveis</router-link></li>
          <li><router-link to="/">Sobre nosaltres</router-link></li>
          <li><router-link to="/">Contactar</router-link></li>          
        </ul>
      </nav>

      <router-link
        v-if="!isLoggedIn"
        to="/Login"
        href=""
        class="btn btn-login btn-light"
        title="Iniciar sesión"
        >Iniciar sessió</router-link
      >

      <div class="d-flex align-items-center gap-3" v-if="isLoggedIn">               
        <p class="d-none d-sm-block mb-0">{{ currentUser }}</p>        
        <button class="btn p-0" @click="logout">
          <img src="../assets/icons/icon_logout.svg" alt="Logo log out" />
        </button>
      </div>

      <div id="menuIcon" class="menu-icon">
        <div id="menuIconBar" class="menu-icon-bar"></div>
      </div>
    </div>
  </header>

  <div class="menu" id="menu">
    <nav id="navMobile" class="menu-nav-mobile">
      <ul class="menu-links">
        <li><router-link to="/">Serveis</router-link></li>
          <li><router-link to="/">Sobre nosaltres</router-link></li>
          <li><router-link to="/">Contactar</router-link></li>
      </ul>
      <router-link
        v-if="isLoggedIn == false"
        to="/Login"
        id="menuLinks"
        href=""
        class="btn-login btn btn-light"
        title="Iniciar sesión"
        >Iniciar sesión</router-link
      >
    </nav>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "Header",
  data: function () {
    return {
      isLoggedIn: false,
      currentUser: "",
    };
  },
  created() {
    //Comprova si algun usuari ha iniciat la sessió
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUser = user.email;
        console.log(this.currentUser);        
      } else {
        this.isLoggedIn = false;
        this.currentUser = "";
      }      
    });
  },

  methods: {
    //tancar la sessió
    logout: function (e) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {})
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
      e.preventDefault();
    },
  },

  mounted() {
    // MENU MOBILE
    const menuIconBar = document.getElementById("menuIconBar");
    const menuIcon = document.getElementById("menuIcon");
    const menuLinks = document.getElementById("menuLinks");
    const menu = document.querySelector("#menu");

    function toggleClassActive() {
      if (
        !(
          menuIconBar.classList.contains("menu-icon-cross") ||
          menuIconBar.classList.contains("menu-icon-hamburguer")
        )
      ) {
        menuIconBar.classList.add("menu-icon-cross");
      } else if (menuIconBar.classList.contains("menu-icon-cross")) {
        menuIconBar.classList.remove("menu-icon-cross");
        menuIconBar.classList.add("menu-icon-hamburguer");
      } else if (menuIconBar.classList.contains("menu-icon-hamburguer")) {
        menuIconBar.classList.remove("menu-icon-hamburguer");
        menuIconBar.classList.add("menu-icon-cross");
      }

      menu.classList.toggle("menu-visible");
    }

    menuIcon.addEventListener("click", toggleClassActive);
    menuLinks.addEventListener("click", toggleClassActive);
  },
};
</script>

<style lang="scss">
.header {
  color: white;
  width: 100%;
  z-index: 100;
  transition: all 0.4s ease;
  top: 0px;
  position: fixed;
}

.header .logo-btn {
  padding: 0;
}
.header .logo {
  height: 50px;
  width: auto;
  margin-right: 20px;
}
.header .logo.logo-normal {
  display: none;
}
.header.sticky {
  color: black;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(13, 10, 44, 0.04);  
}
.header.sticky .header-container .menu-links li a {
  color: black;
  
}
.header.sticky .logo.logo-normal {
  display: block;
}
.header.sticky .logo.logo-white {
  display: none;
}
.header .header-container {
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 70px;
}
.header .header-container nav {
  align-items: center;
  display: flex;
}
@media (max-width: 992px) {
  .header .header-container > .btn-login {
    display: none;
  }
}
.header .header-container .menu-links {
  display: flex;
}
.header .header-container .menu-links li {
  margin-right: 15px;
  font-weight: 500;
}
.header .header-container .menu-links li a {
  color: white;
  text-decoration: none;
}
.header .header-container .menu-links li a:hover {
  color: $primary;
  text-decoration: none;
}
@media (max-width: 992px) {
  .header .header-container .menu-links {
    display: none;
  }
}
.menu {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 100%;
  height: 100vh;
  width: 100vw;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 128px;
  background: $primary;
  transition: left 0.4s, background-color 0.2s;
}
.menu.menu-visible {
  left: 0;
  background: $primary;
}
.menu .menu-nav-mobile {
  text-align: center;
}
.menu .menu-nav-mobile .menu-links a {
  display: block;
  text-align: center;
  padding: 7px 20px;
  text-decoration: none;
  color: white;
}
.menu .menu-nav-mobile .menu-links a:hover {
  background: white;
  color: $primary;
}
.menu .btn-login {
  width: 200px;
  margin: 0 auto;
  margin-top: 20px;
}
.menu-icon {
  height: 40px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (min-width: 992px) {
  .menu-icon {
    display: none;
  }
}
.menu-icon-bar {
  position: relative;
  height: 4px;
  width: 24px;
  border-radius: 2px;
  background-color: white;  
}

.menu-icon-bar:before,
.menu-icon-bar:after {
  content: "";
  position: absolute;
  left: 0;
  height: 4px;
  width: 24px;
  border-radius: 2px;
  background-color: white;
  transform-origin: center center;
}

.header.sticky .menu-icon-bar,
.header.sticky .menu-icon-bar:before,
.header.sticky .menu-icon-bar:after{
  background-color: $primary;
}

.menu-icon-bar:before {
  top: -7px;
}
.menu-icon-bar:after {
  top: 7px;
}
.menu-icon-bar:hover {
  cursor: pointer;
}
.menu-icon-cross {
  animation: originalToCross 0.4s forwards;
}
.menu-icon-cross:before {
  animation: beforeToCross 0.4s forwards;
}
.menu-icon-cross:after {
  animation: afterToCross 0.4s forwards;
}
.menu-icon-hamburguer {
  animation: originalToHamburguer 0.4s forwards;
}

.header.sticky .menu-icon-hamburguer {
  animation: stickyOriginalToHamburguer 0.4s forwards;
}
.menu-icon-hamburguer:before {
  animation: beforeToHamburguer 0.4s forwards;
}
.menu-icon-hamburguer:after {
  animation: afterToHamburguer 0.4s forwards;
}
@keyframes originalToHamburguer {
  0% {
    background-color: transparent;
  }
  40%,
  100% {
    background-color: white; 
  }
}

@keyframes stickyOriginalToHamburguer {
  0% {
    background-color: transparent;
  }
  40%,
  100% {
    background-color: $primary; 
  }
}



@keyframes beforeToHamburguer {
  0% {
    top: 0;
    transform: rotate(45deg);
  }
  20%,
  40% {
    top: 0;
    transform: rotate(0);
  }
  100% {
    top: -6px;
  }
}
@keyframes afterToHamburguer {
  0% {
    top: 0;
    transform: rotate(-45deg);
  }
  20%,
  40% {
    top: 0;
    transform: rotate(0);
  }
  100% {
    top: 6px;
  }
}
@keyframes originalToCross {
  0% {
    background-color: white;
  }
  40%,
  100% {
    background-color: transparent;
  }
}
@keyframes beforeToCross {
  0% {
    top: -6px;
  }
  20%,
  40% {
    top: 0;
    transform: rotate(0);
  }
  100% {
    top: 0;
    transform: rotate(45deg);
  }
}
@keyframes afterToCross {
  0% {
    top: 6px;
  }
  20%,
  40% {
    top: 0;
    transform: rotate(0);
  }
  100% {
    top: 0;
    transform: rotate(-45deg);
  }
}


</style>
