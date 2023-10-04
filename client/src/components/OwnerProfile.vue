<template>
    <div class="container">
      <h1>Profile of {{ owner.name }}</h1>
      <div class="profile">
        <div class="dog-info">
          <img :src = "profilePhotoURL" class="profile-photo">
            <table>
                <tr>
                <th>Name: </th>
                <td v-if="owner != null">{{ owner.name }}</td>
                </tr>
                <tr>
                <th>Email: </th>
                <td v-if="owner !=null">{{ owner.email }}</td>
                </tr>
                <tr>
                <th>Location: </th>
                <td v-if="owner !=null">{{ owner.location }}</td>
                </tr>
                <tr>
                <td v-show="loggedIn">Edit profile</td>
                </tr>
            </table>
        </div>
        <div class="dogs" v-for="dog in dogs" :key="dog.id">
            <div class="oneDog">
                <img :src = "dogPhotoURL" class="profile-photo"><br />
                <router-link :to="profileLink(dog._id)" id="resultBtn">{{ dog.name }}</router-link>
            </div>

            <div class="oneDog">
                <img :src = "dogPhotoURL" class="profile-photo"><br />
                <button class="cta-btn">Add dog</button>
            </div>

            <div class="oneDog">
                <img :src = "dogPhotoURL" class="profile-photo"><br />
                <button class="cta-btn">Add dog</button>
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
  name: 'ownerprofile',
  props: {
    ownerId: String
  },
  data() {
    return {
      dogPhotoURL: placeholder,
      profilePhotoURL: dogPlaceholder,
      loggedIn: false, // Access the dogId from route parameters
      owner: '',
      dogs: []
    }
  },
  created() {
    this.getOwnerInfo()
    this.getOwnersDogs()
  },
  methods: {
    getOwnerInfo() {
      // Fetch dog information based on this.dogId
      Api.get(`/owners/${this.ownerId}`)
        .then((res) => {
          this.owner = res.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getOwnersDogs() {
      Api.get(`/owners/${this.ownerId}/dogs`)
        .then((res) => {
          this.dogs = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    profileLink(id) {
      return { name: 'dogprofile', params: { dogId: id } }
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
