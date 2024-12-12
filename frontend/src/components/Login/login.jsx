import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import styles from '../Login/login.module.css';

const Login = () => {
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
          <div className={styles.orSection}>or</div>
          <button type="button" className={styles['btn-google']}>Google</button>
        </form>
        <div className={styles.termsContainer}>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy & Policies</Link>
        </div>
      </div>
      <div className={styles.rightPane}>
        <Carousel slide={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/path-to-image1.jpg"
              alt="Special Flavored Nutella Chocolate"
            />
            <Carousel.Caption>
              <h3>Special Flavored Nutella Chocolate</h3>
              <p>50% OFF on your 2nd cup!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/path-to-image2.jpg"
              alt="Best Seller Matcha"
            />
            <Carousel.Caption>
              <h3>Matcha</h3>
              <p>Experience our creamy and rich Matcha blend!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/path-to-image3.jpg"
              alt="Cookies & Cream"
            />
            <Carousel.Caption>
              <h3>Cookies & Cream</h3>
              <p>Your all-time favorite treat in a cup!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Login;
