<template>
    <img @click='logOut()' src ="../assets/logout.png" class="icons">
</template>

<script>

export default ({
  name: 'log-out',
  methods: {
    logOut() {
      this.$bvModal.msgBoxOk('User logged out!')
      localStorage.setItem('token', '')
      localStorage.setItem('loggedInUserID', '')
      this.$router.push('/')
    }
  }
})
</script>
