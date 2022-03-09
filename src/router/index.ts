import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
  },
  {
    path: '/lists',
    name: 'Lists',
    component: () => import(/* webpackChunkName: "Lists" */ '../views/Lists.vue'),
  },
  {
    path: '/movies/',
    name: 'Movies',
    component: () => import(/* webpackChunkName: "Movies" */ '../views/Movies.vue'),
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () => import(/* webpackChunkName: "HoMovieme" */ '../views/Movie.vue'),
  },
  {
    path: '/tv/',
    name: 'TvListing',
    component: () => import(/* webpackChunkName: "TvListing" */ '../views/TvListing.vue'),
  },
  {
    path: '/tv/:id',
    name: 'Tv',
    component: () => import(/* webpackChunkName: "Tv" */ '../views/Tv.vue'),
  },
  {
    path: '/actors/:id',
    name: 'Actor',
    component: () => import(/* webpackChunkName: "Actor" */ '../views/Actor.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
