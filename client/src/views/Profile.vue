<template>
    <div class="container">
      <DogProfile />
     </div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import DogProfile from '../components/DogProfile.vue'
const placeholder = require('../assets/default-dog-profile.png')

export default {
  name: 'profile',
  data() {
    return {
      dog: '',
      profilePhotoURL: placeholder,
      loggedIn: false,
      userInput: ''
    }
  },
  components: {
    DogProfile
  },
  methods: {
    getDogInfo() {
      const dogID = this.userInput
      Api.get(`/dogs/${dogID}`)
        .then(res => {
          this.dog = res.data
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getDogInfo()
  }
}
</script>

<style>
@import url('../assets/styles/style.css');
</style>
