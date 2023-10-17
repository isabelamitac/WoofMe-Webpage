<template>
    <img @cliclk='logOut()' src ="../assets/logout.png" class="logout">
</template>

<script>
// const icon = require('../assets/logout.png')
export default ({
  name: 'logout',
  data() {
    return {

    }
  },
  methods: {
    logOut() {
      this.$bvModal.msgBoxOk('User logged out!')
      // loggedIn: false
      localStorage.setItem('token', '')
      localStorage.setItem('loggedInUserID', '')
    }
  }
})
</script>
