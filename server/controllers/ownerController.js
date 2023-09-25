const Owners = require("../models/ownerModel");
let Dogs = require("../models/dogModel");
let Playdates = require("../models/playdateModel");

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
const createDog = async (req, res) => {
  try {
    const dog = await Dogs.create(req.body);
    res.status(201).json(dog);
  } catch (error) {
    res.status(500).json({ message: "Could not create dog" });
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
const deleteOwnerById = async (req, res) => {
  try {
    await Owners.deleteOne({ id: req.params.id });
    res.send("Owner has been deleted");
  } catch (error) {
    res.status(400).json({ message: "Could not delete owner" });
  }
};

// Create a playdate
const createPlaydateOwner = async (req, res) => {
  try {
    const playdate = await Playdates.create(req.body);
    res.status(201).json(playdate);
  } catch (error) {
    res.status(500).json({ message: "Could not create playdate" });
  }
};

//Get a certain playdate
// const getPlaydateById = async (req, res) => {
//   try {
//     const owner = await Owners.findById(req.params.id);

//     if (!owner) {
//       return res.status(404).json({ message: "Owner not found" });
//     }
//     const allPlaydates = Playdates.find({ creatorId: owner.id });
//     const playdateId = req.params.playdateId;
//     const playdates = await Playdates.findbyId(playdateId);
//     res.json(playdates);
//   } catch (error) {
//     res.status(500).json({ message: "Could not find any playdates" });
//   }
// };
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

// Delete a certain playdate
const deletePlaydateById = async (req, res) => {
  // let playdatesList = await Playdates.find(req.params.id, (err, playdate) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   if (playdate == null) {
  //     return res
  //       .status(404)
  //       .json({ message: "No playdates found for given ID" });
  //   }

  //   playdate.delete((playdateToDelete) => {
  //     return playdateToDelete.id == req.body.id;
  //   });
  //   playdate.save();
  // });
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

module.exports = {
  createOwner,
  getOwners,
  getOwnerById,
  getAllDogsFromOwner,
  updateOwner,
  deleteOwnerById,
  createPlaydateOwner,
  createDog,
  getPlaydateById,
  deletePlaydateById,
};
