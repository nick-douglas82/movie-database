import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Movie from '../views/Movie.vue'
import Actor from '../views/Actor.vue'
import Tv from '../views/Tv.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie,
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
