const express = require("express");
const router = express.Router();

const  { 
   createDogsitter,
   getDogsitters,
   deleteDogsitters,
   sortByRating
} = require('../controllers/dogsitterController.js');

router.post('/', createDogsitter);
router.get('/', getDogsitters);
router.delete('/', deleteDogsitters);
router.get('/sort', sortByRating);

module.exports = router;