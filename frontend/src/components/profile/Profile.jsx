import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutModal from "./logoutmodal";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    contactNumber: "",
  });
  const [purchaseHistory, setPurchaseHistory] = useState([]); // Purchase history
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Toggle Logout Modal

  // Password Change State
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Fetch user data and purchase history
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get("/api/user/purchase-history", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPurchaseHistory(response.data);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    };

    fetchUserData();
    fetchPurchaseHistory();
  }, []);

  // Handle Password Update
  const handlePasswordUpdate = async () => {
    try {
      await axios.put(
        "/api/user/update-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Password updated successfully!");
      setIsPasswordEditing(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please check your current password.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    window.location.href = "/login";
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          {/* User Profile Card */}
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <p className="text-muted mt-2 mb-1">{userData.username || "Loading..."}</p>
                <MDBBtn color="danger" onClick={() => setShowLogoutModal(true)}>
                  Logout
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* User Information */}
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Username</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Contact Number</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.contactNumber}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                {/* Password Update Section */}
                {isPasswordEditing ? (
                  <>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Current Password</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBInput
                          type="password"
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>New Password</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBInput
                          type="password"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </MDBCol>
                    </MDBRow>
                    <div className="d-flex justify-content-end mt-3">
                      <MDBBtn color="success" onClick={handlePasswordUpdate}>
                        Save
                      </MDBBtn>
                      <MDBBtn
                        color="danger"
                        className="ms-2"
                        onClick={() => setIsPasswordEditing(false)}
                      >
                        Cancel
                      </MDBBtn>
                    </div>
                  </>
                ) : (
                  <div className="d-flex justify-content-between">
                    <MDBCardText>Password</MDBCardText>
                    <MDBBtn size="sm" color="info" onClick={() => setIsPasswordEditing(true)}>
                      Update Password
                    </MDBBtn>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>

            {/* Purchase History Card */}
            <MDBCard className="mb-4">
              <MDBCardHeader>Purchase History</MDBCardHeader>
              <MDBCardBody>
                {purchaseHistory.length > 0 ? (
                  <ul className="list-unstyled">
                    {purchaseHistory.map((order, index) => (
                      <li key={index} className="mb-2">
                        <strong>{order.productName}</strong> - ₱{order.price} (Qty: {order.quantity})
                        <br />
                        <small className="text-muted">
                          Purchased on: {new Date(order.purchaseDate).toLocaleDateString()}
                        </small>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No purchase history available.</p>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* Logout Modal */}
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </MDBContainer>
    </section>
  );
}
