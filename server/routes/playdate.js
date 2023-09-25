const express = require("express");
const router = express.Router();

const {
  getAllPlaydates,
  deleteAllPlaydates,
} = require("../controllers/playdateController.js");

router.get("/playdates", getAllPlaydates);
router.delete("/playdates", deleteAllPlaydates);

module.exports = router;
