const Owners = require("../models/ownerModel");
let Dogs = require("../models/dogModel");

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

// Create a new dog > POST /cars/:car_id/drivers (relationship)
const createDog = async (req,res) => {
  try{
      const dog = await Dogs.create(req.body);
      res.status(200).json(dog);
  }catch(error){
      res.status(500).json({message: "Could not create dog"});
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
    res.json(ownerToFind);
  } catch (error) {
    res.status(500).json({ message: "Could not find any owner with the given ID" });
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
        )
        res.send(updatedOwner)
  } catch (error) {
    res.status(400).json({ message: "Could not update owner" });
  }
};

// Get all dogs from owner
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

// Delete owner by given ID -> DELETE /owners/:id (individual item)
const deleteOwnerById = async (req,res) => {
  try {
    await Owners.deleteOne({ id: req.params.id });
    res.send("Owner has been deleted");
  } catch (error) {
    res.status(400).json({ message: "Could not delete owner" });
  }
};

module.exports = {
    createOwner,
    createDog,
    getOwners,
    getOwnerById,
    getAllDogsFromOwner,
    updateOwner,
    deleteOwnerById
};