<template>
    <div>
      <div class="container">
      <h1>Welcome to your profile, {{ owner.name }}</h1>
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

        <h3>Update profile</h3>
        <input type="update" placeholder="Name" v-model="name" required/> <br />
        <input type="update" placeholder="Location" v-model="location" required/> <br />
        <input type="update" placeholder="Email" v-model="email" required/> <br />
        <button class="second-btn" id="saveBtn" @click="updateOwner()">Save changes</button>
        <button class="second-btn" id="saveBtn"><router-link to="/create-dog" id="link">Add dogs</router-link></button>
        <button class="second-btn" id="deleteBtn" @click="deleteOwner()">Delete profile</button>
      </div>
      <h2>Your dogs</h2>
      <div class="dogs">
        <div v-for="dog in dogs" :key="dog.id">
          <div class="oneDog">
            <img :src = "dogPhotoURL" style="width: 15rem;"><br />
            <h3>{{ dog.name }}</h3>
            <router-link :to="profileLink(dog._id)" id="editProfileBtn">Edit profile</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
const ownerPlaceholder = require('../assets/default-profile.png')
const dogPlaceholder = require('../assets/default-dog-profile.png')

export default {
  name: 'owner-profile',
  data() {
    return {
      name: '',
      location: '',
      email: '',
      owner: {},
      profilePhotoURL: ownerPlaceholder,
      dogPhotoURL: dogPlaceholder,
      dogs: []
    }
  },
  created() {
    this.getOwnerInfo()
    this.getOwnersDogs()
  },
  methods: {
    getOwnerInfo() {
      const ownerId = localStorage.getItem('newOwnerId')
      if (ownerId) {
        console.log('Owner ID:', ownerId)
      } else {
        console.error('Owner ID not found in localStorage. The owner may be logged out or the account is deleted.')
      }
      Api.get(`/owners/${ownerId}`)
        .then((res) => {
          this.owner = res.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    updateOwner() {
      const ownerId = localStorage.getItem('newOwnerId')
      const newOwner = {
        name: this.name || this.owner.name,
        location: this.location || this.owner.location,
        email: this.email || this.owner.email
      }
      Api.put(`/owners/${ownerId}`, newOwner).then((res) => {
        console.log(res)
        location.reload()
        // this.$router.push('/owners', this.$router.go(0))
      })
    },
    deleteOwner() {
      Api.delete(`/owners/${this.owner._id}`)
        .then((res) => {
          localStorage.clear()
          console.log(res)
          localStorage.removeItem('ownerId')
        //  this.$router.push('/login', this.$router.go(0))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getOwnersDogs() {
      const ownerId = localStorage.getItem('newOwnerId')
      Api.get(`/owners/${ownerId}/dogs`)
        .then((res) => {
          this.dogs = res.data
          console.log(res)
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
   .owner-info {
  background: #E8E8E8;
}
  </style>
