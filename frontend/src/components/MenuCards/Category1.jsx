import React, { useState, useEffect } from "react";
import axios from "axios";
import Cat1Modals from "./cat1modals";
import styles from "./Category1.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Category1 = () => {
  const [menuItems, setMenuItems] = useState([]); // State for menu items
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for modal

  // Fetch only the "Drinks" category from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("/api/menu-items?category=Drinks");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching drinks menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  // Open Modal
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Chunk items into slides with a max of 3 per row
  const getSlides = () => {
    const slides = [];
    for (let i = 0; i < menuItems.length; i += 3) {
      slides.push(menuItems.slice(i, i + 3));
    }
    return slides;
  };

  const slides = getSlides();

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-left">Drinks:</h1>

      {/* Bootstrap Carousel */}
      <div
        id="drinksCarousel"
        className={`carousel slide ${styles.carouselContainer}`}
        data-bs-ride="carousel"
        data-bs-interval="4000" /* Slow auto-slide: 4 seconds */
      >
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className={`row ${styles.carouselRow}`}>
                {slide.map((item) => (
                  <div key={item._id} className="col mb-4">
                    <div className={`card h-100 ${styles.card}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`card-img-top ${styles.cardImage}`}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text text-muted">
                          {item.description
                            ? `${item.description.substring(0, 60)}...`
                            : "No description available."}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <p className="mb-0 fw-bold text-success">₱{item.price}</p>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => openModal(item)}
                          >
                            See Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className={`carousel-control-prev ${styles.carouselControl}`}
          type="button"
          data-bs-target="#drinksCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className={`carousel-control-next ${styles.carouselControl}`}
          type="button"
          data-bs-target="#drinksCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Modal Component */}
      {selectedItem && (
        <Cat1Modals
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedItem}
        />
      )}
    </div>
  );
};

export default Category1;
