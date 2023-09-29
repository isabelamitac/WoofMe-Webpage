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
        </div>

        <div class="results">
          <ul>
            <li class="oneResult">
              <img :src = "profilePhotoURL" class="profile-photo" id="resultProfilePhoto">
              <ul v-for="dogsitter in dogsitters" :key="dogsitter.id">
                <li>{{ dogsitter.name }}</li>
                <li>{{ dogsitter.location }}</li>
                <li>{{ dogsitter.rating }}</li>
              </ul>
              <button id="resultBtn">Message</button>
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
      owners: [],
      dogsitters: [],
      dogs: [],
      playdates: [],
      profilePhotoURL: placeholder
    }
  },

  methods: {
    getListOfOwners() {
      Api.get('/owners')
        .then(res => {
          this.owners = res.data
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getListOfDogsitters() {
      Api.get('/dogsitters')
        .then(res => {
          this.dogsitters = res.data
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getListOfDogs() {
      Api.get('/dogs')
        .then(res => {
          this.dogs = res.data
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getListOfPlaydates() {
      Api.get('/playdates')
        .then(res => {
          this.playdates = res.data
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getListOfOwners()
    this.getListOfDogsitters()
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
