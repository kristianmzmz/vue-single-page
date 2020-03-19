var eventBus = new Vue()

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
            <product-tabs :shipping="shipping" :details="details"></product-tabs>

            <div
                class="color-box"
                v-for="(variant, index) in variants"
                :key="variant.ID"
                :style="{ backgroundColor: variant.color }"
                @mouseover="updateProduct(index)">
            </div>

            <div class="buttons">
                <button
                    v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">
                    Add to cart
                </button>
                <button @click="removeFromCart">
                    Remove from cart
                </button>
            </div>

            <review-tabs :reviews="reviews"></review-tabs>
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
            return this.variants[this.selectedVariant].onSale ? ' on sale' : ''
        },
        shipping() {
            return this.premium ? 'free' : '$2.99'
        }
    },
    mounted() {
        eventBus.$on('review-submitted', submittedProductReview => {
            this.reviews.push(submittedProductReview)
        })
    }
})

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
            <input
                id="recommend-yes"
                type="radio"
                v-model="recommend"
                value="yes">
            <label for="recommend-no">No</label>
            <input
                id="recommend-no"
                type="radio"
                v-model="recommend"
                value="no">
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
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if (!this.name) this.errors.push("Name is required")
                if (!this.rating) this.errors.push("Rating is required")
                if (!this.review) this.errors.push("Review is required")
                if (!this.recommend) this.errors.push("Recommend is required")
            }
        }
    }
})

Vue.component('product-tabs', {
    props: {
        shipping: {
            type: String,
            required: true
        },
        details: {
            type: Array,
            required: true
        },
    },
    template: `
    <div>
        <span
            class="tab"
            :class="{activeTab: selectedTab === index}"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = index">
            {{ tab }}
        </span>

        <div v-show="selectedTab === 0">
            <p>Shipping: {{ shipping }}</p>
        </div>

        <div v-show="selectedTab === 1">
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>

        </product-review>
    </div>
    `,
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 0
        }
    }
})

Vue.component('review-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
    <div>
        <span
            class="tab"
            :class="{activeTab: selectedTab === index}"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = index">
            {{ tab }}
        </span>

        <div v-show="selectedTab === 0">
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }} ({{ review.rating }})</p>
                    <p>Review: {{ review.review }}</p>
                    <p>Recommend: {{ review.recommend }}</p>
                </li>
            </ul>
        </div>

        <product-review v-show="selectedTab === 1">
        </product-review>
    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a review'],
            selectedTab: 0
        }
    }
})

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
                    this.cart.splice(i, 1)
                }
            }
        }
    }
})
