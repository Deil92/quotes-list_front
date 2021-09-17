import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/quote/:id',
    name: 'Quote',
    props: true,
    component: () => import('@/views/Quote.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('@/views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
