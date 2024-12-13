const PromoImage = require('../models/PromoImage');

// Fetch all promo images
const getPromoImages = async (req, res) => {
  try {
    const promoImages = await PromoImage.find();
    res.status(200).json(promoImages);
  } catch (err) {
    console.error('Error fetching promo images:', err);
    res.status(500).json({ error: 'Failed to fetch promo images' });
  }
};



// Create a new promo image
const createPromoImage = async (req, res) => {
  const { name, description, image } = req.body;

  if (!name || !description || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newPromoImage = new PromoImage({ name, description, image });
    await newPromoImage.save();
    res.status(201).json(newPromoImage);
  } catch (err) {
    console.error('Error creating promo image:', err);
    res.status(500).json({ error: 'Failed to create promo image' });
  }
};

// Update an existing promo image
const updatePromoImage = async (req, res) => {
  const { name, description, image } = req.body;

  try {
    const updatedPromoImage = await PromoImage.findByIdAndUpdate(
      req.params.id,
      { name, description, image },
      { new: true, runValidators: true }
    );

    if (!updatedPromoImage) {
      return res.status(404).json({ error: 'Promo image not found' });
    }

    res.status(200).json(updatedPromoImage);
  } catch (err) {
    console.error('Error updating promo image:', err);
    res.status(500).json({ error: 'Failed to update promo image' });
  }
};

// Delete a promo image
const deletePromoImage = async (req, res) => {
  try {
    const deletedPromoImage = await PromoImage.findByIdAndDelete(req.params.id);

    if (!deletedPromoImage) {
      return res.status(404).json({ error: 'Promo image not found' });
    }

    res.status(200).json({ message: 'Promo image deleted successfully' });
  } catch (err) {
    console.error('Error deleting promo image:', err);
    res.status(500).json({ error: 'Failed to delete promo image' });
  }
};

module.exports = {
  getPromoImages,
  getPromoImageById,
  createPromoImage,
  updatePromoImage,
  deletePromoImage,
};
