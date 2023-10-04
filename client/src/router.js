import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import OwnerProfile from './views/OwnerProfile.vue'
import Profile from './views/Profile.vue'
import Search from './views/Search.vue'
import DogProfile from './components/DogProfile.vue'
import DogsitterProfile from './components/DogsitterProfile.vue'
import DogOwnerProfile from './components/OwnerProfile.vue'
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
      path: '/profile/:dogsitterId',
      name: 'dogsitterprofile',
      component: DogsitterProfile,
      props: true
    },

    {
      path: '/profile/:ownerId',
      name: 'ownerprofile',
      component: DogOwnerProfile,
      props: true
    },

    {
      path: '/profile/:id',
      name: 'dogsitter',
      component: Dogsitter
    },

    {
      path: '/search',
      name: 'search',
      component: Search
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
