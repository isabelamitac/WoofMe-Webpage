<template>
  <div class="container-full">
    <div class="login-container">
      <div class="loginForm">
        <h1>Log in</h1>
      <input type="email" placeholder="Email" v-model="emailLog" required />
      <input type="password" placeholder="Password" v-model="passwordLog" required/>
      <button class="cta-btn" @click='loginOwner()'>Log in</button>
      </div>
      <div class='formPic'>
      <img id='loginPic' src='../assets/login1.png' />
      </div>
    </div>
    <img id="loginFewDogs" src="../assets/login2.jpg" />
      <div class="signup-container">
        <div class="signupForm">
          <h2 id="SUTitle">Sign up here!</h2>
          <p class="urPost">Enter profile details below:</p>
          <input
            type="name"
            placeholder="Name"
            v-model="name"
            required
          />
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
      dogs: []
    }
  },
  methods: {
    createOwner() {
      let owners = []
      owners = Api.get('/owners')
      owners.forEach(owner => {
        if (owner.email === this.email) {
          console.los('Owner already exists. Please log in!')
          location.reload()
        }
      })
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
            localStorage.setItem('token', res.token)
            this.emailLog = ''
            this.passwordLog = ''
            // eslint-disable-next-line no-trailing-spaces
            // console.log(ownerInfo)
            // const ownerId = ownerInfo.config._id
            this.$router.push('/owners')
          }
          if (res.status !== 200) {
            this.$bvModal.msgBoxOk('Owner doesn\'t exist. Create an account first!')
          }
          console.log(res)
        }, err => {
          this.$bvModal.msgBoxOk('Owner doesn\'t exist. Create an account first!')
          console.log(err)
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
