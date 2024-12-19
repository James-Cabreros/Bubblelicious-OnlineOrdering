import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./welcome1.module.css"; // Importing styles for the Welcome component
import logo from "../../assets/bubblelicious-logo.png"; // Correct path to import the logo
import axios from "axios";

const Welcome1 = () => {
  const [username, setUsername] = useState(""); // State to store the user's username

  // Fetch the user's username on component mount
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsername(response.data.username); // Update the state with the fetched username
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className={styles["welcome-container"]}>
      <div className={styles["welcome-box"]}>
        <div className={styles["welcome-text"]}>
          <h1>Welcome to Bubblelicious</h1>
          <p>Sip, Snack, and Enjoy!</p>
          <p>Hi! {username || "Loading..."}</p> {/* Display the username or a loading message */}
        </div>
        <div className={styles["home-img"]}>
          <img src={logo} alt="Bubblelicious Tea House" />
        </div>
      </div>
    </div>
  );
};

export default Welcome1;
