import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductDetails from '@/views/ProductDetails.vue'
import HelloWorld from '@/views/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: HelloWorld
  },
  {
    name: 'product-details',
    path: '/product-details',
    component: ProductDetails
  },
]

const router = new VueRouter({
  routes
})

export default router