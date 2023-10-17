<template>
    <div>
      <div class="container">
      <h1>Welcome to your admin page</h1>
    <br>
    <login></login>
    <br />
    <div v-show="loggedIn">
    <button class="second-btn" @click="deleteDogsitters()" >Delete all dogsitters</button> <br/>
    </div>
    <br />
</div>
</div>
  </template>

<script>
import { Api } from '@/Api'
import Login from '../components/Login.vue'

export default {
  name: 'admin',
  components: {
    Login
  },
  data() {
    return {
      name: '',
      email: ''
    }
  },
  methods: {
    deleteDogsitters() {
      Api.delete('/dogsitters')
        .then((res) => {
          localStorage.clear()
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>

<style>
   @import url('../assets/styles/style.css');
</style>
