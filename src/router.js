import Vue from "vue"
import VueRouter from "vue-router"
import BuySocks from '@/views/BuySocks.vue'
import HelloWorld from '@/views/HelloWorld.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/buy-socks', component: BuySocks },
]

const router = new VueRouter({
  routes
})

export default router;
