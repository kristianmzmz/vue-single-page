Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
          <img :src="image" />
        </div>
  
        <div class="product-info">
            <h1>{{ product }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
  
            <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>
  
            <div class="color-box"
                 v-for="(variant, index) in variants" 
                 :key="variant.ID"
                 :style="{ backgroundColor: variant.color }"
                 @mouseover="updateProduct(index)">
            </div> 
  
            <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }">
            Add to cart
            </button>

            <button @click="removeFromCart">
            Remove from cart
            </button>
  
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
                },
            ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {  
            this.selectedVariant = index
        },
        removeFromCart() {
             this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
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
