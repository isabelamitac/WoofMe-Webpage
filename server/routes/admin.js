const express = require('express');
const router = express.Router();

const {
    createAdmin,
    getAdminById,
} = require('../controllers/adminController.js');

router.post('/', createAdmin);
router.get('/:id', getAdminById);

module.exports = router;