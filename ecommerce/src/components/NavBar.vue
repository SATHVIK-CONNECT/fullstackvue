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
      <button v-if="user" @click="signOut" style="background-color: transparent; color: black">
        Sign out
      </button>
    </div>
  </div>
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
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
  },
};
</script>
