import React, { useState } from "react";
import axios from "axios";

const Cat1Modals = ({ isOpen, onClose, product }) => {
  const [addedToCart, setAddedToCart] = useState(false); // Track if the product is added to cart

  if (!isOpen || !product) return null;

  // Handle Add to Cart Click
  const handleAddToCart = async () => {
    try {
      // Send a POST request to add the item to the "orders" collection
      await axios.post("/api/orders", {
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      });

      setAddedToCart(true); // Show success message
      setTimeout(() => setAddedToCart(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
      >
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">{product.name}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body text-center">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid mb-3"
              style={{ maxHeight: "200px", borderRadius: "10px" }}
            />
            <h6 className="text-muted mb-3">
              {product.description || "No description available."}
            </h6>
            <h5 className="text-success mb-0">Price: ₱{product.price}</h5>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer d-flex justify-content-between">
            <button className="btn btn-success" onClick={handleAddToCart}>
              {addedToCart ? "Added!" : "Add to Cart"}
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cat1Modals;
