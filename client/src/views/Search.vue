<template>
    <div class="container">
      <div>
        <h1>Search</h1>
        <p>What are you looking for?</p>

        <div class="allLabels">
          <button class="label" @click="getListOfOwners" >Dog owner</button>
          <button class="label" @click="getListOfDogsitters" >Dogsitter</button>
          <button class="label" @click="getListOfDogs" >Dog</button>
          <button class="label" @click="getListOfPlaydates" >Playdate</button>
          <hr />
        </div>

        <div class="results">
          <ul v-for="result in results" :key="result.id" v-show="message!='No results.'">
            <li class="oneResult">
              <img :src = "profilePhotoURL" class="profile-photo" id="resultProfilePhoto">
              {{ result.name }}<br />
              {{ result.location }}<br />
              {{ result.rating }}<br />
              <router-link :to="{ name: 'dogprofile', params: { dogId: result.id } }" id="resultBtn">View profile</router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
const placeholder = require('../assets/default-dog-profile.png')

export default {
  name: 'searchResult',
  data() {
    return {
      message: 'No results.',
      results: [],
      profilePhotoURL: placeholder,
      pressedBtn: false
    }
  },

  methods: {
    getListOfOwners() {
      Api.get('/owners')
        .then(res => {
          this.message = res.data
          this.results = res.data
          this.pressedBtn = true
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getListOfDogsitters() {
      Api.get('/dogsitters')
        .then(res => {
          this.message = res.data
          this.results = res.data
          this.pressedBtn = true
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getListOfDogs() {
      Api.get('/dogs')
        .then(res => {
          this.message = res.data
          this.results = res.data
          this.pressedBtn = true
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getListOfPlaydates() {
      Api.get('/playdates')
        .then(res => {
          this.message = res.data
          this.results = res.data
          this.pressedBtn = true
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
