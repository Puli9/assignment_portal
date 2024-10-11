const express = require('express');
const { register, login } = require('../controllers/authController');
const { viewAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController.js');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/assignments', protect('admin'), viewAssignments);
router.post('/assignments/:id/accept', protect('admin'), acceptAssignment);
router.post('/assignments/:id/reject', protect('admin'), rejectAssignment);

module.exports = router;
