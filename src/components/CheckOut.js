import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showShippingInfoModal, setShowShippingInfoModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          <p>Total Items: {cart.items.length}</p>
          <p>Total Price: R{cart.total}</p>
        </div>
        <div>
          <input type="radio" id="standard" name="shipping" value="Standard" />
          <label htmlFor="standard">Standard Shipping</label>
        </div>
        <div>
          <input type="radio" id="express" name="shipping" value="Express" />
          <label htmlFor="express">Express Shipping</label>
        </div>
      </div>
      <div className="checkoutButtons">
        <Button variant="secondary" onClick={() => navigate("/cart")}>
          Return to Cart
        </Button>
        <Button variant="success" onClick={() => setShowConfirmModal(true)}>
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
          <p>Total Items: {cart.items.length}</p>
          <p>Total Price: R{cart.total}</p>
          <p>Shipping Method: [Selected Option]</p>
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
        show={showShippingInfoModal}
        onHide={() => setShowShippingInfoModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Shipping Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Standard Shipping:</strong> Delivered within 5-7 business
            days.
          </p>
          <p>
            <strong>Express Shipping:</strong> Delivered within 2-3 business
            days. Additional charges may apply.
          </p>
          <p>
            Note: Shipping times may vary based on location and availability.
          </p>
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
