import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/CartInfo.css";

const CartInfo = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // Do not render if the cart is empty
  if (cart.items.length === 0) return null;

  // Calculate total items and total cost
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="cart-info">
      <p>
        <strong>Cart Summary:</strong>
      </p>
      <p>Items in Cart: {totalItems}</p>
      <p>Total Cost: R{totalCost.toFixed(2)}</p>
      <button onClick={() => navigate("/cart")}>Go to Cart</button>
    </div>
  );
};

export default CartInfo;
