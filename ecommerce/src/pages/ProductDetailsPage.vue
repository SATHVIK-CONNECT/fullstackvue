<template>
  <div v-if="product">
    <h1>Product Details</h1>
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button class="add-to-cart" @click="addToCart" v-if="user && !itemIsInCart">
        Add to Cart
      </button>
      <button class="add-to-cart grey" v-if="user && itemIsInCart">Added to cart</button>
      <button class="add-to-cart sign-in" @click="signIn" v-if="!user">Sign in</button>
    </div>
  </div>
  <div v-else><NotfoundPage /></div>
</template>

<script>
// import { cartItems } from "@/temp-data";
import NotfoundPage from "@/pages/NotfoundPage.vue";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import axios from "axios";
export default {
  name: "ProductDetailsPage",
  props: ["user"],
  components: {
    NotfoundPage,
  },
  data() {
    return {
      product: {},
      cartItems: [],
    };
  },
  computed: {
    itemIsInCart() {
      return this.cartItems.some((item) => item.id === this.$route.params.productId);
    },
  },
  watch: {
    async user(newUserValue) {
      if (newUserValue) {
        const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
        const cartItems = cartResponse.data;
        this.cartItems = cartItems;
      }
    },
  },
  methods: {
    async signIn() {
      const email = prompt("Please enter the email:");
      const auth = getAuth();
      const actionCodeSettings = {
        url: `https://full-stack-vue-nllq.onrender.com/products/${this.$route.params.productId}`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert("Check your Email");
      window.localStorage.setItem("emailForSignIn", email);
    },
    async addToCart() {
      await axios.post(`/api/users/${this.user.uid}/cart`, { id: this.$route.params.productId });
      alert("Success!!!");
    },
  },

  async created() {
    const response = await axios.get(`/api/products/${this.$route.params.productId}`);
    const product = response.data;
    this.product = product;

    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      await signInWithEmailLink(auth, email, window.location.href);
      alert("Successfully logged in ");
      window.localStorage.removeItem("emailForSignIn");
    }

    if (this.user) {
      const cartResponse = await axios.get(`/api/users/${this.user.uid}/cart`);
      const cartItems = cartResponse.data;
      this.cartItems = cartItems;
    }
  },
};
</script>
