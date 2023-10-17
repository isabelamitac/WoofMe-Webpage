<template>
    <div class="container-full">
        <div class="login-container">
            <div class="loginForm">
                <h1>Create a new playdate</h1>
                <input type="date" placeholder="Date" v-model="date" required/>
                <input type="time" placeholder="Time" v-model="time" required/>
                <input type="place" placeholder="Place" v-model="place" required/>
                <button class="second-btn" id="scndBtn-blueBG" @click="createPlaydate()" >Create new playdate</button>
            </div>

            <div class="formPic">
                <img id="loginPic" src="../assets/create-playdate.png"/>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'playdateCreation',
  data() {
    return {
      date: '',
      time: '',
      place: ''
    }
  },
  methods: {
    createPlaydate() {
      const ownerId = localStorage.getItem('newOwnerId')
      const newPlaydate = {
        ownerId,
        date: this.date,
        time: this.time,
        place: this.place
      }
      Api.post(`/owners/${ownerId}/playdates`, newPlaydate)
        .then(res => {
          this.newPlaydate = res.data
          this.stores = []
          this.stores.push(newPlaydate)
          console.log(res.newPlaydate)
          this.$bvModal.msgBoxOk('Playdate has been created!')
          const createdPlaydateId = res.data._id
          this.fetchDogProfile(createdPlaydateId)
          this.$router.push(`/owners/${ownerId}`, this.$router.go(0))
        })
        .catch(err => {
          this.message = err
        })
    }
  }
}

</script>

<style>
   @import url('../assets/styles/style.css');
</style>
