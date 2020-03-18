var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/green-socks.png',
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2232,
                variantColor: "green"
            },
            {
                variantId: 2235,
                variantColor: "blue"
            },
        ]
    }
})