<template>
    <div class="container">
      <h1>Dog Profile</h1>
      <input v-model="userInput" type="text" placeholder="Write the dog's id" required/>
      <button class="second-btn" @click="getDogInfo">Find a dog</button>
      <div class="profile">
        <div class="dog-photo">
          <img :src = "profilePhotoURL" class="profile-photo">
        </div>
        <div class="dog-info">
        <table>
            <tr>
              <th>Name: </th>
              <td v-if="dog!=null">{{ dog.name }}</td>
            </tr>
            <tr>
              <th>Breed: </th>
              <td v-if="dog!=null">{{ dog.breed }}</td>
            </tr>
            <tr>
              <th>Age: </th>
              <td v-if="dog!=null">{{ dog.age }}</td>
            </tr>
            <tr>
              <th>Diet: </th>
              <td v-if="dog!=null">{{ dog.diet }}</td>
            </tr>
            <tr>
              <th>Owner: </th>
              <td v-if="dog!=null">{{ dog.ownerId }}</td>
            </tr>
            <tr>
              <td v-show="loggedIn">Edit profile</td>
            </tr>
          </table>
        </div>
     </div>

     <div class="cta">
        <h2>Wanna be my dogsitter?</h2>
        <button class="cta-btn">Contact the owner</button>
     </div>
    </div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
const placeholder = require('../assets/default-dog-profile.png')

export default {
  name: 'DogProfile',
  data() {
    return {
      dog: '',
      profilePhotoURL: placeholder,
      loggedIn: false,
      userInput: ''
    }
  },
  methods: {
    getDogInfo() {
      const dogID = this.userInput
      Api.get(`/dogs/${dogID}`)
        .then(res => {
          this.dog = res.data
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getDogInfo()
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
