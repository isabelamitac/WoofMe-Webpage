const express = require("express");
const router = express.Router();

const  { 
   getAllDogs,
   updateDog,
   updateDogAge,
   updateDogDiet,
   deleteDogById,
} = require('../controllers/dogController.js');

const { route } = require("../app.js");

router.get('/', getAllDogs);
router.put('/:id', updateDog);
router.patch('/:id/:age', updateDogAge);
router.patch('/:id/:diet', updateDogDiet);
router.delete('/:id', deleteDogById);

module.exports = router;