import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import styles from '../Signup/signup.module.css';

const Signup = () => {
  const [promoImages, setPromoImages] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // initialize useNavigate

  useEffect(() => {
    const fetchPromoImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/promo-images');
        setPromoImages(response.data);
      } catch (err) {
        console.error('Failed to fetch promo images:', err);
      }
    };

    fetchPromoImages();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Username: Required and only letters
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (!/^[A-Za-z]+$/.test(formData.username)) {
      newErrors.username = 'Username must only contain letters.';
    }

    // Email: Required and valid format
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    // Contact Number: Must start with "09" and be 11 digits long
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required.';
    } else if (!/^09\d{9}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must start with "09" and be exactly 11 digits long.';
    }

    // Password: Required, at least 8 characters, uppercase, lowercase, number, special character
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
    }

    // Confirm Password: Must match Password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Terms and Conditions
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
        alert('Signup successful!');
        console.log('Response:', response.data);
        navigate('/menu');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            backendErrors[err.param] = err.msg;
          });
          setErrors(backendErrors);
        } else {
          alert('Signup failed. Please try again later.');
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <div className={styles.leftPaneContent}>
          <h1>SIGNUP</h1>
          <p>
            Already Have An Account? <Link to="/login">Log In</Link>
          </p>
          <form className={styles['signup-form']} onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={styles['form-control']}
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <p className={styles.error}>{errors.username}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles['form-control']}
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}

            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              className={styles['form-control']}
              value={formData.contactNumber}
              onChange={handleInputChange}
            />
            {errors.contactNumber && <p className={styles.error}>{errors.contactNumber}</p>}

            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className={styles['form-control']}
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              className={styles['form-control']}
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword}</p>
            )}

            <div className={styles.termsSection}>
              <input
                type="checkbox"
                name="termsAccepted"
                id="terms"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
              />
              <label htmlFor="terms">I agree to the terms and conditions</label>
              {errors.termsAccepted && (
                <p className={styles.error}>{errors.termsAccepted}</p>
              )}
            </div>
            <button type="submit" className={styles['btn-primary']}>
              Create Account
            </button>
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
                    src={promo.image}
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
