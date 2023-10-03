<template>
  <div class="container">
    <h1>Log in</h1>
    <div class="login-container">
      <input type="email" placeholder="Email" v-model="email" required />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
      <button class="cta-btn">Log in</button>
      <img />
      <div class="sign-up-container">
        <b-jumbotron header="Sign up here!">
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
          <input
            type="password"
            placeholder="Re-write the password"
            v-model="passwordRep"
            required
          />
        </b-jumbotron>
      </div>
    </div>
  </div>
</template>

<style>
@import url('../assets/styles/style.css');
</style>
