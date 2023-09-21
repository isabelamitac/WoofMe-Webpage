const express = require("express");
const router = express.Router();

const  { 
   createDogsitter,
   getDogsitters,
   deleteDogsitters
} = require('../controllers/dogsitterController.js');

router.post('/', createDogsitter);
router.get('/', getDogsitters);
router.delete('/', deleteDogsitters);

module.exports = router;