<template>
  <div class="container-full">
    <div class="admin-container">
      <div class="loginForm">
        <h1 style="color: #ffffff;">Admin login</h1>
      <input type="email" placeholder="Email" v-model="email" required />
      <input type="password" placeholder="Password" v-model="password" required/>
      <button class="cta-btn" id="admin-btn" @click='loginAdmin()'>Log in</button>
      </div>
      <div class='formPic'>
      <img id='loginPic' src='../assets/admin-login.png' />
      </div>
    </div>
    <img id='loginFewDogs' src='../assets/admin-login2.jpg' />
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'admin-login',
  data() {
    return {
      newAdmin: null,
      admin: {},
      email: '',
      password: ''
    }
  },
  methods: {
    loginAdmin() {
      const admin = {
        email: this.email,
        password: this.password
      }
      Api.post('/admins/login', admin)
        .then(res => {
          if (res.status === 200) {
            console.log('Successful login.')
            console.log(res.data.id)
            localStorage.setItem('token', res.data.accessToken)
            localStorage.setItem('loggedInUserID', res.data.id)
            this.email = ''
            this.password = ''
            this.$router.push('/admin')
          }
          console.log(res)
        })
        .catch(error => {
          if (error === 'Admin doesn\'t exist.') {
            console.log(error)
            this.$bvModal.msgBoxOk('Admin doesn\'t exist. Create an account first!')
          }
          if (error === 'Incorrect password') {
            console.log(error)
            this.$bvModal.msgBoxOk('Password is incorrect. Please try again')
          } else {
            this.$bvModal.msgBoxOk('Something went wrong. Please try again')
            console.log(error)
          }
          this.emailLog = ''
          this.passwordLog = ''
        })
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
