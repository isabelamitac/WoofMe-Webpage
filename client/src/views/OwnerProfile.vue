<template>
    <div>
      <b-jumbotron header="Dog Owner Profile" lead="Welcome to your profile section">
      <div class="editFields">
    <p class="th">Enter profile details below:</p>
    <input type="name" placeholder="name" v-model="name" required/> <br />
    <input type="location" placeholder="location" v-model="location" required/> <br />
    <input type="email" placeholder="email" v-model="email" required/> <br />
    </div>
    <button class="second-btn" @click="createOwner()" >Create new profile</button><br />
    <br/>
     <!-- Display the owner's profile -->
     <div v-if="newOwner" class="owner-profile">
        <!-- Profile Picture -->
        <img src="../assets/profile-photo.png" alt="Profile Picture" class="profile-picture" />
     <!-- Display the fetched owner's profile -->
      <p><strong>Name:</strong> {{ newOwner.name }}</p><br />
      <p><strong>Location:</strong> {{ newOwner.location }}</p><br />
      <p><strong>Email:</strong> {{ newOwner.email }}</p><br />
  </div>
  <br />
    <button class="second-btn" @click="deleteOwner()">Delete profile</button> <br />
    <br />
    <button class="second-btn" @click="updateOwner()" >Update profile</button>
    <br>
    <div class="dogs-section">
      <h2>Dogs</h2>
      <div class="dog-profiles">
        <!-- Placeholder Dog Profiles -->
        <div class="dog-profile">
          <img src="../assets/default-dog-profile.png" alt="Dog 1" class="dog-picture" />
          <p>Dog 1</p>
          <button class="second-btn" @click="createDog()">Add Dog</button>
        </div>
        <div class="dog-profile">
          <img src="../assets/default-dog-profile.png" alt="Dog 2" class="dog-picture" />
          <p>Dog 2</p>
          <button class="second-btn" @click="createDog()">Add Dog</button>
        </div>
        <div class="dog-profile">
          <img src="../assets/default-dog-profile.png" alt="Dog 3" class="dog-picture" />
          <p>Dog 3</p>
          <button class="second-btn" @click="createDog()">Add Dog</button>
        </div>
      </div>

    </div>
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
      email: '',
      newOwner: null,
      owner: {},
      dogs: [],
      newDog: {
        age: '',
        name: '',
        breed: '',
        diet: ''
      }
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
          const createdOwnerId = response.data.id
          // Fetch the owner's profile using the  ID
          this.fetchOwnerProfile(createdOwnerId)
          // use the new owner id to create a dog
          this.createDog(this.newOwner.id)
        })
        .catch(error => {
          this.message = error
        })
    },

    fetchOwnerProfile(_id) {
      Api.get(`/owners/${this._id}`)
        .then((response) => {
          this.newOwner = response.data
        })
        .catch((error) => {
          this.message = error
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
    },

    createDog(ownerId) {
      const newDogData = {
        ownerId: this.ownerId,
        age: this.newDog.age,
        name: this.newDog.name,
        breed: this.newDog.breed,
        diet: this.newDog.diet
      }

      Api.post(`/owners/${this.ownerId}/dogs`, newDogData)
        .then((response) => {
          this.dogs.push(response.data) // Add the new dog profile to the array
          console.log('Dog added:', response.data)

          // Clear the input fields for the next dog
          this.newDog.age = ''
          this.newDog.name = ''
          this.newDog.breed = ''
          this.newDog.diet = ''

          this.$bvModal.msgBoxOk('Dog has been added!')
        })
        .catch((error) => {
          console.error('Error adding dog:', error)
        })
    },

    fetchOwnerDogs(ownerId) {
      // Send a GET request to retrieve all dogs for the owner
      Api.get(`/owners/${this.ownerId}/dogs`)
        .then((response) => {
          // Assign the retrieved dog profiles to the dogs array
          this.dogs = response.data
        })
        .catch((error) => {
          console.error('Error fetching owner dogs:', error)
        })
    }
  }
}

</script>

  <style>
   @import url('../assets/styles/style.css');
   .owner-profile {
  display: flex;
  align-items: center;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-data {
  flex-grow: 1;
}

.dogs-section {
  margin-top: 20px;
}

.dog-profiles {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.dog-profile {
  text-align: center;
  flex: 1;
  max-width: 30%;
}

.dog-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
  </style>
