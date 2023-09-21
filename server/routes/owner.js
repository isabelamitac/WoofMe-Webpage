const express = require("express");
const router = express.Router();

const  { 
   createOwner,
   getOwners,
   getOwnerById,
   updateOwner
} = require('../controllers/ownerController.js');

router.post('/', createOwner);
router.get('/', getOwners);
router.get('/:id', getOwnerById);
router.put('/:id', updateOwner);

module.exports = router;