import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Owner from './views/Owner.vue'
import Profile from './views/Profile.vue'
import Search from './views/Search.vue'
import DogProfile from './components/DogProfile.vue'

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
      name: 'owner',
      component: Owner
    },

    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },

    {
      path: '/profile/dogs/:dogId',
      name: 'dogprofile',
      component: DogProfile
    },

    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
