const express = require("express");
const router = express.Router();

const  { 
   createOwner,
   getOwners,
   getOwnerById,
   updateOwner
} = require('../controllers/ownerController.js');

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

router.post('/', createOwner);
router.get('/', getOwners);
router.get('/:id', getOwnerById);
router.put('/:id', updateOwner);
router.post('owners/:id/dogs', createDog);
router.get('/owners/:id/dogs', getAllDogs);
router.get('/owners/:id/dogs/:name', getDogById);
router.put('/owners/:id/dogs/:name', updateDog);
router.patch('/owners/:id/dogs/:name', updateDogAge);
router.patch('/owners/:id/dogs/:name', updateDogDiet);
router.delete('/owners/:id/dogs/:name', deleteDogById);
router.delete('/owners/:id/dogs', deleteAllDogs);

module.exports = router;