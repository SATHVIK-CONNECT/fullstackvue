<template>
  <div class="nav-bar">
    <router-link to="/products" class="products-link">
      <div class="logo-wrap">
        <img :src="vue" class="img" />
      </div>
    </router-link>
    <div class="nav">
      <router-link to="/products" class="products-link">
        <button style="background-color: transparent; color: black">Products</button>
      </router-link>
      <router-link to="/cart" class="cart-link">
        <button style="background-color: transparent; color: black">Shopping Cart</button>
      </router-link>
      <button v-if="!user" @click="signIn" style="background-color: transparent; color: black">
        Sign in
      </button>
      <button v-if="user" @click="signOut" style="background-color: transparent; color: black">
        Sign out
      </button>
    </div>
  </div>
</template>
<script>
// import { getAuth, signOut } from "firebase/auth";
import {
  getAuth,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import vue from "../assets/logo.png";
export default {
  name: "NavBar",
  props: ["user"],
  data() {
    return {
      vue,
    };
  },
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth);
    },
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
  },
  async created() {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      await signInWithEmailLink(auth, email, window.location.href);
      alert("Successfully logged in ");
      window.localStorage.removeItem("emailForSignIn");
    }
  },
};
</script>
