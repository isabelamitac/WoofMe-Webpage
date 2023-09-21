const Dogsitter = require("../models/dogsitterModel");

// Create a new dogsitter -> POST /dogsitters (collection)
const createDogsitter = async (req, res) => {
    const newDogsitter = new Dogsitter({
        name: req.body.name,
        location: req.body.location,
        dateAvailable: req.body.dateAvailable,
        timeAvailable: req.body.timeAvailable,
        rating: req.body.rating
    })

    try {
        const dogsitterToSave = await newDogsitter.save();
        res.status(200).json(dogsitterToSave)
    }
    catch (error) {
        res.status(400).json({"message": "Invalid request"})
    }
}

// Return all dogsitters -> GET /dogsitters (collection)
const getDogsitters = async (req, res) => {
    try{
        const dogsitters = await Dogsitter.find();
        res.json(dogsitters)
    }
    catch(error){
        res.status(500).json({"message": "Could not find any dogsitters"})
    }
}

// Delete all dogsitters (by admin) -> DELETE /dogsitters (collection)
const deleteDogsitters = async (req, res) => {
    try {
        const dogsitters = await Dogsitter.deleteMany({})
        res.send('All dogsitters have been deleted')
    }
    catch (error) {
        res.status(400).json({ "message": "Could not delete the collection" })
    }
}

// Sort dogsitters DESC by rating
const sortByRating = async (req, res) => {
    try{
       const sorted = await Dogsitter.find().sort({rating:-1});
        res.json(sorted);
    }
    catch(error){
        res.status(500).json({message: "Cound not sort dogsitters"})
    }
}

module.exports = {
    createDogsitter,
    getDogsitters,
    deleteDogsitters,
    sortByRating
};