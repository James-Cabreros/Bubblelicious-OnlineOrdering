import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';  // Importing styles

const Login = () => {
  return (
    <div className={styles.container}>
      <h1>Login Page</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className={styles.formLabel}>Username</label>
          <input type="text" id="username" className={`form-control ${styles.formControl}`} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className={styles.formLabel}>Password</label>
          <input type="password" id="password" className={`form-control ${styles.formControl}`} />
        </div>
        <button type="submit" className={`btn btn-primary ${styles.btnPrimary}`}>Login</button>
      </form>
      <Link to="/" className={`btn btn-link ${styles.btnLink}`}>Go to Home</Link>
    </div>
  );
};

export default Login;
