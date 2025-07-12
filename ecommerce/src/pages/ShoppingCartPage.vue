<template>
  <div v-if="user">
    <h1>My Cart</h1>
    <div v-if="cartItems.length > 0">
      <ShoppingCartList @remove-from-cart="removeFromCart($event)" :products="cartItems" />
      <button class="checkout-button">Proceed to check-out</button>
    </div>
    <div v-if="cartItems.length === 0">
      <h1>No items</h1>
    </div>
  </div>
  <center>
    <div v-if="!user">
      <h1>Please, Click on the button below</h1>
      <button v-if="!user" @click="signIn">Sign in</button>
      <h1>To use our Ecommerce Website!</h1>
    </div>
  </center>
</template>

<script>
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import axios from "axios";
import ShoppingCartList from "@/components/ShoppingCartList.vue";
export default {
  name: "ShoppingCartPage",
  props: ["user"],
  data() {
    return {
      cartItems: [],
    };
  },
  components: {
    ShoppingCartList,
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
    async removeFromCart(productId) {
      const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`);
      const updateCart = response.data;
      this.cartItems = updateCart;
    },
    async signIn() {
      const email = prompt("Please enter the email:");
      const auth = getAuth();
      const actionCodeSettings = {
        url: `https://fullstackvue.onrender.com/products/${this.$route.params.productId}`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert("Check your Email");
      window.localStorage.setItem("emailForSignIn", email);
    },
  },
  async created() {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      await signInWithEmailLink(auth, email, window.location.href);
      alert("Successfully logged in ");
      window.localStorage.removeItem("emailForSignIn");
    }
    if (this.user) {
      const response = await axios.get(`/api/users/${this.user.uid}/cart`);
      const cartItems = response.data;
      this.cartItems = cartItems;
    }
  },
};
</script>
