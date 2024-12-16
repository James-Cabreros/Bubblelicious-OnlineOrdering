const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['beverages', 'meals', 'snacks'], // Restricts category to these values
  },
  sizes: {
    type: [String], // Array of strings for sizes (e.g., Small, Medium, Large)
    default: undefined, // Makes this field optional
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
