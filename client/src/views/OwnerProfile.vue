<template>
    <div>
      <b-jumbotron header="Owner Profile" lead="Welcome to your profile section">
        <b-button class="btn_message" variant="primary" v-on:click="createOwner()" >Create profile</b-button>
      <div class="editFields">
    <p class="urPost">Enter profile details below:</p>
    <input type="name" placeholder="name" v-model="name" required/> <br />
    <input type="location" placeholder="location" v-model="email" required/> <br />
    <input type="email" placeholder="email" v-model="location" required/> <br />
    </div>
    <br>
    <br/>
      </b-jumbotron>
</div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'owner-profile',
  data() {
    return {
      name: '',
      location: '',
      email: ''
    }
  },
  methods: {
    createOwner() {
      const newOwner = {
        name: this.name,
        location: this.location,
        email: this.email
      }
      Api.post('/owners', newOwner)
        .then(response => {
          this.newOwner = response.data
          this.stores = []
          this.stores.push(newOwner)
          console.log(response.data)
          this.$bvModal.msgBoxOk('Owner has been created!')
        })
        .catch(error => {
          this.message = error
        })
      console.log(newOwner)
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
