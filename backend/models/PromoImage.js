const mongoose = require('mongoose');

// Define the schema for PromoImage
const promoImageSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
  },
  description: { 
    type: String,
    required: true,
    
  },
  image: { 
    type: String,
    required: true,
}, });

// Create the PromoImage model
const PromoImage = mongoose.model('PromoImage', promoImageSchema);

module.exports = PromoImage;
