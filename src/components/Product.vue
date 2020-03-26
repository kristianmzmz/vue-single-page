<template>
  <div class="product">
    <div class="product-image">
      <img :src="image">
    </div>

    <div class="product-info">
      <h1>{{ product }}</h1>
      <p v-if="inStock">
        In Stock
      </p>
      <p v-else>
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
        >
          Add to cart
        </button>
        <button @click="removeFromCart">
          Remove from cart
        </button>
      </div>

      <review-tabs :reviews="reviews" />
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js';
import ProductTabs from './ProductTabs.vue';
import ReviewTabs from './ReviewTabs.vue';

export default {
  name: 'Product',
  components: {
    ProductTabs,
    ReviewTabs
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
          quantity: 1
        }
      ],
      reviews: []
    };
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product + this.onSale;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity > 0;
    },
    onSale() {
      return this.variants[this.selectedVariant].onSale ? ' on sale' : '';
    },
    shipping() {
      return this.premium ? 'free' : '$2.99';
    }
  },
  mounted() {
    EventBus.$on('review-submitted', submittedProductReview => {
      this.reviews.push(submittedProductReview);
    });
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].ID);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].ID);
    }
  }
};
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