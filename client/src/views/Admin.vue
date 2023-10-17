<template>
  <div class="container">
    <h1>Admin settings</h1>
      <div v-show="loggedIn">
        <button class="second-btn" id="deleteBtn" @click="deleteDogsitters()">Delete all dogsitters</button>
      </div>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'admin',
  components: {
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
