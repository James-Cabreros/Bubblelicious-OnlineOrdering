import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseconfig";
import ForgotModal from "./ForgotModal";
import styles from "./login.module.css";
import googleIcon from "../../assets/google.png";

const Login = () => {
  const [promoImages, setPromoImages] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [modalType, setModalType] = useState(""); // Type of modal (account/password)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromoImages = async () => {
      try {
        const response = await axios.get("/api/promo-images");
        setPromoImages(response.data);
      } catch (err) {
        console.error("Failed to fetch promo images:", err);
      }
    };

    fetchPromoImages();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post("/api/auth/login", data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/menu");
      }
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        username: user.displayName,
        email: user.email,
        contactNumber: user.phoneNumber || "",
        googleId: user.uid,
      };

      const response = await axios.post("/api/user/google-login", userData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/menu");
      }
    } catch (error) {
      console.error("Google Sign-In error:", error.message);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      {/* Left Pane */}
      <div className={styles.leftPane}>
        <div className={styles.leftPaneContent}>
          <h1>LOGIN</h1>
          <p>
            Don’t Have an Account? <Link to="/signup">Sign Up</Link>
          </p>
          <form className={styles["login-form"]} onSubmit={handleFormSubmit}>
            <input
              type="email"
              placeholder="Email"
              className={styles["form-control"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              className={styles["form-control"]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.links}>
              <button
                type="button"
                className={styles.linkButton}
                onClick={() => openModal("account")}
              >
                Forgot Account?
              </button>
              <button
                type="button"
                className={styles.linkButton}
                onClick={() => openModal("password")}
              >
                Forgot Password?
              </button>
            </div>
            <button type="submit" className={styles["btn-primary"]}>
              Log In
            </button>
          </form>
          <div className={styles.separator}>
            <span className={styles.line}></span>
            <span className={styles.orText}>Or</span>
            <span className={styles.line}></span>
          </div>
          <button className={styles["btn-google"]} onClick={handleGoogleLogin}>
            <img
              src={googleIcon}
              alt="Google Icon"
              className={styles["google-icon"]}
            />
            Login with Google
          </button>
        </div>
      </div>

      {/* Right Pane */}
      <div className={styles.rightPane}>
        <div className={styles.carouselContainer}>
          {promoImages.length > 0 ? (
            <Carousel>
              {promoImages.map((promo) => (
                <Carousel.Item key={promo._id}>
                  <img
                    className={styles.carouselImage}
                    src={promo.image}
                    alt="Promotion"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>Loading promotions...</p>
          )}
        </div>
      </div>

      {/* Forgot Modal */}
      <ForgotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalType={modalType}
      />
    </div>
  );
};

export default Login;
