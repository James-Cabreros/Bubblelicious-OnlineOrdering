const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  details: { type: String, required: true },
  category: { type: String, required: true }, // Ensure category field exists
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

module.exports = MenuItem;