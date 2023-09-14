const mongoose = require ('mongoose') ;
const express = require ('express');
const router = express.Router();
const DogsitterModel = require("../models/dogsitterModel");

// Create a new dogsitter -> POST /owners (collection)
router.post('/create', async (req, res) => {
    const newDogsitter = new DogsitterModel({
        name: req.body.name,
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
})

// Return all dogsitters -> GET /dogsitters (collection)
router.get('/findAll', async (req, res) => {
    try{
        const dogsitters = await DogsitterModel.find();
        res.json(dogsitters)
    }
    catch(error){
        res.status(500).json({"message": "Could not find any dogsitters"})
    }
})

// Delete all dogsitters (by admin) -> DELETE /dogsitters (collection)
router.delete('/delete', async (req, res) => {
    try {
        const dogsitters = await dogsitterModel.deleteMany({}, callback)
        res.send('All dogsitters have been deleted')
    }
    catch (error) {
        res.status(400).json({ "message": "Could not delete the collection" })
    }
})

module.exports = router;