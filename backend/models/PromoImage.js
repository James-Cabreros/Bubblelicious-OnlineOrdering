const mongoose = require('mongoose');

const promoImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, // The image URL will be stored here
  },
});

const PromoImage = mongoose.model('PromoImage', promoImageSchema);

module.exports = PromoImage;
