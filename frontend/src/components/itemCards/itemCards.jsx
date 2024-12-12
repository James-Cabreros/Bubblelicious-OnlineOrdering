import React, { useState, useEffect } from 'react'; // Import useEffect here
import axios from 'axios';
import BestSellerCards from '../itemCards/bestSellerCards'; // Import the card component
import BestSellerModals from '../itemCards/bestSellerModals';

const ItemCards = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get('/api/best-sellers'); // Replace with your actual API
        if (Array.isArray(response.data)) {
          setBestSellers(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      }
    };

    fetchBestSellers();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const openModal = (product, event) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    // Calculate the position of the modal based on the button click
    const buttonRect = event.target.getBoundingClientRect();
    setModalPosition({
      top: buttonRect.top + window.scrollY,
      left: buttonRect.left + window.scrollX,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="item-cards-container">
      <div className="cardsWrapper">
        {bestSellers.map((item) => (
          <BestSellerCards
            key={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            onDetailsClick={(e) => openModal(item, e)} // Pass the click event to get button position
          />
        ))}
      </div>

      <BestSellerModals
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        modalPosition={modalPosition}
      />
    </div>
  );
};

export default ItemCards;
