let Dogs = require("../models/dogModel");

// Get all dogs -> GET /dogs (collection)
const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dogs.find();
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ message: "Could not find any dogs" });
  }
};

// Get a specific dog -> GET /dogs/:id (individual item)
const getDogById = async (req, res) => {
  try {
    const dogID = req.params.id;
    const dogToFind = await Dogs.findById(dogID);
    res.json(dogToFind);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not find any dog with the given ID" });
  }
};

// Update the entire dog info -> PUT /dogs/:id (individual item)
const updateDog = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const updatedDog = await Dogs.findByIdAndUpdate(ownerId, updates, options);
    res.send(updatedDog);
  } catch (error) {
    res.status(400).json({ message: "Could not update the dog" });
  }
};

// Update the dog's age -> PATCH /dogs/:id/age (individual item)
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
    res.status(400).json({ message: "Could not update the dog's age" });
  }
};

// Update the dog's diet -> PATCH /dogs/:id/diet (individual item)
const updateDogDiet = async (req, res) => {
  const { id } = req.params;
  const { diet } = req.body;

  try {
    const dogsDietToUpdate = await Dogs.findById(id);

    if (!dogsDietToUpdate) {
      return res.status(404).json({ message: "Dog not found" });
    }

    dogsDietToUpdate.diet = diet;

    const updatedDiet = await dogsDietToUpdate.save();

    res.json(updatedDiet);
  } catch (error) {
    res.status(400).json({ message: "Could not update the dog's diet" });
  }
};

// Delete dog by ID -> DELETE/ dog/:id (individual item)
const deleteDogById = async (req, res) => {
  try {
    await Dogs.deleteOne({ id: req.params.id });
    res.send('Dog has been deleted');
  } catch (error) {
    res.status(400).json({ message: "Could not delete dog" });
  }
};

// Delete all dogs -> DELETE /dogs (collection)
const deleteAllDogs = async (req, res) => {
  try {
    const dogs = await Dogs.deleteMany({});
    res.send('All dogs have been deleted');
  } catch (error) {
    res.status(400).json({ message: "Could not delete the collection" });
  }
};

module.exports = {
  getAllDogs,
  getDogById,
  updateDog,
  updateDogAge,
  updateDogDiet,
  deleteDogById,
  deleteAllDogs,
};