import React from 'react';
import styles from './bestSellerModals.module.css';

const BestSellerModals = ({ isOpen, onClose, product, modalPosition }) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles['modal-container']}
      style={{
        '--modal-top': `${modalPosition.top - 10}px`, // Adjust to position above the button
        '--modal-left': `${modalPosition.left - 10}px`, // Adjust to position to the left of the button
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
        <p>{product.description}</p>
        <p>Price: ₱{product.price}</p>
      </div>
      <div className={styles['modal-footer']}>
        <button className={styles['close-button']} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BestSellerModals;
