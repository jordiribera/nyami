import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Ingredients from "@/views/Ingredients.vue";
import Recipes from "@/views/Recipes.vue";
import NewRecipe from "@/views/NewRecipe.vue";
import ActualRecipe from "@/views/ActualRecipe.vue";

const routes = [
  { path: "/", component: Home },  
  { path: "/:notFound(.*)", component: NotFound },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { path: "/newRecipe", name: "newRecipe", component: NewRecipe },  
  { path: "/ingredients", component: Ingredients },
  { path: "/recipes", component: Recipes },
  { path: "/recipes/:date", component: Recipes },
  { path: "/actualRecipe", component: ActualRecipe },
  { path: "/actualRecipe/:name", component: ActualRecipe },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
