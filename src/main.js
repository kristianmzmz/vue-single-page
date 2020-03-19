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
  
            <div class="buttons">
                <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">
                    Add to cart
                </button>

                <button @click="removeFromCart">
                    Remove from cart
                </button>
            </div>

            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }} ({{ review.rating }})</p>
                        <p> Review: {{ review.review }}</p>
                        <p> Recommend: {{ review.recommend }}</p>
                    </li>
                </ul>
            </div>

            <product-review @submited-product-review="updateReviews"></product-review>
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
                    quantity: 1
                },
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].ID)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].ID)
        },
        updateReviews(productReview) {
            this.reviews.push(productReview)
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

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">Please correct the following error(s)</p>
        <ul>
            <li v-for="error in errors">
                <p>{{ error }}</p>
            </li>
        </ul>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>
            Would you recommend this product?
            <label for="recommend-yes">Yes</label>
            <input id="recommend-yes" type="radio" v-model="recommend" value="yes">
            <label for="recommend-no">No</label>
            <input id="recommend-no" type="radio" v-model="recommend" value="no">
        </p>
        <p>
            <input type="submit" id="submit">
        </p>
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.rating && this.review && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('submited-product-review', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            } else {
                if (!this.name) this.errors.push("Name is required")
                if (!this.rating) this.errors.push("Rating is required")
                if (!this.review) this.errors.push("Review is required")
                if (!this.recommend) this.errors.push("Recommend is required")
            }
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for (var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})
