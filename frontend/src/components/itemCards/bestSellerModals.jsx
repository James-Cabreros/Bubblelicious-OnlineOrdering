import React from 'react';
import styles from './BestSellerModals.module.css'; // Import the CSS module

const BestSellerModals = ({ isOpen, onClose, product, modalPosition }) => {
  if (!isOpen) return null; // If modal is closed, do not render it

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // Prevent modal content click from closing the modal
        style={{
          top: modalPosition.top,
          left: modalPosition.left,
        }} // Position dynamically based on the button's coordinates
      >
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <img src={product.image} alt={product.name} className={styles.modalImage} />
        <h2 className={styles.modalTitle}>{product.name}</h2>
        <p className={styles.modalDescription}>{product.details}</p>
        <p className={styles.modalPrice}>₱{product.price}</p>
      </div>
    </div>
  );
};

export default BestSellerModals;
