<template>
    <div class="container">
      <h1>Profile of dog sitter {{ dogsitter.name }}</h1>
      <div class="profile">
        <div class="dog-info">
          <img :src = "profilePhotoURL" class="profile-photo">
        <table>
            <tr>
              <th>Name: </th>
              <td v-if="dogsitter != null">{{ dogsitter.name }}</td>
            </tr>
            <tr>
              <th>Location: </th>
              <td v-if="dogsitter !=null">{{ dogsitter.location }}</td>
            </tr>
            <tr>
              <th>Date: </th>
              <td v-if="dogsitter !=null">{{ dogsitter.dateAvailable }}</td>
            </tr>
            <tr>
              <th>Time: </th>
              <td v-if="dogsitter !=null">{{ dogsitter.timeAvailable }}</td>
            </tr>
            <tr>
              <th>Rating: </th>
              <td v-if="dogsitter !=null">{{ dogsitter.rating }}</td>
            </tr>
          </table>
        </div>
        <div class="dogs" v-for="dog in dogs" :key="dog.id">
            <div class="oneDog">
                <img :src = "dogPhotoURL" class="profile-photo"><br />
                <router-link :to="'/create-dog'" id="resultBtn">{{ dog.name }}</router-link>
            </div>
        </div>
     </div>
    </div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
const placeholder = require('../assets/default-dog-profile.png')
const dogPlaceholder = require('../assets/default-profile.png')

export default {
  name: 'dogsitterprofile',
  props: {
    dogsitterId: String
  },
  data() {
    return {
      dogPhotoURL: placeholder,
      profilePhotoURL: dogPlaceholder,
      loggedIn: false, // Access the dogId from route parameters
      dogsitter: ''
    }
  },
  created() {
    this.getDogSitterInfo()
  },
  methods: {
    getDogSitterInfo() {
      // Fetch dog information based on this.dogId
      Api.get(`/dogsitters/${this.dogsitterId}`)
        .then((res) => {
          this.dogsitter = res.data
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
