const express = require('express');
const router = express.Router();

const {
    createAdmin,
    getAdminById,
    loginAdmin,
} = require('../controllers/adminController.js');

router.post('/', createAdmin);
router.get('/:id', getAdminById);
router.post('/login', loginAdmin);

module.exports = router;