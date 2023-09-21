const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Playdate = require("../models/playdateModel");

// Create a playdate
router.post("playdateController/:id/createPlaydate", async (req, res) => {
  newPlaydateParams = req.body;
  let createPlaydate = await Playdate.create(req.body, (err, newPlaydate) => {
    newPlaydate = newPlaydateParams;
    newPlaydate.save();
  });
});

// Get all playdates
router.get("/playdates", async (req, res) => {
  try {
    const playdates = await Playdate.find();
    res.json(playdates);
  } catch (error) {
    res.status(500).json({ message: "Could not find any playdates" });
  }
});

//Get a certain playdate
router.get("/playdates/:playdateId", async (req, res) => {
  try {
    const playdateId = req.params.playdateId;
    const playdates = await Playdate.findbyId(playdateId);
    res.json(playdates);
  } catch (error) {
    res.status(500).json({ message: "Could not find any playdates" });
  }
});

// Delete all playdates
router.delete("/delete", async (req, res) => {
  try {
    const playdates = await Playdate.deleteMany({}, callback);
    res.send("All playdates have been deleted");
  } catch (error) {
    res.status(400).json({ message: "Could not delete the collection." });
  }
});

// Delete a certain playdate
router.delete("/playdates/delete/:id", async (req, res) => {
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
});

module.exports = router;
