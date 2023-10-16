import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import OwnerProfile from './views/OwnerProfile.vue'
import Search from './views/Search.vue'
import DogProfile from './components/DogProfile.vue'
import DogsitterProfile from './components/DogsitterProfile.vue'
import DogOwnerProfile from './components/OwnerProfile.vue'
import CreateDog from './components/CreateDog.vue'
import DogForOwner from './components/DogForOwner'
import Dogsitter from './views/DogsitterProfile.vue'
import Login from './views/Login.vue'
import Admin from './views/Admin.vue'

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
      path: '/owners/:id',
      name: 'owner-profile',
      component: OwnerProfile
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
      path: '/create-dog',
      name: 'dogCreation',
      component: CreateDog
    },

    {
      path: '/dog-for-owner',
      name: 'dogforowner',
      component: DogForOwner,
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
    },

    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
