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
    const dogID = req.params.id;
    const dogToFind = await Dogs.findById(dogID);
    res.json(dogToFind);
  } catch (error) {
    res.status(500).json({ message: "Could not find any owner with the given ID" });
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
    const { id } = req.params;
    const { age } = req.body;

    try {
      const dogToUpdate = await Dogs.findById(id);

      if (!dogToUpdate) {
        return res.status(404).json({ message: "Dog not found" });
      }

      dogToUpdate.age = age;

      const updatedAge = await dogToUpdate.save();

      res.json(updatedAge);

    } catch (error) {
        res.status(400).json({ message: "Could not update the dog's age"});
    }
};

  // Update the dog's diet
  const updateDogDiet = async (req, res) => {
    const { id } = req.params;
    const { diet } = req.body;

    try {
      const dogToUpdate = await Dogs.findById(id);

      if (!dogToUpdate) {
        return res.status(404).json({ message: "Dog not found" });
      }

      dogToUpdate.diet = diet;

      const updatedDiet = await dogToUpdate.save();

      res.json(updatedDiet);

    } catch (error) {
        res.status(400).json({ message: "Could not update the dog's diet"});
    }
};

  // Delete dog by ID
  const deleteDogById = async (req, res) => {
    try {
      await Dogs.deleteOne({ id: req.params.id });
      res.send("Dog has been deleted");
    } catch (error) {
      res.status(400).json({ message: "Could not delete dog" });
    }
  };

  // Delete all dogs by ID
  const deleteAllDogs = async (req, res) => {
    try {
      const dogs = await Dogs.deleteMany({})
      res.send('All dogs have been deleted')
    }
    catch (error) {
        res.status(400).json({ "message": "Could not delete the collection" })
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