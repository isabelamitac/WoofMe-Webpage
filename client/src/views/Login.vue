<template>
  <div class="container-full">
    <login></login>
    <img id='loginFewDogs' src='../assets/login2.jpg' />
      <div class='signup-container'>
        <div class='signupForm'>
          <h2 id='SUTitle'>Sign up here!</h2>
          <p class='urPost'>Enter profile details below:</p>
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
      </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Login from '../components/Login.vue'

export default {
  name: 'owner-profile',
  components: {
    Login
  },
  data() {
    return {
      name: '',
      location: '',
      email: '',
      newOwner: null,
      owner: {},
      dogs: [],
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
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
