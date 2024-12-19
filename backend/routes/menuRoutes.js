const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// @route   GET /api/menu-items
// @desc    Fetch menu items (optional filtering by category)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query; // Fetch category from query string
    const filter = category ? { category } : {}; // If category exists, filter by it

    // Fetch items with the specified category
    const menuItems = await MenuItem.find(filter);
    
    res.status(200).json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Server error, could not fetch menu items.' });
  }
});

module.exports = router;
