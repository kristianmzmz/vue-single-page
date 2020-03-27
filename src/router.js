import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "HelloWorld" */ '@/views/HelloWorld.vue')
  },
  {
    name: 'product-details',
    path: '/product-details',
    component: () => import(/* webpackChunkName: "ProductDetails" */ '@/views/ProductDetails.vue')
  },
  {
    name: 'product-review',
    path: '/product-review',
    component: () => import(/* webpackChunkName: "ProductReview" */ '@/views/ProductReview.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router