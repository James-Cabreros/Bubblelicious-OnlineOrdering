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
      return res.status(404).json({ message: 'No best sellers found' }); // Send 404 if no data is found
    } else {
      console.log(`Fetched ${promoImages.length} best-seller(s) successfully.`);
    }
    
    res.status(200).json(promoImages);
  } catch (err) {
    console.error('Error fetching promo images:', err);
    res.status(500).json({ error: 'Failed to fetch promo images' });
  }
});

module.exports = router;
