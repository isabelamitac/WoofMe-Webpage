<template>
    <div class="container-full">
        <div class="login-container">
            <div class="loginForm" id="extraSidePadding">
                <h1>Create a new dog</h1>
                <input type="name" placeholder="Name" v-model="name" required/>
                <input type="breed" placeholder="Breed" v-model="breed" required/>
                <input type="age" placeholder="Age" v-model="age" required/>
                <input type="diet" placeholder="Diet" v-model="diet" required/>
                <input type="ownerId" placeholder="Owner's ID" v-model="ownerId" required/>
                <button class="second-btn" id="scndBtn-blueBG" @click="createDog()" >Create a new dog</button>
            </div>

            <div class="formPic">
                <img id="loginPic" src="../assets/login3.png"/>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'dogCreation',
  data() {
    return {
      name: '',
      breed: '',
      age: '',
      diet: '',
      ownerId: ''
    }
  },
  methods: {
    createDog() {
      const newDog = {
        ownerId: this.ownerId,
        age: this.age,
        name: this.name,
        breed: this.breed,
        diet: this.diet
      }
      Api.post(`/owners/${this.ownerId}/dogs`, newDog)
        .then(res => {
          this.newDog = res.data
          this.stores = []
          this.stores.push(newDog)
          console.log(res.data)
          this.$bvModal.msgBoxOk('Dog has been created!')
          const createdDogId = res.data._id
          this.fetchDogProfile(createdDogId)
        })
        .catch(err => {
          this.message = err
        })
    },

    fetchDogProfile(_id) {
      Api.get(`/owners/${this.ownerId}/dogs/${this._id}`)
        .then((res) => {
          this.newDog = res.data
        })
        .catch((err) => {
          this.message = err
        })
    },
    updateOwner() {
      const newOwner = {
        ownerName: this.name || this.owner.name,
        location: this.location || this.owner.location,
        email: this.email || this.owner.email
      }
      Api.put(`/owners/${this.owner._id}`, newOwner).then((res) => {
        console.log(res)
      })
    },
    deleteOwner() {
      if (!this.newOwner || !this.newOwner.id) {
        return
      }
      const ownerId = this.newOwner.id
      Api.delete(`/owners/${ownerId}`)
        .then(() => {
          this.newOwner = null
          console.log('Profile deleted')
        })
        .catch((error) => {
          console.error('Error deleting profile', error)
        })
    }
  }
}

</script>

<style>
   @import url('../assets/styles/style.css');
</style>
