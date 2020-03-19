Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div>
    <div class="product-image">
      <img v-bind:src="image" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">In stock</p>
      <p 
        v-else 
        :class="{ lineThrough: !inStock }">Out of Stock</p>
      <p>Shipping {{ shipping }}</p>
      <button 
          @click="addToCart" 
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }">Add to cart </button>
      <button @click="cart > 0 ? cart--  : 0">Remove from cart</button>

      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
      <div v-for="(variant, index) in variants" 
          class="color-box"
          :key="variant.variantId" 
          :style="{ 'backgroundColor': variant.variantColor }"
          @mouseover="updateProduct(index)">
      </div>
    </div>

  </div>
    `,
    data() {
        return {
            brand: 'Codurance',
            product: 'Socks',
            selectedVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2232,
                    variantColor: "green",
                    image: './assets/green-socks.png',
                    quantity: 10,
                    onSale: false
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    image: './assets/blue-socks.png',
                    quantity: 0,
                    onSale: true
                },
            ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart')
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product + this.onSale
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity > 0
        },
        onSale() {
            return this.variants[this.selectedVariant].onSale ? ' on sale' : '';
        },
        shipping() {
            return this.premium ? 'free' : '$2.99';
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: 0
    },
    methods: {
        updateCart() {
            this.cart += 1;
        },
    }
})
