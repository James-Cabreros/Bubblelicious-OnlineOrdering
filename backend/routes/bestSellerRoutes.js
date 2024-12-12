const express = require('express');
const BestSeller = require('../models/BestSeller');
const router = express.Router();

// Fetch all best sellers
router.get('/', async (req, res) => {
  try {
    console.log('Request received to fetch best sellers'); // Log incoming request
    
    const bestSellers = await BestSeller.find(); // Fetch from MongoDB
    
    if (bestSellers.length === 0) {
      console.warn('No best-sellers found in the collection.');
      return res.status(404).json({ message: 'No best sellers found' }); // Send 404 if no data is found
    } else {
      console.log(`Fetched ${bestSellers.length} best-seller(s) successfully.`);
    }

    res.status(200).json(bestSellers); // Return fetched data with 200 status
  } catch (err) {
    console.error('Error fetching best sellers:', err);
    res.status(500).json({
      message: 'Error fetching best sellers',
      error: err.message, // Include error details for debugging
    });
  }
});

module.exports = router;
