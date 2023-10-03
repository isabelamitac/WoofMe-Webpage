import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import OwnerProfile from './views/OwnerProfile.vue'
import Profile from './views/Profile.vue'
import Search from './views/Search.vue'
import DogProfile from './components/DogProfile.vue'
import Dogsitter from './views/Dogsitter.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/owners',
      name: 'owner-profile',
      component: OwnerProfile
    },

    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },

    {
      path: '/profile/:dogId',
      name: 'dogprofile',
      component: DogProfile,
      props: true
    },

    {
      path: '/search',
      name: 'search',
      component: Search
    },

    {
      path: '/dogsitters/:id',
      name: 'dogsitter',
      component: Dogsitter
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
