import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import GreenFooter from './GreenFooter';
import axios from 'axios';

const Footer = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get('/api/best-sellers'); // Replace with your actual API endpoint
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

  return (
    <footer className={styles['footer']}>
      <div className={styles['container']}>
        <div className={styles['section']}>
          <div className={styles['logoText']}>
            <span className={styles['logoGreen']}>Bubble</span>
            <span className={styles['logoOrange']}>licious</span>
          </div>
          <p>Customer Support:</p>
          <p>(629) 555-0129</p>
          <p>Phase 8A Bagong Silang Caloocan City</p>
          <p>Bubblelicious@gmail.com</p>
        </div>
        <div className={styles['section']}>
          <h3>TOP CATEGORY</h3>
          <ul>
            <li>Drinks</li>
            <li>Meals</li>
            <li>Snacks</li>
          </ul>
        </div>
        <div className={styles['section']}>
          <h3>QUICK LINKS</h3>
          <ul>
            <li>Bubblelicious Facebook Page</li>
            <li>Customer Service</li>
            <li>Privacy Policy</li>
            <li>FAQ</li>
            <li>Contact</li>
            <li>About Us</li>
          </ul>
        </div>
        <div className={styles['section']}>
          <h3>BEST SELLERS</h3>
          <ul>
            {bestSellers.length > 0 ? (
              bestSellers.map((item) => <li key={item._id}>{item.name}</li>)
            ) : (
              <li>Loading...</li>
            )}
          </ul>
        </div>
      </div>
      <GreenFooter />
    </footer>
  );
};

export default Footer;
