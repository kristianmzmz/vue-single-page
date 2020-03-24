<template>
  <div id="app">
    <div class="cart">
      <p>Cart({{ cart.length }})</p>
    </div>

    <product :premium="premium" @add-to-cart="updateCart" @remove-from-cart="removeItem"></product>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
export default {
  name: "app",
  components: {
    Product
  },
  data() {
    return { premium: true, cart: [] };
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItem(id) {
      for (var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
    }
  }
};
</script>