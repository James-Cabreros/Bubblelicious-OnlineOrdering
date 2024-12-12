import React from 'react';
import { Link } from 'react-router-dom';
import styles from './welcome.module.css';  // Importing styles for the Welcome component
import logo from '../../assets/bubblelicious-logo.png'; // Correct path to import the logo

const Welcome = () => {
  return (
    <div className={styles['welcome-container']}>
      <div className={styles['welcome-box']}>
        <div className={styles['welcome-text']}>
          <h1>Welcome to Bubblelicious</h1>
          <p>Sip, Snack, and Enjoy!</p>
          <Link to="/login">
            <button className={styles['green-btn']}>Get Started</button>
          </Link>
        </div>
        <div className={styles['home-img']}>
          <img src={logo} alt="Bubblelicious Tea House" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
