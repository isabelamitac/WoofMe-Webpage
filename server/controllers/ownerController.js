const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const OwnerModel = require("../models/ownerModel");
let DogModel = require("../models/dogModel");


//OWNERS
// Create a new owner -> POST /owners (collection)
router.post("/", async (req, res) => {
  console.log(req);
  const newOwner = new OwnerModel({
    // or just: const newOwner = new Owner(req.body)
    location: req.body.location,
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const ownerToSave = await newOwner.save();
    res.status(200).json(ownerToSave);
  } catch (error) {
    res.status(400).json({ message: "Invalid request" });
  }
});

// Return all owners -> GET /owners (collection)
router.get("/", async (req, res) => {
  try {
    const owners = await OwnerModel.find();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: "Could not find any owners" });
  }
});

// Return the owner with the given ID -> GET /owners/:id (individual item)
router.get("/:id", async function (req, res, next) {
  try {
    const ownerToFind = await OwnerModel.findById(req.params.id);
    res.json(ownerToFind);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not find any owner with the given ID" });
  }
});

// Update owner account details by given ID -> PUT /owners/:id (individual item)
router.put("/:id", async function (req, res, next) {
  try {
    const ownerId = req.params.id;
    //const newDetails = req.body;
    const newLocation = req.body.location;
    const newName = req.body.name;
    const newEmail = req.body.email;
    //  const options = { new: true };
    console.log(req.params.id);
    const user = await OwnerModel.findOne({ _id: req.params.id });
    for (let key of req.body) {
      console.log(key);
      user[key] = req.body.key;
    }
    await user.save();
    console.log(user);
    res.send(user);
    /*  const updatedOwner = await OwnerModel.findByIdAndUpdate(
            ownerId, { $set: {location: newLocation, name: newName, email: newEmail} } //, options 
        )
        res.send(updatedOwner)*/
  } catch (error) {
    res.status(400).json({ message: "Could not update owner" });
  }
});


//DOGS
// Create a new dog > POST
router.post('/:id/createDog', async (req, res) => {
  newDogParams = req.body
  let createdDog = await Dog.create(req.body, (err, newDog) => {
      // newDog.ownerId = req.params.id
      newDog = newDogParams
      newDog.save();
  })

  try {
    const dogsToSave = await newDog.save();
    res.status(200).json(dogsToSave);
  } catch (error) {
    res.status(400).json({ message: "Invalid request" });
  }
});

// Get a dog by owner ID > GET
router.get('/:id/findDog', async (req, res) => {

  if (req.body.name == null){
      return res.status(400).json({"message" : "Invalid name passed"})
  }
  // this gets us a list of dogs with the owner's id
  let listDog = await Dog.find(
      req.params.id, (err, dog) => {
          if (err) { return next(err); }
          if (dog == null) {
              return res.status(404).json({"message": "No dogs found for given ID"})
          }
      })
  foundDog = listDog.find((dog) => {return dog.name == req.body.name}) //search list for name of dog
  res.send(foundDog)
})

// Return a list of all dogs by owner ID > GET
router.get('/:id/findDogList', async (req, res) => {
  // this gets us a list of dogs with the owner"s id
  let listDog = await Dog.find(
      req.params.id, (err, dog) => {
          if (err) { return next(err); }
          if (dog == null) {
              return res.status(404).json({"message": "No dogs found for given ID"})
          }
      })
  res.send(listDog)
})

// Update the dog with the given owner ID > PUT
router.put('/:id/updateDog', async function(req, res, next) {
  if (req.body.name == null){
      return res.status(400).json({"message" : "Invalid name passed"})
  }
  // this gets us a list of dogs with the owner's id
  let updatedDog = await Dog.find(
          {"ownerId" : req.params.id, "name": req.body.name}, (err, dog) => {
              if (err) { return next(err); }
              if (dog == null) {
                  return res.status(404).json({"message": "No dogs found for given ID"})
              }
              //dog = listDog.find((dogToFind) => {return dogToFind.name == req.body.name}) //search list for name of dog
              dog.name = req.body.name
              dog.age = req.body.age
              dog.breed = req.body.breed
              dog.diet = req.body.diet
              dog.save();
          })
      res.json(updatedDog);
});

