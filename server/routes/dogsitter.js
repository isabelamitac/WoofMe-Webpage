const express = require("express");
const router = express.Router();

const  { 
   createDogsitter,
   getDogsitters,
   getDogsitterById,
   deleteDogsitters,
   sortByRating
} = require('../controllers/dogsitterController.js');

router.post('/', createDogsitter);
router.get('/', getDogsitters);
router.get('/:id', getDogsitterById)
router.delete('/', deleteDogsitters);
router.get('/sort', sortByRating);

module.exports = router;