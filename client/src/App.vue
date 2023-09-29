<template>
  <div id="app">
    <div class="header">
      <img class="top-logo" src="./assets/woof-me-logo.png">
      </div>
      <div class="navbar">
        <router-link class="navlink" to="/">Home</router-link>
        <router-link class="navlink" to="/dogs">Profile</router-link>
        <router-link class="navlink" to="/search">Search</router-link>
        <router-link class="navlink" to="/chat">Chat</router-link>
        <router-link class="navlink" to="/about-us">About us</router-link>
      </div>
    <!-- Render the content of the current page view -->
    <router-view/>
      <div class="footer">
          <img class="footer-logo" src="./assets/woofme-white.png">
      </div>
    </div>
</template>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}*/
  .header {
    width: 100%;
    margin: 5em auto;
    display: flex;
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
  }

  .footer {
    background-color: #4B6F6F;
    color: #ffffff;
    margin: 10% auto 0 auto;
    text-align: center;
  }

  .footer-logo {
    max-width: 15%;
    margin: 10em 5em;
  }
</style>
