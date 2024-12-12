import React from 'react';
import styles from './BestSellerCards.module.css'; // Import your CSS module

const BestSellerCards = ({ image, name, price, onDetailsClick }) => {
  return (
    <div className={styles['card']}>
      <img src={image} alt={name} className={styles['cardImage']} />
      <div className={styles['cardTitle']}>{name}</div>
      <div className={styles['cardPriceContainer']}>
        <div className={styles['cardPrice']}>₱{price}</div>
        <button className={styles['detailsButton']} onClick={onDetailsClick}>See Details</button>
      </div>
    </div>
  );
}; 

export default BestSellerCards;
