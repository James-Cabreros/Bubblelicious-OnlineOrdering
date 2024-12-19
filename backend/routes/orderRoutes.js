const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// @route   POST /api/orders
// @desc    Add a menu item to orders
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    // Insert new order document
    const newOrder = new Order({
      name,
      price,
      image,
      description,
    });

    await newOrder.save(); // Save to database
    res.status(201).json({ message: "Item added to cart successfully!" });
  } catch (error) {
    console.error("Error adding item to orders:", error);
    res.status(500).json({ message: "Failed to add item to cart." });
  }
});

module.exports = router;