// Update the dog's age with the given owner ID > PATCH
router.patch('/:id/updateAge', async function(req, res, next) {
  if (req.body.name == null){
      return res.status(400).json({"message" : "Invalid name passed"})
  }
  // this gets us a list of dogs with the owner's id
  let updatedDog = await Dog.find(
      {"ownerId" : req.params.id, "name": req.body.name}, (err, dog) => {
          if (err) { return next(err); }
          if (dog == null) {
              return res.status(404).json({"message": "No dogs found for given ID"})
          }
          //dog = listDog.find((dogToFind) => {return dogToFind.name == req.body.name}) //search list for name of dog
          dog.age = req.body.age
          dog.save();
      })
  res.json(updatedDog);
});

// Update the dog's diet with the given owner ID > PATCH << fix others (test this pls)
router.patch('/:id/updateDogsDiet', async function(req, res, next) {
  if (req.body.name == null){
      return res.status(400).json({"message" : "Invalid name passed"})
  }
  // this gets us a list of dogs with the owner's id
  let updatedDog = await Dog.find(
      {"ownerId" : req.params.id, "name": req.body.name}, (err, dog) => {
          if (err) { return next(err); }
          if (dog == null) {
              return res.status(404).json({"message": "No dogs found for given ID"})
          }
          //dog = listDog.find((dogToFind) => {return dogToFind.name == req.body.name}) //search list for name of dog
          dog.diet = req.body.diet
          dog.save();
      })
  res.json(updatedDog);

});


// Delete the dog with the given ID > DELETE
router.delete('/:id/deleteDog', async (req, res) => {

  if (req.body.name == null){
      return res.status(400).json({"message" : "Invalid name passed"})
  }
  // this gets us a list of dogs with the owner's id
  let listDog = await Dog.find(
      req.params.id, (err, dog) => {
          if (err) { return next(err); }
          if (dog == null) {
              return res.status(404).json({"message": "No dogs found for given ID"})
          }

          dog.delete((dogToDelete) => {return dogToDelete.name == req.body.name}) //search list for name of dog
          dog.save();

      })
  
  res.send(foundDog)
})


//PLAYDATES
// Get a playdate through the owner's ID.
router.get("ownerController/:id/getPlaydate", async (req, res) => {
  if (req.body.name == null) {
    return res.status(400).json({ message: "Invalid name passed" });
  }
  // this gets us a list of dogs with the owner's id
  let listPLaydate = await Playdate.find(req.params.id, (err, playdate) => {
    if (err) {
      return next(err);
    }
    if (playdate == null) {
      return res
        .status(404)
        .json({ message: "No playdates found for given ID" });
    }
  });

  let foundPlaydate = listPlaydate.find((playdate) => {
    return playdate.id === req.body.id;
  }); //search list for the id of the playdate
  res.send(foundPlaydate);
});

// Delete the playdate with the given ID
router.delete("ownerController/:id/deletePlaydate", async (req, res) => {
  if (req.body.name == null) {
    return res.status(400).json({ message: "Invalid name passed" });
  }
  // this gets us a list of playdates (just one playdate) with the owner's id
  let listPlaydates = await Playdate.find(req.params.id, (err, playdate) => {
    if (err) {
      return next(err);
    }
    if (playdate == null) {
      return res
        .status(404)
        .json({ message: "No playdates found for given ID" });
    }

    //search list for id of the playdate
    playdate.delete((playdateToDelete) => {
      return playdateToDelete.id == req.body.id;
    });
    playdate.save();
  });

  res.send(foundPlaydate);
});

module.exports = router;
