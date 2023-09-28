<template>
    <div>
      <b-jumbotron header="Owner Profile" lead="Welcome to your profile section">
        <b-button class="btn_message" variant="primary" v-on:click="createOwner()" >Create profile</b-button>
      <div class="editFields">
    <p class="urPost">Enter profile details below:</p>
    <input type="name" placeholder="name" v-model="adminName" required/> <br />
    <input type="email" placeholder="email" v-model="password" required/> <br />
    <input type="location" placeholder="location" v-model="email" required/> <br />
    </div>
    <br>
    <p>Profile created successfully!:<br/>
        {{ message }}</p>
      </b-jumbotron>
</div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'owner',
  data() {
    return {
      adminName: '',
      password: '',
      email: '',
      admin: {},
      message: 'none'
    }
  },
  methods: {
    createOwner() {
      Api.post('/owners')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },

    getOwner() {
      Api.get('/owners/:id')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },

    updateOwner() {
      Api.put('/owners/:id')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },

    deleteOwner() {
      Api.delete('/owners/:id')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },

    createDog() {
      Api.post('/owners/:id/dogs')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },

    getAllDogsForOwner() {
      Api.get('/owners/:id/dogs')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}

</script>

  <style>
  .btn_message {
    margin-bottom: 1em;
  }
  </style>
