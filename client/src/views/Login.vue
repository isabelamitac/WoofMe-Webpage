<template>
  <div class="container">
    <h1>Log in</h1>
    <div class="login-container">
      <div class="loginForm">
      <input type="email" placeholder="Email" v-model="email" required />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
      <button class="cta-btn">Log in</button>
      </div>
      <div class="formPic">
      <img id="loginPic" src="../assets/login1.png" />
      </div>
    </div>
    <img id="loginFewDogs" src="../assets/login2.jpg" />
      <h2 id="SUTitle">Sign up here!</h2>
      <div class="signup-container">
        <div class="signupForm">
          <p class="urPost">Enter profile details below:</p>
          <input
            type="name"
            placeholder="Name"
            v-model="name"
            required
          />
          <br />
          <input type="email" placeholder="Email" v-model="email" required />
          <br />
          <input type="text" placeholder="City" v-model="location" required />
          <br />
          <button class="cta-btn" @click="createOwner()">Sign up</button>
        </div>
        <div class="formPic">
        <img id="loginPic" src="../assets/login3.png"/>
        </div>
        <div>
      </div>
      </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'owner-profile',
  data() {
    return {
      name: '',
      location: '',
      email: '',
      newOwner: null,
      owner: {},
      dogs: []
    }
  },
  methods: {
    createOwner() {
      const newOwner = {
        name: this.name,
        location: this.location,
        email: this.email
      }
      Api.post('/owners', newOwner)
        .then(response => {
          this.newOwner = response.data
          this.stores = []
          this.stores.push(newOwner)
          console.log(response.data)
          this.$bvModal.msgBoxOk('Owner has been created!')
          const newOwnerId = this.newOwner._id
          localStorage.setItem('newOwnerId', newOwnerId)
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>
<style>
@import url('../assets/styles/style.css');
</style>
