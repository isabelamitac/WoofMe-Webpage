const mongoose = require ('mongoose') ;
const express = require ('express');
const router = express.Router();
const OwnerModel = require("../models/ownerModel");

// Create a new owner -> POST /owners (collection)
router.post('/', async (req, res) => {
    const newOwner = new OwnerModel({ // or just: const newOwner = new Owner(req.body)
        location: req.body.location,
        name: req.body.name,
        email: req.body.email
    })

    try {
        const ownerToSave = await newOwner.save();
        res.status(200).json(ownerToSave)
    }
    catch (error) {
        res.status(400).json({"message": "Invalid request"})
    }
})

// Return all owners -> GET /owners (collection)
router.get('/', async (req, res) => {
    try{
        const owners = await OwnerModel.find();
        res.json(owners)
    }
    catch(error){
        res.status(500).json({"message": "Could not find any owners"})
    }
})

// Return the owner with the given ID -> GET /owners/:id (individual item)
router.get('/owners/:id', async function(req, res, next) {
    try{
        const ownerToFind = await OwnerModel.findById(req.params.id);
        res.json(ownerToFind)

    }
catch(error){
    res.status(500).json({"message": "Could not find any owner with the given ID"})
}
})

// Update owner account details by given ID -> PUT /owners/:id (individual item)
router.put('/owners/:id', async function(req, res, next) {
    try{
        const ownerId = req.params.id;
       // const newDetails = req.body;
        const newName = req.body.name;
        const newLocation = req.body.location;
        const newEmail = req.body.email;
        const options = { new: true };

        const updatedOwner = await OwnerModel.findByIdAndUpdate(
            ownerId, newName, newLocation, newEmail, options
        )

        res.send(updatedOwner)
    }
    catch (error) {
        res.status(400).json({"message": "Could not update owner"})
    }
})

module.exports = router;