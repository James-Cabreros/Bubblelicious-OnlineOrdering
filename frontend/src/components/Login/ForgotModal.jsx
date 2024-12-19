import React, { useState } from "react";
import axios from "axios";
import styles from "./ForgotModal.module.css";

const ForgotModal = ({ isOpen, onClose, modalType }) => {
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    try {
      setError("");
      // Call your API to send OTP to the email
      await axios.post("/api/send-otp", { email });
      setStep("otp"); // Move to OTP verification step
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setError("");
      // Call your API to verify the OTP
      const response = await axios.post("/api/verify-otp", { email, otp });
      if (response.data.success) {
        alert("OTP verified successfully!");
        onClose(); // Close the modal
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
      >
        {step === "email" ? (
          <>
            <h2 className={styles.modalTitle}>
              Recover {modalType === "account" ? "Account" : "Password"}
            </h2>
            <p className={styles.modalText}>
              Please enter your email address below to receive an OTP code for{" "}
              {modalType === "account"
                ? "account verification."
                : "password recovery."}
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.modalInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className={styles.errorText}>{error}</p>}
            <div className={styles.modalButtons}>
              <button className={styles.btnPrimary} onClick={handleSendOtp}>
                Continue
              </button>
              <button className={styles.btnSecondary} onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.modalTitle}>Verify OTP</h2>
            <p className={styles.modalText}>
              An OTP has been sent to your email. Please enter it below.
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              className={styles.modalInput}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {error && <p className={styles.errorText}>{error}</p>}
            <div className={styles.modalButtons}>
              <button className={styles.btnPrimary} onClick={handleVerifyOtp}>
                Verify OTP
              </button>
              <button className={styles.btnSecondary} onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotModal;
