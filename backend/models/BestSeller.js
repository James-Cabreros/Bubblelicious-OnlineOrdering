const mongoose = require('mongoose');

// Define the schema
const bestSellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store URL or path to the image
    required: true,
  },
});

// Create the model
const BestSeller = mongoose.model('BestSeller', bestSellerSchema);

module.exports = BestSeller;
