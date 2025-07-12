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
  apiKey: ${{ secrets.API_KEY }},
  authDomain: ${{ secrets.AUTH_DOMAIN }},
  projectId: ${{ secrets.PROJECT_ID }},
  storageBucket: ${{ secrets.STORAGE_BUCKET }},
  messagingSenderId: ${{ secrets.MESSAGE_SENDER_ID }},
  appId: ${{ secrets.APPID }},
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
