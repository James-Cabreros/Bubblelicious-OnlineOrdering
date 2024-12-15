const express = require('express');
const { signup, login } = require('../controllers/authController'); // Add login import
const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route (Add this)
router.post('/login', login);

module.exports = router;
