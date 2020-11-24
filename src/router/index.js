import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/modelling',
    name: 'Modelling',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "modelling" */ '../views/Modelling.vue')
  },
  {
    path: '/buildScene',
    name: 'BuildScene',
    component: () => import(/* webpackChunkName: "modelling" */ '../views/BuildScene.vue')
  },
  {
    path: '/projectScene',
    name: 'ProjectScene',
    component: () => import(/* webpackChunkName: "modelling" */ '../views/ProjectScene.vue')
  },
  {
    path: '/measurement',
    name: 'Measurement',
    component: () => import(/* webpackChunkName: "modelling" */ '../views/Measurement.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
