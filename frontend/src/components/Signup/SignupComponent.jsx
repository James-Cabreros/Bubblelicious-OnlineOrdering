import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import styles from '../Signup/signup.module.css';

const Signup = () => {
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
    // Add form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
         <div className={styles.leftPaneContent}>
                <h1>SIGNUP</h1>
                    <p>Already Have An Account? <Link to="/login">Log In</Link></p>
                 <form className={styles['signup-form']}>
                    <input type="text" placeholder="Username" className={styles['form-control']} />
                    <input type="email" placeholder="Email" className={styles['form-control']} />
                    <input type="text" placeholder="Contact Number" className={styles['form-control']} />
                    <input type="password" placeholder="Enter Your Password" className={styles['form-control']} />
                    <input type="password" placeholder="Confirm Your Password" className={styles['form-control']} />
            <div className={styles.termsSection}>
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>
                <button type="submit" className={styles['btn-primary']}>Create Account</button>
                 </form>
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

export default Signup;
