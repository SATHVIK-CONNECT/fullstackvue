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
</template>

<script>
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
  },
  async created() {
    if (this.user) {
      const response = await axios.get(`/api/users/${this.user.uid}/cart`);
      const cartItems = response.data;
      this.cartItems = cartItems;
    }
  },
};
</script>
