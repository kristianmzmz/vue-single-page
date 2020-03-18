var app = new Vue({
    el: '#app',
    data: {
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
            },
            {
                variantId: 2235,
                variantColor: "blue",
                image: './assets/blue-socks.png',
                quantity: 0
            },
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + " " +  this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity > 0
        }
    }
})