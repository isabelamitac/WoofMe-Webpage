const express = require('express');
const router = express.Router();

const  { 
    createDogsitter,
    getDogsitters,
    getDogsitterById,
    updateTimeAvailable,
    deleteDogsitters
} = require('../controllers/dogsitterController.js');

router.post('/', createDogsitter);
router.get('/', getDogsitters);
router.get('/:id', getDogsitterById);
router.patch('/:id/time', updateTimeAvailable);
router.delete('/', deleteDogsitters);

module.exports = router;