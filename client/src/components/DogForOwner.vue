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
                <img src="../assets/save.png" class="icons" @click="updateAge()"></td>
            </tr>
            <tr>
              <th>Diet: </th>
              <td v-if="dog!=null">{{ dog.diet }}</td>
            </tr>
            <tr>
              <th>Owner: </th>
              <td v-if="dog!=null">{{ ownerName }}</td>
            </tr>
          </table>
        </div>
     </div>
    </div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
const placeholder = require('../assets/default-dog-profile.png')
const icon = require('../assets/edit.png')

export default {
  name: 'dogforownerprofile',
  props: {
    dogId: String,
    dogs: Array
  },
  data() {
    return {
      profilePhotoURL: placeholder,
      edit: icon,
      loggedIn: false, // Access the dogId from route parameters
      dog: '',
      owner: '',
      ownerName: '',
      age: ''
    }
  },
  created() {
    this.getDogInfo()
  },
  methods: {
    getDogInfo() {
      Api.get(`/dogs/${this.dogId}`)
        .then((res) => {
          this.dog = res.data
          this.owner = res.data.ownerId
          console.log(this.owner)
          Api.get(`/owners/${this.owner}`)
            .then((ownerRes) => {
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
        location.reload()
      })
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
