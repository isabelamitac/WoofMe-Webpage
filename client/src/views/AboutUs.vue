<template>
    <div class="container">
        <h1 style="text-align: center;">On a mission to connect dog owners</h1>
        <div class="aboutUs">
          <img :src = "image" class="siteImage" id="aboutUs">
          <p class="text">At Woof Me, our mission is to connect dog owners with playmates for their furry companions and provide a platform for finding trustworthy dog sitters when needed. Whether you're a proud pup parent seeking a playdate for your four-legged friend or require a reliable dog sitter while you're away, Woof Me has got you covered.</p>
      </div>
    </div>
  </template>

<script>
const photo = require('../assets/aboutus.jpeg')

export default {
  name: 'about-us',
  data() {
    return {
      message: 'none',
      image: photo
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
