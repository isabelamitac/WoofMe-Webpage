<template>
  <div class="container-full">
    <div class="login-container">
      <div class="loginForm">
        <h1>Log in</h1>
      <input type="email" placeholder="Email" v-model="emailLog" required />
      <input type="password" placeholder="Password" v-model="passwordLog" required/>
      <button class="cta-btn" id="scndBtn-blueBG" @click='loginOwner()'>Log in</button>
      </div>
      <div class='formPic'>
      <img id='loginPic' src='../assets/login1.png' />
      </div>
    </div>
    <img id='loginFewDogs' src='../assets/login2.jpg' />
      <div class='signup-container'>
        <div class='signupForm'>
          <h2 id='SUTitle'>Sign up here!</h2>
          <br />
          <input type='email' placeholder='Email' v-model='email' required />
          <br />
          <input type='password' placeholder='Password' v-model='password' required />
          <br />
          <input type='password' placeholder='Re-write your password' v-model='repassword' required />
          <br />
          <button class='cta-btn' @click='createOwner()'>Sign up</button>
        </div>
        <div class='formPic'>
        <img id='loginPic' src='../assets/login3.png'/>
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
      dogs: [],
      emailLog: '',
      passwordLog: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    createOwner() {
      if (this.password === this.repassword) {
        const newOwner = {
          email: this.email,
          password: this.password
        }
        Api.post('/owners/register', newOwner)
          .then(response => {
            this.newOwner = response.data
            this.stores = []
            this.stores.push(newOwner)
            console.log(response.data)
            this.$bvModal.msgBoxOk('Owner has been created!')
            const newOwnerId = this.newOwner._id
            localStorage.setItem('newOwnerId', newOwnerId)
            this.email = ''
            this.password = ''
            this.repassword = ''
          })
          .catch(error => {
            this.message = error
            if (error.request.status === 400) { // backend sends 400 on email already existing
              this.$bvModal.msgBoxOk('Owner with this email already exists. Please log in!')
              this.email = ''
              this.password = ''
              this.repassword = ''
            }
          })
      } else {
        this.password = ''
        this.repassword = ''
        this.$bvModal.msgBoxOk('Passwords are different. Please try again!')
        console.log('Unsuccessful registration. Please try again!')
      }
    },
    loginOwner() {
      const owner = {
        email: this.emailLog,
        password: this.passwordLog
      }
      Api.post('/owners/login', owner)
        .then(res => {
          if (res.status === 200) {
            console.log(res.data.id)
            localStorage.setItem('token', res.data.accessToken)
            localStorage.setItem('loggedInUserID', res.data.id)
            this.emailLog = ''
            this.passwordLog = ''
            this.$router.push('/owners/' + res.data.id)
          }
          console.log(res)
        })
        .catch(error => {
          if (error.request.status === 400) {
            console.log(error)
            this.$bvModal.msgBoxOk('Owner does not exist. Create an account first!')
          }
          if (error.request.status === 401) {
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
