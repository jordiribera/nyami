<template>
  <div id="app">
    <app-header />
    <div class="app-container">      
      <router-view></router-view>
    </div>
  </div>
  <Footer />
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    AppHeader,    
    Footer,
  },
};
</script>
