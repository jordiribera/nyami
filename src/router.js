import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Recipes from "@/views/Recipes.vue";
import NewRecipe from "@/views/NewRecipe.vue";
import ActualRecipe from "@/views/ActualRecipe.vue";
import ShoppingList from "@/views/ShoppingList.vue";

const routes = [
  
  { path: "/", component: Home },
  { path: "/home/:view", component: Home },   
  { path: "/:notFound(.*)", component: NotFound },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { path: "/newRecipe", name: "newRecipe", component: NewRecipe },   
  { path: "/recipes", component: Recipes },
  { path: "/recipes/:date", component: Recipes },
  { path: "/actualRecipe", component: ActualRecipe },
  { path: "/actualRecipe/:name", component: ActualRecipe },
  { path: "/shoppingList", component: ShoppingList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
