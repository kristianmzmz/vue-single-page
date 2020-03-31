<template>
  <div id="shop">
    <div class="cart">
      <p>Cart({{ count }})</p>
    </div>

    <product
      :premium="premium"
      @addToCart="addToCart"
      @removeFromCart="removeFromCart"
    />
  </div>
</template>

<script>
import Product from '@/components/Product.vue'

export default {
  name: 'ProductDetails',
  components: {
    Product
  },
  computed: {
    count () {
      return this.$store.state.cart.length
    }
  },
  methods:{
    addToCart(selectedProductID) {
      return this.$store.commit('updateCart', {
        selectedProductID: selectedProductID
      })
    },
    removeFromCart(selectedProductID) {
      return this.$store.commit('removeItem', {
        selectedProductID: selectedProductID
      })
    }
  }, 
  data() {
    return { premium: true }
  }
}
</script>

<style>
.cart {
  margin-right: 25px;
  float: right;
  border: 1px solid #d8d8d8;
  padding: 5px 20px;
}
</style>