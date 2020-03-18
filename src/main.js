var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/green-socks.png',
        inStock: false,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2232,
                variantColor: "green",
                image: './assets/green-socks.png'
            },
            {
                variantId: 2235,
                variantColor: "blue",
                image: './assets/blue-socks.png'
            },
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        updateProduct(variantImage) {
            this.image = variantImage
        }
    }
})