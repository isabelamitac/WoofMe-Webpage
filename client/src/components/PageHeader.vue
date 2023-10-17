<template>
    <div class="header">
      <div class="top-bar">
        <router-link to="/admins/login"><img src="../assets/admin.png" class="icons"></router-link>
      </div>
      <img class="top-logo" src="../assets/woof-me-logo.png">
        <div class="navbar">
            <router-link class="navlink" to="/">Home</router-link>
            <router-link class="navlink" :to="getPath()">Profile</router-link>
            <router-link class="navlink" to="/search">Search</router-link>
            <router-link class="navlink" to="/chat">Chat</router-link>
            <router-link class="navlink" to="/about-us">About us</router-link>
            <log-out></log-out>
        </div>
    </div>
</template>

<script>
import LogOut from './LogOut.vue'

export default {
  name: 'PageHeader',
  components: {
    LogOut
  // },
  // methods: {
  //   getPath() {
  //     let path = ''
  //     const userID = localStorage.getItem('loggedInUserID')
  //     if (userID) {
  //       path = `/owners/${userID}`
  //     } else {
  //       path = '/login'
  //     }
  //     return path
  //   }
  }
}
</script>

<style>

.header {
    width: 100%;
    margin: 5em auto;
    text-align: center;
  }

  .top-bar {
    position: absolute;
    padding: 1rem 2rem;
    top: 0;
    right: 0;
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

    .navlink {
    letter-spacing: normal;
    font-size: .8rem;
    }

    .header {
      margin: 1em auto;
    }
  }
</style>
