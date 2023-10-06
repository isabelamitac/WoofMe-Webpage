<template>
    <div class="container">
      <h1>Profile of {{ dog.name }}</h1>
      <div class="profile">
        <div class="dog-info">
          <img :src = "this.profilePhotoURL" class="profile-photo">
        <table>
            <tr>
              <th>Name: </th>
              <td v-if="dog != null">{{ dog.name }}</td>
            </tr>
            <tr>
              <th>Breed: </th>
              <td v-if="dog!=null">{{ dog.breed }}</td>
            </tr>
            <tr>
              <th>Age: </th>
              <td v-if="dog!=null">{{ dog.age }} <img :src="edit" class="icons">
                <input type="age" placeholder="Write new age" v-model="age" required/>
                <button class="second-btn" id="updateBtn" @click="updateAge()" >Save</button></td>
            </tr>
            <tr>
              <th>Diet: </th>
              <td v-if="dog!=null">{{ dog.diet }}</td>
            </tr>
            <tr>
              <th>Owner: </th>
              <td v-if="dog!=null">{{ ownerName }}</td>
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
const icon = require('../assets/edit.png')

export default {
  name: 'dogprofile',
  props: {
    dogId: String
  },
  data() {
    return {
      profilePhotoURL: placeholder,
      edit: icon,
      loggedIn: false, // Access the dogId from route parameters
      dog: '',
      owner: '',
      ownerName: ''
    }
  },
  created() {
    this.getDogInfo()
  },
  methods: {
    getDogInfo() {
      // Fetch dog information based on this.dogId
      Api.get(`/dogs/${this.dogId}`)
        .then((res) => {
          this.dog = res.data
          this.owner = res.data.ownerId
          console.log(this.owner)
          Api.get(`/owners/${this.owner}`)
            .then((ownerRes) => {
              console.log(this.ownerRes)
              this.ownerName = ownerRes.data.name
              console.log(this.ownerName)
            })
            .catch((err) => {
              console.error(err)
            })
        })
    },
    updateAge() {
      const newAge = {
        age: this.age || this.dog.age
      }
      Api.patch(`/dogs/${this.dogId}/age`, newAge).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
