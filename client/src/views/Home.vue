<template>
  <div class="container-full">
    <div class="section1">
      <div>
        <img :src = "image" class="siteImage">
      </div>
      <div class="home">
        <h1>Find your furry friends</h1>
        <input v-model="userInput" type="text" placeholder="What are you looking for?" required/>
        <router-link class="second-btn" to="/search">Search</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
const photo1 = require('../assets/home-1.jpg')

export default {
  name: 'home',
  data() {
    return {
      message: 'none',
      image: photo1
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
