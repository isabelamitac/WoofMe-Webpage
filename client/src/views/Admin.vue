<template>
    <div>
      <div class="container">
      <h1>Welcome to your admin page</h1>
    <br>
    <button class="second-btn" @click="deleteDogsitters()" >Delete all dogsitters</button> <br/>
    <br />
</div>
</div>
  </template>

<script>
import { Api } from '@/Api'

export default {
  name: 'admin',
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
