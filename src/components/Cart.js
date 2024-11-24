import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Col, Row, Modal } from "react-bootstrap";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import "../css/Cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const [showModal, setShowModal] = useState(false);
  // option to clear cart or remove item
  const [modalType, setModalType] = useState("");
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleAddItem = (id, selectedOption, currentQuantity) => {
    dispatch(
      updateQuantity({ id, selectedOption, quantity: currentQuantity + 1 })
    );
  };

  const handleRemoveItem = (id, selectedOption, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(
        updateQuantity({ id, selectedOption, quantity: currentQuantity - 1 })
      );
    } else {
      // Show confirmation modal if it's the last item
      setItemToRemove({ id, selectedOption });
      setModalType("removeItem");
      setShowModal(true);
    }
  };

  const handleClearCart = () => {
    setModalType("clearCart");
    setShowModal(true);
  };

  // Avoid accidental clearing
  const confirmAction = () => {
    if (modalType === "clearCart") {
      dispatch(clearCart());
    } else if (modalType === "removeItem" && itemToRemove) {
      dispatch(removeFromCart(itemToRemove));
    }
    setShowModal(false);
  };

  // In case user error
  const cancelAction = () => {
    if (modalType === "removeItem") {
      // Keep the last item in the cart
      const { id, selectedOption } = itemToRemove;
      dispatch(updateQuantity({ id, selectedOption, quantity: 1 }));
    }
    setShowModal(false);
  };

  return (
    <div className="cartContainer">
      <h1>Your Cart</h1>

      <div className="cartSummary">
        <h2>Total Amount: R{totalAmount.toFixed(2)}</h2>
        <Button variant="danger" onClick={handleClearCart}>
          Clear Cart
        </Button>
        <Button variant="success" className="checkoutButton">
          Proceed to Checkout
        </Button>
      </div>

      {cartItems.length > 0 ? (
        <>
          <Row className="g-4">
            {cartItems.map((item) => (
              <Col key={`${item.id}-${item.selectedOption}`} xs={12}>
                <Card className="cartItemCard">
                  <Row className="align-items-center g-0">
                    <Col xs={4}>
                      <Card.Img
                        src={item.image}
                        alt={item.name}
                        className="cartItemImage"
                      />
                    </Col>
                    <Col xs={8}>
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>Option: {item.selectedOption}</Card.Text>
                        <Card.Text>
                          Price: R{parseFloat(item.price).toFixed(2)}
                        </Card.Text>
                        <Card.Text>Quantity: {item.quantity}</Card.Text>
                        <div className="cartItemActions">
                          <Button
                            variant="success"
                            onClick={() =>
                              handleAddItem(
                                item.id,
                                item.selectedOption,
                                item.quantity
                              )
                            }
                          >
                            +
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() =>
                              handleRemoveItem(
                                item.id,
                                item.selectedOption,
                                item.quantity
                              )
                            }
                          >
                            -
                          </Button>
                        </div>
                        <Card.Text>
                          Total: R
                          {(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Shared Modal for Clear Cart and Remove Item */}
          <Modal show={showModal} onHide={cancelAction} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                {modalType === "clearCart" ? "Clear Cart" : "Remove Item"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {modalType === "clearCart"
                ? "Are you sure you want to clear the cart? This action cannot be undone."
                : "Are you sure you want to remove this item from the cart?"}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cancelAction}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmAction}>
                {modalType === "clearCart" ? "Clear Cart" : "Remove"}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <h3>Your cart is empty</h3>
      )}
    </div>
  );
}
