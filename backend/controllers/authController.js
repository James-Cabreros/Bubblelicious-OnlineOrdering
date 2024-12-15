const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token (for maintaining sessions)
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET, // Store this secret securely
      { expiresIn: '1h' } // Token expiry time
    );

    // Return the token (or any other user info you want)
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token, // Send token to frontend if needed
    });
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

// User Signup
const signup = async (req, res) => {
  const { username, email, password, contactNumber } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({
      username,
      email,
      password,
      contactNumber,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

module.exports = { login, signup };
