import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import styles from './login.module.css'; // Replace with the actual path to your CSS module

const Login = () => {
  const [promoImages, setPromoImages] = useState([]);

  // Fetch promo images from the backend
  useEffect(() => {
    const fetchPromoImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/promo-images'); // Use correct API endpoint
        setPromoImages(response.data);
      } catch (err) {
        console.error('Failed to fetch promo images:', err);
      }
    };

    fetchPromoImages();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add login form submission logic here
    console.log('Login form submitted');
  };

  const handleGoogleLogin = () => {
    // Add Google login logic here
    console.log('Logging in with Google');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <div className={styles.leftPaneContent}>
          <h1>LOGIN</h1>
          <p>
            Don't Have an Account? <Link to="/signup">Sign Up</Link>
          </p>
          <form className={styles['login-form']}>
  <input
    type="email"
    placeholder="Email"
    className={styles['form-control']}
  />
  <input
    type="password"
    placeholder="Enter Your Password"
    className={styles['form-control']}
  />

  <div className={styles.links}>
    <Link to="/forgot-account">Forgot Account?</Link>
    <Link to="/forgot-password">Forgot Password?</Link>
  </div>

  <button type="submit" className={styles['btn-primary']}>
    Log In
  </button>
</form>


          <div className={styles.separator}>
            <span className={styles.line}></span>
            <span className={styles.orText}>Or</span>
            <span className={styles.line}></span>
          </div>

          <button
            className={`${styles['btn-primary']} ${styles['btn-google']}`}
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>
        </div>
      </div>

      <div className={styles.rightPane}>
        <div className={styles.carouselContainer}>
          <div className={styles.carouselWrapper}>
            <Carousel slide={false}>
              {promoImages.map((promo) => (
                <Carousel.Item key={promo._id}>
                  <img
                    className={styles.carouselImage}
                    src={promo.image} // Assuming `promo.image` holds the image URL
                    alt={promo.name}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
