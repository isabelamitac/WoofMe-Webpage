<template>
  <div class="container-full">
    <div class="login-container">
      <div class="login-fields">
        <h1>Log in</h1>
        <input type="email" placeholder="Email" v-model="email" required />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <button class="cta-btn">Log in</button>
        <br />
        <br />
        <p>Not yet a member? Sign up <a href="#signup">here!</a></p>
      </div>

      <div class="login-photo">
        <img :src = "loginPhoto" class="roundSiteImage">
      </div>
    </div>

    <img :src="loginPhoto2" class="photoFullWidth">

    <div class="login-container">
      <div class="login-fields">
      <h2 id="signup">Sign up here!</h2>
        <input
          type="name"
          placeholder="First name"
          v-model="adminName"
          required
        />
        <br />
        <input type="email" placeholder="Email" v-model="email" required />
        <br />
        <input type="text" placeholder="City" v-model="location" required />
        <br />
        <input
          type="text"
          placeholder="Country"
          v-model="location"
          required
        />
        <br />
        <input
          type="password"
          placeholder="Choose your password"
          v-model="password"
          required
        />
        <input
          type="password"
          placeholder="Re-write the password"
          v-model="passwordRep"
          required
        />
        <div class="radio">
          I'm a <input type="radio" id="dogowner" value="owner" v-model="picked" /> <label for="dogowner">Dog owner</label> <input type="radio" id="dogsitter" value="sitter" v-model="picked" /> <label for="dogsitter">Dog sitter</label>
        </div>
        <button class="cta-btn">Sign up</button>
      </div>

      <div class="login-photo">
        <img :src = "loginPhoto3" class="roundSiteImage">
      </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const picked = ref('Dog owner')
</script>

<script>
const loginPhoto = require('../assets/login1.png')
const loginPhoto2 = require('../assets/login2.jpg')
const loginPhoto3 = require('../assets/login3.png')

export default {
  name: 'login',
  data() {
    return {
      message: 'none',
      loginPhoto,
      loginPhoto2,
      loginPhoto3
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
