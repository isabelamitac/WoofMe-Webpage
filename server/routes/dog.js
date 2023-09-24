const express = require("express");
const router = express.Router();

const  { 
   createDog,
   getAllDogs,
   getDogById,
   updateDog,
   updateDogAge,
   updateDogDiet,
   deleteDogById,
   deleteAllDogs
} = require('../controllers/dogController.js');

const { route } = require("../app.js");

router.post('/', createDog);
router.get('/', getAllDogs);
router.get('/:id', getDogById);
router.put('/:id', updateDog);
router.patch('/:id', updateDogAge);
router.patch('/:id', updateDogDiet);
router.delete('/:id', deleteDogById);
router.delete('/:id', deleteAllDogs);

module.exports = router;