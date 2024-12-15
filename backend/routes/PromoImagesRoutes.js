const express = require('express');
const PromoImage = require('../models/PromoImage');
const router = express.Router();

// Fetch all promo images
router.get('/', async (req, res) => {
  try {
    console.log('Request received to fetch promo images');
    
    const promoImages = await PromoImage.find(); // Fetch from MongoDB
    
    if (promoImages.length === 0) {
      console.warn('No promo images in the collection.');
      return res.status(404).json({ message: 'No promo images found' }); // Corrected error message
    } else {
      console.log(`Fetched ${promoImages.length} promo image(s) successfully.`); // Adjusted log message
    }
    
    res.status(200).json(promoImages);
  } catch (err) {
    console.error('Error fetching promo images:', err);
    res.status(500).json({ error: 'Failed to fetch promo images' });
  }
});

module.exports = router;
