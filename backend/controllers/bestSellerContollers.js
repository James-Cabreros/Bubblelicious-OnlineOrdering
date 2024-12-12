const BestSeller = require('../models/BestSeller');

// Controller to fetch all best sellers
const getBestSellers = async (req, res) => {
  try {
    const bestSellers = await BestSeller.find(); // Fetch all best-seller data from MongoDB

    // Log the count of best-sellers fetched for debugging purposes
    console.log('Best sellers fetched successfully:', bestSellers.length);

    // Send the fetched data back as a JSON response
    res.status(200).json(bestSellers);
  } catch (err) {
    // Log the error and send an error response
    console.error('Error fetching best sellers:', err);
    res.status(500).json({
      message: 'Error fetching best sellers',
      error: err.message, // Sending the error message for debugging
    });
  }
};

module.exports = {
  getBestSellers,
};
