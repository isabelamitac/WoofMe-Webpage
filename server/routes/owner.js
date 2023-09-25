const express = require("express");
const router = express.Router();

const {
  createOwner,
  createDog,
  getOwners,
  getOwnerById,
  getAllDogsFromOwner,
  updateOwner,
  deleteOwnerById,
} = require("../controllers/ownerController.js");

const {
  getAllDogs,
  getDogById,
  deleteAllDogs,
} = require("../controllers/dogController.js");

const {
  createPlaydate,
  getAllPlaydates,
  getPlaydateById,
  deleteAllPlaydates,
  deletePlaydateById,
} = require("../controllers/playdateController.js");

router.post("/", createOwner);
router.get("/", getOwners);
router.get("/:id", getOwnerById);
router.get("/:id/dogs", getAllDogsFromOwner);
router.put("/:id", updateOwner);
router.delete("/:id", deleteOwnerById);
router.post("/:id/dogs", createDog);
router.get("/:id/dogs", getAllDogs);
router.get("/:id/dogs/:name", getDogById);
router.delete("/:id/dogs", deleteAllDogs);
router.post("/playdates/:id", createPlaydate);
router.get("/playdates", getAllPlaydates);
router.get("/playdates/:id", getPlaydateById);
router.delete("/playdates", deleteAllPlaydates);
router.delete("/playdates/:id", deletePlaydateById);

module.exports = router;
