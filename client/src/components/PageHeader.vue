<template>
    <div class="header">
      <img class="top-logo" src="../assets/woof-me-logo.png">
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
export default {
  name: 'PageHeader'
}
</script>

<style>
.header {
    width: 100%;
    margin: 5em auto;
    text-align: center;
  }

  .top-logo {
    max-width: 200px;
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
</style>
