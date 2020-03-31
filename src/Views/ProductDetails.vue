<template>
  <div id="shop">
    <div class="cart">
      <p>Cart({{ count }})</p>
    </div>

    <product
      :premium="premium"
      @add-to-cart="addToCart"
      @remove-from-cart="removeItem"
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
    addToCart(id) {
      return this.$store.commit('updateCart', id)
    },
    removeItem(id) {
      return this.$store.commit('removeItem', id)
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