const Dogsitters = require("../models/dogsitterModel");

// Create a new dogsitter -> POST /dogsitters (collection)
const createDogsitter = async (req, res) => {
    const dogsitters = new Dogsitters({
        name: req.body.name,
        password: req.body.password,
        location: req.body.location,
        dateAvailable: req.body.dateAvailable,
        timeAvailable: req.body.timeAvailable,
        rating: req.body.rating
    })

    try {
        const dogsitterToSave = await dogsitters.save();
        res.status(200).json(dogsitterToSave)
    }
    catch (error) {
        res.status(400).json({"message": "Invalid request"})
    }
}

// Return all dogsitters, sorted by rating -> GET /dogsitters (collection)
const getDogsitters = async (req, res) => {
    try{
        const sorted = await Dogsitters.find().sort({rating:-1});
        res.json(sorted);
    }
    catch(error){
        res.status(500).json({"message": "Could not find any dogsitters"})
    }
}

// Return the owner with the given ID -> GET /owners/:id (individual item)
const getDogsitterById = async (req, res) => {
    try {
      const dogsitterId = req.params.id;
      const dogsitterToFind = await Dogsitters.findById(dogsitterId);
      if (!dogsitterToFind) {
        return res.status(404).json({ message: "Dogsitter not found" });
      }
      res.status(200).json(dogsitterToFind);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Could not find any dogsitters with the given ID" });
    }
  };

// Delete all dogsitters (by admin) -> DELETE /dogsitters (collection)
const deleteDogsitters = async (req, res) => {
    try {
        const dogsitters = await Dogsitters.deleteMany({})
        res.send('All dogsitters have been deleted')
    }
    catch (error) {
        res.status(400).json({ "message": "Could not delete the collection" })
    }
}

module.exports = {
    createDogsitter,
    getDogsitters,
    getDogsitterById,
    deleteDogsitters
};