const Owners = require("../models/ownerModel");
const Dogs = require("../models/dogModel");
const Playdates = require("../models/playdateModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { decode } = require("punycode");
const { createDecipher } = require("crypto");
const secretKey = 'MIHcAgEBBEIBOAYfnZcYKixaw9FqDWC1gNhW4GHlpZSjMyL+Bf4eo5TgsJ78xPSXbwpSNohCjeh2R2pjsdhv5DcXwww==';

//OWNERS

// Create a new owner -> POST /owners (collection)
const createOwner = async (req, res) => {
  console.log(req);
  const owners = new Owners({
    // or just: const newOwner = new Owner(req.body)
    location: req.body.location,
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const ownerToSave = await owners.save();
    res.status(200).json(ownerToSave);
  } catch (error) {
    res.status(400).json({ message: "Invalid request" });
  }
};

// Return all owners -> GET /owners (collection)
const getOwners = async (req, res) => {
  try {
    const owners = await Owners.find();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: "Could not find any owners" });
  }
};

// Return the owner with the given ID -> GET /owners/:id (individual item)
const getOwnerById = async (req, res) => {
  try {
    const ownerID = req.params.id;
    const ownerToFind = await Owners.findById(ownerID);
    if (!ownerToFind) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json(ownerToFind);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not find any owner with the given ID" });
  }
};

// Update owner account details by given ID -> PUT /owners/:id (individual item)
const updateOwner = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const updatedOwner = await Owners.findByIdAndUpdate(
      ownerId,
      updates,
      options
    );
    res.send(updatedOwner);
  } catch (error) {
    res.status(400).json({ message: "Could not update owner" });
  }
};

// Delete owner by given ID -> DELETE /owners/:id (individual item)
const deleteOwnerById = async (req, res) => {
  try {
    const owner = await Owners.findById(req.params.id);
    if(owner){
      await owner.deleteOne()
      res.send("Owner deleted succesfully")
    }
    else {
      res.send("Something went wrong")
    }
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: "Could not delete owner" });
  }
};

//DOGS

// Create a new dog > POST /cars/:car_id/drivers (Relationship)
const createDog = async (req, res) => {
  try {
    const dog = await Dogs.create(req.body);
    res.status(201).json(dog);
  } catch (error) {
    res.status(500).json({ message: "Could not create dog" });
  }
};

// Get all dogs from owner -> GET /owners/:id/dogs (Relationship)
const getAllDogsFromOwner = async (req, res) => {
  try {
    const owner = await Owners.findById(req.params.id);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const dogs = await Dogs.find({ ownerId: owner.id }).exec();
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ message: "Could not find any dogs" });
  }
};

//PLAYDATES

// Create a playdate -> POST /owners/:id/playdates (Relationship)
const createPlaydateOwner = async (req, res) => {
  try {
    const playdate = await Playdates.create(req.body);
    res.status(201).json(playdate);
  } catch (error) {
    res.status(500).json({ message: "Could not create playdate" });
  }
};

//Get a certain playdate -> GET /owners/:id/playdates/:pid (Relationship)
const getPlaydateById = async (req, res) => {
  try {
    const ownerId = req.params.id; // Extract the owner ID from the URL
    const playdateId = req.params.pid; // Extract the dog ID from the URL

    const owner = await Owners.findById(ownerId);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Find the playdate with the given ID that belongs to the owner 
    const playdate = await Playdates.findOne({
      _id: playdateId,
      creatorId: owner._id,
    }).exec();

    if (!playdate) {
      return res
        .status(404)
        .json({ message: "Playdate not found for this owner" });
    }

    res.json(playdate);
  } catch (error) {
    res.status(500).json({ message: "Could not find the playdate" });
  }
};

// Delete a certain playdate -> DELETE /owners/:id/playdates/:pid (Relationship)
const deletePlaydateById = async (req, res) => {
  try {
    const ownerId = req.params.id; // Extract the owner ID from the URL
    const playdateId = req.params.pid; // Extract the dog ID from the URL

    const owner = await Owners.findById(ownerId);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Find the playdate with the given ID that belongs to the owner
    const playdateToDelete = await Playdates.findOne({
      _id: playdateId,
      creatorId: owner._id,
    }).exec();

    if (!playdateToDelete) {
      return res
        .status(404)
        .json({ message: "Playdate not found for this owner" });
    }
    await Playdates.deleteOne({
      _id: playdateId,
      creatorId: owner._id,
    }).exec();

    res.json({ message: "Playdate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete the playdate" });
  }
};

// OWNER AUTHENTICATION
// Owner registration

async function registerOwner(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const owner = new Owners({
            email: req.body.email,
            password: hashedPassword,
        });
        const savedOwner = await owner.save();
        res.json(savedOwner);
    } catch(err) {
        return res.status(500).json({ error: 'Unsuccessful registration, please try again!'});
    }
};

// Owner login
async function loginOwner(req, res) {
    const owner = await Owners.findOne({ email: req.body.email });
    if (!owner) {
      return res.status(400).json({ error: 'Owner doesn\'t exist.' });
    }
    try{
        const matchPassword = await bcrypt.compare(req.body.password, owner.password);
        const accessToken = jwt.sign(JSON.stringify(owner), secretKey);
        if(matchPassword){
            res.status(200).json({ accessToken: accessToken })
          } else {
            return res.status(400).json({ error: 'Invalid Input' });
        }
        } catch(err) {
          console.log({err});
          return res.status(500).json(err);
      }
};

module.exports = {
  createOwner,
  getOwners,
  getOwnerById,
  updateOwner,
  deleteOwnerById,
  createDog,
  getAllDogsFromOwner,
  createPlaydateOwner,
  getPlaydateById,
  deletePlaydateById,
  registerOwner,
  loginOwner,
};
