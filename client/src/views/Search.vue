<template>
  <div class="container">
    <div>
      <h1>Search</h1>
      <p>What are you looking for?</p>

      <div class="allLabels">
        <button class="label" @click="setSearchCategory('owners')">Dog owner</button>
        <button class="label" @click="setSearchCategory('dogsitters')">Dogsitter</button>
        <button class="label" @click="setSearchCategory('dogs')">Dog</button>
        <button class="label" @click="setSearchCategory('playdates')">Playdate</button>
        <hr />
      </div>

      <div class="results">
        <ul v-for="result in results" :key="result._id" v-show="message !== 'No results.'">
          <li class="oneResult">
            <img :src="profilePhotoURL" class="profile-photo" id="resultProfilePhoto" />
            {{ result.name }}<br />

            <template v-if="currentSearchCategory === 'dogs'">
              {{ result.age }} years<br />
              {{ result.breed }}
            </template>
            <template v-else-if="currentSearchCategory === 'owners'">
              {{ result.location }}<br />
            </template>
            <template v-else-if="currentSearchCategory === 'playdates'">
              {{ result.date }} {{ result.time }}<br />
              {{ result.location }}<br />
              Playdate created by {{ result.creatorId }}
            </template>
            <template v-else>
              {{ result.location }}<br />
              Rating: {{ result.rating }}
            </template>
            <router-link :to="profileLink(result._id)" id="resultBtn">View profile</router-link>
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
  name: 'search',
  data() {
    return {
      message: 'No results.',
      results: [],
      profilePhotoURL: placeholder,
      pressedBtn: false,
      currentSearchCategory: '' // Track the current search category
    }
  },

  methods: {
    setSearchCategory(category) {
      this.currentSearchCategory = category // Set the current search category
      this.fetchResults() // Fetch results based on the selected category
    },

    fetchResults() {
      // Use this.currentSearchCategory to determine the API endpoint
      let endpoint = ''
      switch (this.currentSearchCategory) {
        case 'owners':
          endpoint = '/owners'
          break
        case 'dogsitters':
          endpoint = '/dogsitters'
          break
        case 'dogs':
          endpoint = '/dogs'
          break
        case 'playdates':
          endpoint = '/playdates'
          break
        default:
          break
      }

      // Fetch results based on the selected category
      Api.get(endpoint)
        .then(res => {
          this.message = res.data
          this.results = res.data
          this.pressedBtn = true
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    profileLink(id) {
      // Generate the profile link based on the current search category and dogId
      switch (this.currentSearchCategory) {
        case 'owners':
          return { name: 'ownerprofile', params: { ownerId: id } }
        case 'dogsitters':
          return { name: 'dogsitterprofile', params: { dogsitterId: id } }
        case 'dogs':
          return { name: 'dogprofile', params: { dogId: id } }
        case 'playdates':
          return { name: 'playdateprofile', params: { playdateId: id } }
        default:
          return '' // Handle the default case as needed
      }
    }
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
