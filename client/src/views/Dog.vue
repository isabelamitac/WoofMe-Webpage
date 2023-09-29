<template>
    <div>
      <b-jumbotron header="Woof Me" lead="Dog Profile">
        <b-button class="btn_message" variant="primary" v-on:click="getDog()" >Dog profile</b-button>
      </b-jumbotron>
      <div class="dog-profile">
        <img :src = "defaultPhoto">
      </div>
      <div class="dog-info">
      <table>
          <tr>
            <th>Name: </th>
            <td>{{ name }}</td>
          </tr>
          <tr>
            <th>Breed: </th>
            <td>{{ breed }}</td>
          </tr>
          <tr>
            <th>Age: </th>
            <td>{{ age }}</td>
          </tr>
          <tr>
            <th>Diet: </th>
            <td>{{ diet }}</td>
          </tr>
          <tr>
            <th>Owner: </th>
            <td>{{ owner }}</td>
          </tr>
          <tr>
            <td v-show="loggedIn">Edit profile</td>
          </tr>
        </table>
      </div>
    </div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'dog',
  data() {
    return {
      name: '',
      breed: '',
      age: '',
      diet: '',
      owner: '',
      defaultPhoto: './assets/default-dog-profile.png',
      loggedIn: false
    }
  },
  methods: {
    getDogInfo() {
      Api.get('dogs/:id')
        .then(response => {
          this.name = response.data.name
        })
        .catch(error => {
          this.name = error
        })
    }
  }
}
</script>

  <style>
  .btn_message {
    margin-bottom: 1em;
  }

  .dog-profile .dog-info {
    display: flex;
  }
  </style>
