import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Movies from '../views/Movies.vue'
import Movie from '../views/Movie.vue'
import Actor from '../views/Actor.vue'
import Tv from '../views/Tv.vue'
import TvListing from '../views/TvListing.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/movies/',
    name: 'Movies',
    component: Movies,
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie,
  },
  {
    path: '/tv/',
    name: 'TvListing',
    component: TvListing,
  },
  {
    path: '/tv/:id',
    name: 'Tv',
    component: Tv,
  },
  {
    path: '/actors/:id',
    name: 'Actor',
    component: Actor,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
