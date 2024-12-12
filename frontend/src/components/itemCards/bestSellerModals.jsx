import React from 'react';
import styles from './bestSellerModals.module.css';

const BestSellerModals = ({ isOpen, onClose, product, modalPosition }) => {
  if (!isOpen) return null;

  const { top, left, windowWidth } = modalPosition;
  const modalWidth = 300; // Modal width
  const isCloseToRightEdge = left + modalWidth > windowWidth;
  const translateX = isCloseToRightEdge ? '-100%' : '0'; // Shift left if near the right edge

  return (
    <div
      className={styles['modal-container']}
      style={{
        '--modal-top': `${top - 400}px`, // Position above the button
        '--modal-left': `${left}px`, // Start from button position
        '--modal-translate-x': translateX, // Shift left if needed
      }}
    >
      <div className={styles['modal-header']}>
        <h2>{product.name}</h2>
        <button className={styles['close-button']} onClick={onClose}>
          &times;
        </button>
      </div>
      <div className={styles['modal-body']}>
        <img src={product.image} alt={product.name} />
        <p>{product.details}</p>
        <div className={styles['price-close-container']}>
          <p>Price: ₱{product.price}</p>
          <button className={styles['close-button']} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellerModals;
