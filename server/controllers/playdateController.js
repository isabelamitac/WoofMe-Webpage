const Playdates = require("../models/playdateModel");

// Create a playdate
const createPlaydate = async (req, res) => {
  /*  newPlaydateParams = req.body;
  let createPlaydate = await Playdate.create(req.body, (err, newPlaydate) => {
    newPlaydate = newPlaydateParams;
    newPlaydate.save();
  });
};
*/
  try {
    const playdate = await Playdates.create(req.body);
    res.status(201).json(playdate);
  } catch (error) {
    res.status(500).json({ message: "Could not create playdate" });
  }
};
// Get all playdates
const getAllPlaydates = async (req, res) => {
  try {
    const playdates = await Playdate.find();
    res.json(playdates);
  } catch (error) {
    res.status(500).json({ message: "Could not find any playdates" });
  }
};

//Get a certain playdate
const getPlaydateById = async (req, res) => {
  try {
    const playdateId = req.params.playdateId;
    const playdates = await Playdate.findbyId(playdateId);
    res.json(playdates);
  } catch (error) {
    res.status(500).json({ message: "Could not find any playdates" });
  }
};

// Delete all playdates
const deleteAllPlaydates = async (req, res) => {
  try {
    const playdates = await Playdate.deleteMany({}, callback);
    res.send("All playdates have been deleted");
  } catch (error) {
    res.status(400).json({ message: "Could not delete the collection." });
  }
};

// Delete a certain playdate
const deletePlaydateById = async (req, res) => {
  let playdatesList = await Playdate.find(req.params.id, (err, playdate) => {
    if (err) {
      return next(err);
    }
    if (playdate == null) {
      return res
        .status(404)
        .json({ message: "No playdates found for given ID" });
    }

    playdate.delete((playdateToDelete) => {
      return playdateToDelete.id == req.body.id;
    });
    playdate.save();
  });

  res.send(foundPlaydate);
};

module.exports = {
  createPlaydate,
  getAllPlaydates,
  getPlaydateById,
  deleteAllPlaydates,
  deletePlaydateById,
};
