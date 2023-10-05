<template>
  <div class="container">
    <h1>Log in</h1>
    <div class="login-container">
      <div class="loginForm">
      <input type="email" placeholder="Email" v-model="email" required />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
      <button class="cta-btn">Log in</button>
      </div>
      <div class="formPic">
      <img id="loginPic" src="../assets/login-1.png" />
      </div>
    </div>
    <img id="loginFewDogs" src="../assets/login-2.png" />
      <h2 id="SUTitle">Sign up here!</h2>
      <div class="signup-container">
        <div class="signupForm">
          <p class="urPost">Enter profile details below:</p>
          <input
            type="name"
            placeholder="First name"
            v-model="adminName"
            required
          />
          <br />
          <input type="email" placeholder="Email" v-model="email" required />
          <br />
          <input type="text" placeholder="City" v-model="location" required />
          <br />
          <input
            type="text"
            placeholder="Country"
            v-model="location"
            required
          />
          <br />
          <input
            type="password"
            placeholder="Choose your password"
            v-model="password"
            required
          />
          <br />
          <input
            type="password"
            placeholder="Re-write the password"
            v-model="passwordRep"
            required
          />
          <button class="cta-btn">Sign up</button>
        </div>
        <div class="formPic">
        <img id="loginPic" src="../assets/signup-1.png"/>
        </div>
        <div>
      </div>
      </div>
  </div>
</template>

<style>
@import url('../assets/styles/style.css');
</style>
