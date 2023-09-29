<template>
    <div>
      <b-jumbotron header="Woof Me" lead="Search">
        <b-button class="btn_message" variant="primary" v-on:click="getListOfDogsitters()" >Dogsitter</b-button>
        <p>{{ name }}</p>
      </b-jumbotron>
    </div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'dogsitter',
  data() {
    return {
      name: '',
      dateAvailable: '',
      timeAvailable: '',
      location: '',
      rating: ''
    }
  },

  methods: {
    getListOfDogsitters() {
      Api.get('/dogsitters')
        .then(res => {
          const dogsitterRes = res.data.data
          this.dogsitter.name = dogsitterRes.name
          this.dogsitter.dateAvailable = dogsitterRes.dateAvailable
          this.dogsitter.timeAvailable = dogsitterRes.timeAvailable
          this.dogsitter.location = dogsitterRes.location
          this.dogsitter.rating = dogsitterRes.rating
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
