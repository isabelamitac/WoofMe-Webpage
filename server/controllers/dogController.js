let mongoose = require ('mongoose') ;
let express = require ('express');
let Dogs = require("../models/dogModel");

let router = express.Router();

  // Get all dogs
const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dogs.find();
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ message: "Could not find any dogs" });
  }
};


// Get a specific dog
const getDogById = async (req, res) => {
    try {
      const ownerId = req.params.ownerId;
      const dogs = await Dogs.findbyId(ownerId);
      res.json(dogs);
    } catch (error) {
      res.status(500).json({ message: "Could not find any dogs" });
    }
  };

// Update the entire dog info
const updateDog = async (req, res) => {
    try {
      const ownerId = req.params.id;
      const updates = req.body;
      const options = { new: true };
    
       const updatedDog = await Dogs.findByIdAndUpdate(
              ownerId, 
              updates, 
              options
          )
          res.send(updatedDog)
    } catch (error) {
      res.status(400).json({ message: "Could not update the dog" });
    }
  };

  // Update the dog's age
  const updateDogAge = async (req, res) => {
    try {
        const ownerId = req.params.id;
        const updateAge = req.body.age;
        const options = { new: true };

        const updatedDogAge = await Dogs.findbyId (
            ownerId,
            updateAge,
            options
        )
        res.send(updatedDogAge)
    } catch (error) {
        res.status(400).json({ message: "Could not update the dog's age"});
    }
};

  // Update the dog's diet
  const updateDogDiet = async (req, res) => {
    try {
        const ownerId = req.params.id;
        const updateDiet = req.body.diet;
        const options = { new: true };

        const updatedDogDiet = await Dogs.findbyId (
            ownerId,
            updateDiet,
            options
        )
        res.send(updateDiet)
    } catch (error) {
        res.status(400).json({ message: "Could not update the dog's diet"});
    }
};

  // Delete dog by ID
  const deleteDogById = async (req, res) => {
    let dogList = await Dogs.find(req.params.id, (err, dog) => {
      if (err) {
        return next(err);
      }
      if (dog == null) {
        return res
          .status(404)
          .json({ message: "No dogs found for given ID" });
      }
  
      dog.delete((dogToDelete) => {
        return dogToDelete.id == req.body.id;
      });
      dog.save();
    });
  
    res.send(foundDog);
  };

  // Delete all dogs by ID
  const deleteAllDogs = async (req, res) => {
    try {
      const dogs = await Dogs.deleteMany({}, callback);
      res.send("All dogs have been deleted");
    } catch (error) {
      res.status(400).json({ message: "Could not delete the collection." });
    }
  };

module.exports = router;

module.exports = {
    getAllDogs,
    getDogById,
    updateDog,
    updateDogAge,
    updateDogDiet,
    deleteDogById,
    deleteAllDogs
};