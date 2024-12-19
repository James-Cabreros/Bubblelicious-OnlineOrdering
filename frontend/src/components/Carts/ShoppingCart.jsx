import React, { useState } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Matcha",
      category: "Drinks",
      price: 99.0,
      quantity: 1,
      image: "https://via.placeholder.com/80", // Replace with real image
    },
    {
      id: 2,
      name: "Garlic Parmesan Wings",
      category: "Snack",
      price: 99.0,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Honey Lemon Wings",
      category: "Snack",
      price: 99.0,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 4,
      name: "Tapa Silog",
      category: "Meal",
      price: 99.0,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
  ]);

  const deliveryFee = 50.0;

  // Increase item quantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease item quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

  return (
    <MDBContainer>
      <h2 className="text-center my-4">Shopping Cart</h2>
      <p className="text-muted text-center mb-4">Review Your Items Before Checkout!</p>

      <MDBTable align="middle" responsive>
        <MDBTableHead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "60px", borderRadius: "8px" }}
                    className="me-3"
                  />
                  <div>
                    <p className="fw-bold mb-1">{item.name}</p>
                    <p className="text-muted mb-0">{item.category}</p>
                  </div>
                </div>
              </td>
              <td>₱{item.price.toFixed(2)}</td>
              <td>
                <div className="d-flex align-items-center">
                  <MDBBtn
                    size="sm"
                    color="light"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <MDBIcon fas icon="minus" />
                  </MDBBtn>
                  <span className="mx-2">{item.quantity}</span>
                  <MDBBtn
                    size="sm"
                    color="light"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <MDBIcon fas icon="plus" />
                  </MDBBtn>
                </div>
              </td>
              <td>₱{(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <MDBBtn
                  color="danger"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  <MDBIcon fas icon="trash" />
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* Summary Section */}
      <MDBRow className="justify-content-end">
        <MDBCol md="4">
          <div className="p-3 bg-light rounded">
            <p className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </p>
            <p className="d-flex justify-content-between mb-2">
              <span>Delivery Fee:</span>
              <span>₱{deliveryFee.toFixed(2)}</span>
            </p>
            <hr />
            <h5 className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>₱{total.toFixed(2)}</span>
            </h5>
          </div>
          <MDBBtn color="success" block className="mt-3">
            CONTINUE
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}