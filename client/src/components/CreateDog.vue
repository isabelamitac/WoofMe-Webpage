<template>
    <div class="container-full">
        <div class="login-container">
            <div class="loginForm">
                <h1>Create a new dog</h1>
                <input type="name" placeholder="Name" v-model="name" required/>
                <input type="breed" placeholder="Breed" v-model="breed" required/>
                <input type="ageNotEdit" placeholder="Age" v-model="age" required/>
                <input type="diet" placeholder="Diet" v-model="diet" required/>
                <button class="second-btn" id="scndBtn-blueBG" @click="createDog()" >Create a new dog</button>
            </div>

            <div class="formPic">
                <img id="loginPic" src="../assets/createdog.png"/>
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
      diet: ''
    }
  },
  methods: {
    createDog() {
      const ownerId = localStorage.getItem('newOwnerId')
      const newDog = {
        ownerId,
        age: this.age,
        name: this.name,
        breed: this.breed,
        diet: this.diet
      }
      Api.post(`/owners/${ownerId}/dogs`, newDog)
        .then(res => {
          this.newDog = res.data
          this.stores = []
          this.stores.push(newDog)
          console.log(res.newDog)
          this.$bvModal.msgBoxOk('Dog has been created!')
          const createdDogId = res.data._id
          this.fetchDogProfile(createdDogId)
          this.$router.push('/owner')
        })
        .catch(err => {
          this.message = err
        })
    },

    fetchDogProfile(_id) {
      const ownerId = localStorage.getItem('newOwnerId')
      Api.get(`/owners/${ownerId}/dogs/${_id}`)
        .then((res) => {
          this.newDog = res.data
        })
        .catch((err) => {
          this.message = err
        })
    }
  }
}

</script>

<style>
   @import url('../assets/styles/style.css');
</style>
