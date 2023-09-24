const express = require("express");
const router = express.Router();

const  { 
   createOwner,
   getOwners,
   getOwnerById,
   updateOwner
} = require('../controllers/ownerController.js');

const  { 
   createDog
} = require('../controllers/dogController.js');

router.post('/', createOwner);
router.get('/', getOwners);
router.get('/:id', getOwnerById);
router.put('/:id', updateOwner);
router.post('owners/:id/dogs', createDog);

module.exports = router;