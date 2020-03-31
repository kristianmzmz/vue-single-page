import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        updateCart(state) {
            state.cart.push(state.id)
        },
        removeItem(state) {
            for (var i = state.cart.length - 1; i >= 0; i--) {
                if (state.cart[i] === state.id) {
                    state.cart.splice(i, 1)
                }
            }
        }
    }
})

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App),
})
