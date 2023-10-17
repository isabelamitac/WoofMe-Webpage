 <template>
     <div class="login-container">
      <div class="loginForm">
        <h1>Log in</h1>
        <input type="email" placeholder="Email" v-model="emailLog" required />
        <input type="password" placeholder="Password" v-model="passwordLog" required/>
        <button class="cta-btn" id="scndBtn-blueBG" @click='loginUser()'>Log in</button>
    </div>
        <div class='formPic'>
      <img id='loginPic' src='../assets/login1.png' />
      </div>
           </div>
</template>
<script>
import { Api } from '@/Api'

export default {
  name: 'login',
  props: {
    email: String,
    password: String
  },
  data() {
    return {
      emailLog: '',
      passwordLog: '',
      accessToken: ''
    }
  },
  created() {
    this.loginOwner()
  },
  methods: {
    loginUser() {
      const user = {
        email: this.emailLog,
        password: this.passwordLog
      }
      const currentURL = window.location.href
      // console.log(currentURL)
      if (currentURL.includes('/login')) {
        Api.post('/owners/login', user)
          .then(res => {
            if (res.status === 200) {
              console.log(res.data.id)
              localStorage.setItem('token', res.data.accessToken)
              localStorage.setItem('loggedInUserID', res.data.id)
              this.loggedIn = true
              this.emailLog = ''
              this.passwordLog = ''
              this.$router.push('/owners/' + res.data.id)
            }
            console.log(res)
          }, err => {
            this.$bvModal.msgBoxOk('Owner doesn\'t exist. Create an account first!')
            this.emailLog = ''
            this.passwordLog = ''
            console.log(err)
          })
      }
      if (currentURL.includes('/admin')) {
        Api.post('/admins/login', user)
          .then(res => {
            if (res.status === 200) {
              console.log(res.data.id)
              localStorage.setItem('token', res.data.accessToken)
              localStorage.setItem('loggedInUserID', res.data.id)
              this.loggedIn = true
              this.emailLog = ''
              this.passwordLog = ''
              this.$router.push('/admin' + res.data.id)
            }
            console.log(res)
          }, err => {
            this.$bvModal.msgBoxOk('Admin doesn\'t exist. Create an account first!')
            this.emailLog = ''
            this.passwordLog = ''
            console.log(err)
          })
      }
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
