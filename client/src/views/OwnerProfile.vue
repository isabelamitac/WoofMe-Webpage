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
      </div>
    </div>
    <div class="container">
      <div class="radio">
    <p class="th">Update profile details below:</p>
    <input type="name" placeholder="name" v-model="name" required/> <br />
    <input type="location" placeholder="location" v-model="location" required/> <br />
    <input type="email" placeholder="email" v-model="email" required/> <br />
    </div>
    <br>
    <button class="second-btn" @click="updateOwner()" >Update profile</button> <br/>
    <br />
    <button class="second-btn" @click="deleteOwner()">Delete profile</button> <br />
    <br />
</div>
        <div class="dogs" v-for="dog in dogs" :key="dog.id">
            <div class="oneDog">
                <img :src = "dogPhotoURL" class="profile-photo"><br />
                <router-link :to="profileLink(dog._id)" id="resultBtn">{{ dog.name }}</router-link>
            </div>

            <div class="oneDog">
                <img :src = "dogPhotoURL" class="profile-photo"><br />
                <router-link :to="'/create-dog'" id="resultBtn">Add dog</router-link>
            </div>

            <div class="oneDog">
                <img :src = "dogPhotoURL" class="profile-photo"><br />
                <router-link :to="'/create-dog'" id="resultBtn">Add dog</router-link>
            </div>
        </div>
</div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
const ownerPlaceholder = require('../assets/default-profile.png')
const dogPlaceholder = require('../assets/default-dog-profile.png')
// import OwnerProfile from '../components/OwnerProfile.vue'

export default {
  name: 'owner-profile',
  data() {
    return {
      name: '',
      location: '',
      email: '',
      owner: {},
      profilePhotoURL: ownerPlaceholder,
      dogPhotoURL: dogPlaceholder
    }
  },
  created() {
    this.getOwnerInfo()
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
        ownerName: this.name || this.owner.name,
        location: this.location || this.owner.location,
        email: this.email || this.owner.email
      }
      Api.put(`/owners/${ownerId}`, newOwner).then((res) => {
        console.log(res)
        // this.$router.push('/adminhome', this.$router.go(0))
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
      Api.get(`/owners/${this.ownerId}/dogs`)
        .then((res) => {
          this.dogs = res.data
        })
        .catch((err) => {
          console.log(err)
        })
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
