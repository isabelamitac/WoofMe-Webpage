const Playdates = require("../models/playdateModel");

// Get all playdates -> GET /playdates (collection)
const getAllPlaydates = async (req, res) => {
  try {
    const playdates = await Playdates.find();
    res.json(playdates);
  } catch (error) {
    res.status(500).json({ message: "Could not find any owners" });
  }
};

// Delete all playdates -> DELETE /playdates (collection)
const deleteAllPlaydates = async (req, res) => {
  try {
    const playdates = await Playdates.deleteMany({});
    res.send("All playdates have been deleted");
  } catch (error) {
    res.status(400).json({ message: "Could not delete the collection" });
  }
};

module.exports = {
  getAllPlaydates,
  deleteAllPlaydates,
};
