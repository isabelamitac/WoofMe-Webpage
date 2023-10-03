<template>
    <div class="container">
      <h1>Profile</h1>
      <input v-model="userInput" type="text" placeholder="Write the ID" required />
      <button class="second-btn" @click="navigateToDogProfile()">Find a profile</button>
     </div>
  </template>

<script>
// @ is an alias to /src
const placeholder = require('../assets/default-dog-profile.png')

export default {
  name: 'profile',
  data() {
    return {
      dog: '',
      profilePhotoURL: placeholder,
      loggedIn: false,
      userInput: ''
    }
  },
  methods: {
    navigateToDogProfile() {
      // Redirect to the dogprofile route with the provided dog ID
      this.$router.push({ name: 'dogprofile', params: { dogId: this.userInput } })
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
