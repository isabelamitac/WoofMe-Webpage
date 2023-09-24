const express = require("express");
const router = express.Router();

const {
  createPlaydate,
  getAllPlaydates,
  getPlaydateById,
  deletePlaydates,
  deletePlaydateById,
} = require("../controllers/playdateController.js");

router.post("/", createPlaydate);
router.get("/owners/:id/playdates", getAllPlaydates);
router.get("/owners/:id/playdates/:id", getPlaydateById);
router.delete("/owners/:id/playdates", deletePlaydates);
router.delete("/owners/:id/playdates/:id", deletePlaydateById);

module.exports = router;
