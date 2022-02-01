import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.scss";
import "./registerServiceWorker";

const app = createApp(App);
app.use(router);
app.mount("#app");
