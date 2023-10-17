<template>
    <div class="header">
      <img class="top-logo" src="../assets/woof-me-logo.png">
      <log-out></log-out>
        <div class="navbar">
            <router-link class="navlink" to="/">Home</router-link>
            <router-link class="navlink" to="/login">Profile</router-link>
            <router-link class="navlink" to="/search">Search</router-link>
            <router-link class="navlink" to="/chat">Chat</router-link>
            <router-link class="navlink" to="/about-us">About us</router-link>
        </div>
    </div>
</template>

<script>
import LogOut from './LogOut.vue'
// import LogOutVue from './LogOut.vue'

export default {
  name: 'PageHeader',
  components: {
    LogOut
  }
}
</script>

<style>
.header {
    width: 100%;
    margin: 5em auto;
    text-align: center;
  }

  .top-logo {
    max-width: 100%;
    width: 200px;
    margin: 2em auto;
  }

  .navbar {
    width: 50%;
    margin: 20px auto;
    display: flex;
  }

  .navlink {
    color: #000000;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 0.1rem;
  }

  .navlink:hover {
    text-decoration: none;
    color: #4b6f6f;
    transition: .3s ease;
  }

  @media only screen and (max-width: 900px) {
    .navbar {
      width: 90%;
      margin: 1rem auto;
    }
  }
</style>
