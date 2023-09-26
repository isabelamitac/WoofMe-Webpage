const express = require("express");
const router = express.Router();

const {
  getAllPlaydates,
  deleteAllPlaydates,
} = require("../controllers/playdateController.js");

router.get("/", getAllPlaydates);
router.delete("/", deleteAllPlaydates);

module.exports = router;
