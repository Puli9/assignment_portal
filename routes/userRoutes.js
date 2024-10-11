const express = require('express');
const { register, login } = require('../controllers/authController');
const { uploadAssignment, getAdmins } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', protect('user'), uploadAssignment);
router.get('/admins', protect('user'), getAdmins);

module.exports = router;
