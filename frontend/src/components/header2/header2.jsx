import React, { useEffect, useState } from 'react';
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from './header2.module.css';

const Header2 = () => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem('token');  // Retrieve token from localStorage
        console.log('Token retrieved:', token);  // Check if token is found
        if (!token) {
          setError('No token found');
          return;
        }
    
        const response = await fetch('/api/user/me', {
          method: 'GET',  // Make sure the method is 'GET'
          headers: {
            Authorization: `Bearer ${token}`,  // Correct way to send token in the header
          },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch username');
        }
    
        const data = await response.json();  // Assuming the response has a 'username' field
        console.log('Fetched username:', data.username);
        setUsername(data.username);
      } catch (err) {
        console.error('Error fetching username:', err);
        setError(err.message);  // Set error message if something goes wrong
      }
    };
    
    fetchUsername(); // Call the fetch function
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/menu" className={styles.logo}>
        <div className={styles.logoText}>
          <span>Bubble</span>
          <span>licious</span>
        </div>
      </Link>
      <div className={styles.icons}>
        <FiShoppingCart className={styles.icon} />
        <Link to="/account" className={styles.login}>
          <FiUser className={styles.icon} />
          {/* Conditionally render username, Login, or Error */}
          {error ? (
            <span>{error}</span> // Show the error message if there's an issue
          ) : username ? (
            <span>{username}</span> // Show the username if it's available
          ) : (
            <span>Login</span> // Default message when no username is set
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header2;
