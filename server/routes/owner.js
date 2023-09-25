const express = require("express");
const router = express.Router();

const {
  createOwner,
  getOwners,
  getOwnerById,
  updateOwner,
  deleteOwnerById,
} = require("../controllers/ownerController.js");

const {
  createDog,
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
router.put("/:id", updateOwner);
router.delete("/:id", deleteOwnerById);
router.post("owners/:id/dogs", createDog);
router.get("/owners/:id/dogs", getAllDogs);
router.get("/owners/:id/dogs/:name", getDogById);
router.delete("/owners/:id/dogs", deleteAllDogs);
router.post("/playdates/:id", createPlaydate);
router.get("/playdates", getAllPlaydates);
router.get("/playdates/:id", getPlaydateById);
router.delete("/playdates", deleteAllPlaydates);
router.delete("/playdates/:id", deletePlaydateById);

module.exports = router;
