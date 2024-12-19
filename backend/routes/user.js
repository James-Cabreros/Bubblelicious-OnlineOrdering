const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user1'); // Updated user model

const router = express.Router();

// Google Login route
router.post('/google-login', async (req, res) => {
  const { username, email, contactNumber, googleId } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({
        username,
        email,
        contactNumber: contactNumber || '', // Use empty string if contactNumber is not provided
        password: '', // Leave password empty for Google users
        googleId, // Add Google UID to the user model
      });
      await user.save();
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET, // Store JWT secret in an environment variable
      { expiresIn: '7h' } // Token expiration (1 hour)
    );

    res.status(200).json({ success: true, token, message: 'User logged in successfully' });
  } catch (error) {
    console.error('Error saving Google user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
