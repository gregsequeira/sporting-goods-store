import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import "../css/CheckOut.css";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showShippingInfoModal, setShowShippingInfoModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // check cart for items and total cost
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // Confirm and clear cart
  const handleConfirmOrder = () => {
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="checkoutPage">
      <h2>Checkout</h2>
      <div className="shippingOptions">
        <p>Select your preferred shipping method:</p>
        <div>
          <p>Total Items: {totalItems}</p>
          <p className="price">
            <strong>Total Price: R{totalCost}</strong>
          </p>
          {/* warning to ensure shipping method is selected */}
          {!selectedShipping && (
            <div>
              <p className="shippingMsg">
                Please select a shipping method before confirming your order.
              </p>
              <p>See Shipping Info for more details</p>
            </div>
          )}
        </div>
        <div>
          <input
            type="radio"
            id="standard"
            name="shipping"
            value="Standard"
            checked={selectedShipping === "Standard"}
            onChange={(e) => setSelectedShipping(e.target.value)}
          />
          <label htmlFor="standard">Standard Shipping</label>
        </div>
        <div>
          <input
            type="radio"
            id="express"
            name="shipping"
            value="Express"
            checked={selectedShipping === "Express"}
            onChange={(e) => setSelectedShipping(e.target.value)}
          />
          <label htmlFor="express">Express Shipping</label>
        </div>
      </div>
      <div className="checkoutButtons">
        <Button variant="secondary" onClick={() => navigate("/cart")}>
          Return to Cart
        </Button>
        {/* confirm button is disabled and set to warning until shipping is selected */}
        <Button
          variant={!selectedShipping ? "warning" : "success"}
          onClick={() => setShowConfirmModal(true)}
          disabled={!selectedShipping}
        >
          Confirm Order
        </Button>
      </div>

      {/* Info Button for Shipping Details */}
      <div className="infoButtonContainer">
        <Button
          variant="info"
          className="infoButton"
          onClick={() => setShowShippingInfoModal(true)}
        >
          Shipping Info
        </Button>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Total Items: {totalItems}</p>
          <p>
            <strong>Total Price: R{totalCost}</strong>
          </p>
          <p>Shipping Method: {selectedShipping}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Shipping Info Modal */}
      <Modal
        className="shipMod"
        show={showShippingInfoModal}
        onHide={() => setShowShippingInfoModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Shipping Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Standard Shipping:</h5>
            <p>Delivered within 5-7 business days.</p>
            <br />
            <h5>Express Shipping:</h5>
            <p>
              Delivered within 2-3 business days. Additional charges may apply.
            </p>
            <br />
            <p>
              Note: Shipping times may vary based on location and availability.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowShippingInfoModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
