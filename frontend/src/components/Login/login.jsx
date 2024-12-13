import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import styles from '../Login/login.module.css';

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

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <h1>LOGIN</h1>
        <p>Don’t Have An Account? <Link to="/signup">Sign Up</Link></p>
        <form className={styles['login-form']}>
          <input type="text" placeholder="Username" className={styles['form-control']} />
          <input type="password" placeholder="Enter Your Password" className={styles['form-control']} />
          <div className={styles.forgotLinks}>
            <Link to="/forgot-password">Forgot password?</Link> 
            <Link to="/forgot-account">Forgot Account?</Link>
          </div>
          <button type="submit" className={styles['btn-primary']}>Log In Account</button>
          <div className={styles.orSection}> OR</div>
          <button type="button" className={styles['btn-google']}>Google</button>
        </form>
      </div>
      <div className={styles.rightPane}>
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
  );
};

export default Login;
