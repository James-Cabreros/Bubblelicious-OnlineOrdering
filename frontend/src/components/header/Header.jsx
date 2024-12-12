import React from 'react';
import { FiUser, FiShoppingCart } from 'react-icons/fi'; // Importing icons
import { Link } from 'react-router-dom'; // Importing Link
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}> {/* Link to Home */}
        <div className={styles.logoText}>
          <span>Bubble</span>
          <span>licious</span>
        </div>
      </Link>
      <div className={styles.icons}>
        <FiShoppingCart className={styles.icon} />
        <Link to="/login" className={styles.login}>
          <FiUser className={styles.icon} />
          <span>Login</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
