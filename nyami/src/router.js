import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import PetDetail from "@/views/PetDetail.vue";
import NotFound from "@/views/NotFound.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import SearchResults from "@/views/SearchResults.vue";
//nous
import Ingredients from "@/views/Ingredients.vue";
import Recipes from "@/views/Recipes.vue";
import NewRecipe from "@/views/NewRecipe.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/pet", component: PetDetail },
  { path: "/pet/:petId", component: PetDetail },
  { path: "/:notFound(.*)", component: NotFound },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { path: "/newRecipe", name: "newRecipe", component: NewRecipe },
  { path: "/search/:text", component: SearchResults },
  { path: "/ingredients", component: Ingredients },
  { path: "/recipes", component: Recipes },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
