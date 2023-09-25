const Playdates = require("../models/playdateModel");
const Owners = require("../models/ownerModel");

// Get all playdates
const getAllPlaydates = async (req, res) => {
  try {
    const playdates = await Playdates.find();
    res.json(playdates);
  } catch (error) {
    res.status(500).json({ message: "Could not find any owners" });
  }
};

// Delete all playdates
const deleteAllPlaydates = async (req, res) => {
  try {
    const playdates = await Playdates.deleteMany({});
    res.send("All playdates have been deleted");
  } catch (error) {
    res.status(400).json({ message: "Could not delete the collection" });
  }
};

// const updatePlaydateAttendees = async (req, res) => {
//   try {
//     const ownerName = req.params.name;
//     const updateAge = req.body.age;
//     const options = { new: true };

//     const updatedDogAge = await Dogs.findbyId(ownerId, updateAge, options);
//     res.send(updateAge);
//   } catch (error) {
//     res.status(400).json({ message: "Could not update the dog's age" });
//   }
// };

module.exports = {
  getAllPlaydates,
  deleteAllPlaydates,
};
