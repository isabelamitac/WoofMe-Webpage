import dogsComponent from '../src/components/Dogs.vue'
<template>
  <div class="container">
    <b-jumbotron
      header="Dog Sitter Profile"
      lead="Welcome to your profile section"
    >
      <div class="profile-info">
        <input
          type="text"
          placeholder="Your ID"
          v-model="userInput"
          @click="getDogsitterInfo"
          required
        />
        <table>
          <tr>
            <th>Name:</th>
            <td v-if="dogsitter != null">{{ dogsitter.name }}</td>
          </tr>
          <tr>
            <th>Location:</th>
            <td v-if="dogsitter != null">{{ dogsitter.location }}</td>
          </tr>
          <tr>
            <th>Rating:</th>
            <td v-if="dogsitter != null">{{ dogsitter.rating }}</td>
          </tr>
          <tr>
            <td v-show="loggedIn">Edit profile</td>
          </tr>
          <b-button class="btn_message cta-btn" v-on:click="getDogsitterInfo()"
            >See your profile</b-button
          >
        </table>
      </div>
    </b-jumbotron>
    <div class="recent-dogs">
      <dogsComponent />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'dogsitter',
  props: {
    dogsitterId: String
  },
  data() {
    return {
      dogsitter: '',
      loggedIn: false,
      userInput: '',
      password: '',
      admin: {},
      message: 'none'
    }
  },
  methods: {
    getDogsitterInfo() {
      const dogsitterID = this.userInput
      Api.get(`/dogsitters/${dogsitterID}`)
        .then((res) => {
          this.dogsitter = res.data
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    createDogsitter() {
      Api.post('/dogsitters')
        .then((response) => {
          this.message = response.data.message
        })
        .catch((error) => {
          this.message = error
        })
    }
  },
  mounted() {
    this.getDogsitterInfo()
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
.btn_message {
  margin-top: 10px;
}
.dogsitterContainer {
  display: grid;
  grid-template-columns: 50% 25% 25%;
  height: 150px;
}
.dogsitterInfo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.recentDogs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
