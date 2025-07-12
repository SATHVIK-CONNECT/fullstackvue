import { createApp } from "vue";
import App from "./App.vue";
import * as VueRouter from "vue-router";
import "./main.css";
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import ProductDetailsPage from "./pages/ProductDetailsPage.vue";
import NotfoundPage from "./pages/NotfoundPage.vue";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCwOwhJRhzhPXgY5jCcNhfWhi-iVb7UfPU",
  authDomain: "vuesite-a50d0.firebaseapp.com",
  projectId: "vuesite-a50d0",
  storageBucket: "vuesite-a50d0.firebasestorage.app",
  messagingSenderId: "223305690764",
  appId: "1:223305690764:web:b967921cc7aa42de9655a9",
};

initializeApp(firebaseConfig);

createApp(App)
  .use(
    VueRouter.createRouter({
      history: VueRouter.createWebHistory(process.env.BASE_URL),
      routes: [
        {
          path: "/cart",
          component: ShoppingCartPage,
        },
        {
          path: "/products",
          component: ProductsPage,
        },
        {
          path: "/products/:productId",
          component: ProductDetailsPage,
        },
        {
          path: "/",
          redirect: "/products",
        },
        {
          path: "/:pathMatch(.*)*",
          component: NotfoundPage,
        },
      ],
    })
  )
  .mount("#app");
