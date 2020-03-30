<template>
  <div class="product">
    <div class="product-image">
      <img :src="image">
    </div>

    <div class="product-info">
      <h1>{{ product }}</h1>
      <p
        v-if="inStock"
        class="stock"
      >
        In Stock
      </p>
      <p
        v-else
        class="stock"
      >
        Out of Stock
      </p>
      <product-tabs
        :shipping="shipping"
        :details="details"
      />

      <div
        v-for="(variant, index) in variants"
        :key="variant.ID"
        class="color-box"
        :style="{ backgroundColor: variant.color }"
        @mouseover="updateProduct(index)"
      />

      <div class="buttons">
        <button
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
          @click="addToCart"
          class="add-to-cart"
        >
          Add to cart
        </button>
        <button
          @click="removeFromCart"
          class="remove-from-cart"
        >
          Remove from cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductTabs from '@/components/ProductTabs.vue'

export default {
  name: 'Product',
  components: {
    ProductTabs
  },
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      brand: 'Codurance',
      product: 'Socks',
      selectedVariant: 0,
      reviews: [],
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          ID: 2234,
          color: 'green',
          image: './assets/green-socks.jpg',
          quantity: 10
        },
        {
          ID: 2235,
          color: 'blue',
          image: './assets/blue-socks.jpg',
          quantity: 0
        }
      ]
    }
  },
  computed: {
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity > 0
    },
    shipping() {
      return this.premium ? 'free' : '$2.99'
    }
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.variants[this.selectedVariant].ID)
    },
    updateProduct(index) {
      this.selectedVariant = index
    },
    removeFromCart() {
      this.$emit('removeFromCart', this.variants[this.selectedVariant].ID)
    }
  }
}
</script>

<style>
.product {
  display: flex;
  flex-flow: wrap;
  padding: 1rem;
}
img {
  border: 1px solid #d8d8d8;
  width: 70%;
  margin: 40px;
  box-shadow: 0px 0.5px 1px #d8d8d8;
}
.product-image {
  width: 80%;
}
.product-image,
.product-info {
  margin-top: 10px;
  width: 50%;
}
.color-box {
  width: 40px;
  height: 40px;
  margin-top: 5px;
  display: inline-block;
  margin-right: 5px;
}

button {
  margin-top: 10px;
  border: none;
  background-color: #1e95ea;
  color: white;
  height: 40px;
  width: 130px;
  font-size: 14px;
  margin-right: 5px;
}
.disabledButton {
  background-color: #d8d8d8;
}
</style>
