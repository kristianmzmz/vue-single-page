import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BuySocks from '@/views/BuySocks.vue'
import HelloWorld from '@/views/HelloWorld.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/buy-socks', component: BuySocks },
    { path: '/', component: HelloWorld },
]

const router = new VueRouter({
    routes
})

new Vue({
    router,
    el: '#app',
    render: h => h(App),
})