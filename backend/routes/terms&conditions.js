const express = require('express');
const router = express.Router();
const TermsAndConditions = require('../models/TermsAndConditions.js');

// GET /api/terms
router.get('/', async (req, res) => {
  try {
    const terms = await TermsAndConditions.findOne({});
    if (!terms) {
      return res.status(404).json({ message: 'Terms and Conditions not found' });
    }
    res.json(terms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
