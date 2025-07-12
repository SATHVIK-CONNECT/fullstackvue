<template>
  <div class="grid-wrap" v-for="product in products" v-bind:key="product.id">
    <img :src="product.imageUrl" />
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}</p>
    </div>
    <button class="remove-button" @click="$emit('remove-from-cart', product.id)">
      Remove from cart
    </button>
  </div>
</template>
<script>
export default {
  name: "ShoppingCart List",
  props: ["products"],
};
</script>
