import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BestSellerCards from '../itemCards/bestSellerCards';
import BestSellerModals from '../itemCards/bestSellerModals';
import styles from './ItemCards.module.css'; // Import your CSS module

const ItemCards = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, windowWidth: 0 });

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
  }, []);

  const openModal = (product, event) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    const buttonRect = event.target.getBoundingClientRect();
    setModalPosition({
      top: buttonRect.top + window.scrollY,
      left: buttonRect.left + window.scrollX,
      windowWidth: window.innerWidth, // Capture viewport width for responsive positioning
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles['item-cards-container']}>
      <div className={styles['cardsWrapper']}>
        {bestSellers.map((item) => (
          <BestSellerCards
            key={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            onDetailsClick={(e) => openModal(item, e)}
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
