import React, { useState } from "react";
import { Button, Card, Col, Row, Dropdown, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import products from "./Inventory";
import "../css/Products.css";
import { addToCart } from "../store/cartSlice";

export default function Products() {
  // products have options
  const [selectedOptions, setSelectedOptions] = useState({});
  // products are divided into categories
  const [selectedCategory, setSelectedCategory] = useState("All");
  // user must be logged in and select a product option to add to cart
  const [showModal, setShowModal] = useState(false);
  const [currentModalMessage, setCurrentModalMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check login status
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.isLoggedIn;

  const handleOptionSelect = (option, productId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: option,
    }));
  };

  const handleAddToCart = (product) => {
    const selectedOption = selectedOptions[product.id];

    if (!isLoggedIn) {
      setCurrentModalMessage(
        "You need to be logged in to add items to the cart."
      );
      setShowModal(true);
      return;
    }

    if (!selectedOption) {
      setCurrentModalMessage(
        "Please select an option before adding this item to your cart."
      );
      setShowModal(true);
      return;
    }

    const item = { ...product, selectedOption };
    dispatch(addToCart(item));
  };

  const handleCloseModal = () => setShowModal(false);

  const handleLoginRedirect = () => {
    setShowModal(false);
    navigate("/");
  };

  const categories = ["Soccer", "Cricket", "Rugby", "Tennis"];

  // Products can be viewed according to category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="productGrid">
      <div className="categoryFilters">
        <Button
          variant="secondary"
          onClick={() => setSelectedCategory("All")}
          active={selectedCategory === "All"}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant="secondary"
            onClick={() => setSelectedCategory(category)}
            active={selectedCategory === category}
          >
            {category}
          </Button>
        ))}
      </div>
      {selectedCategory === "All" ? (
        categories.map((category) => (
          <div key={category} className="categorySection">
            <h2>{category}</h2>
            <Row>
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <Col key={product.id} xs={12} sm={6} md={3} className="g-4">
                    <Card className="productCard">
                      <Card.Img
                        className="cardImage"
                        variant="top"
                        src={product.image}
                        alt={product.name}
                      />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                          <strong>R{product.price}</strong>
                        </Card.Text>
                        <Card.Text>{product.description}</Card.Text>
                        <Dropdown>
                          <Dropdown.Toggle variant="dark">
                            {selectedOptions[product.id] || "Select an Option"}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {product.options.map((option) => (
                              <Dropdown.Item
                                key={option}
                                onClick={() =>
                                  handleOptionSelect(option, product.id)
                                }
                              >
                                {option}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button
                          variant="success"
                          className="addToCartButton"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        ))
      ) : (
        <div className="categorySection">
          <h2>{selectedCategory}</h2>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={3} className="g-4">
                <Card className="productCard">
                  <Card.Img
                    className="cardImage"
                    variant="top"
                    src={product.image}
                    alt={product.name}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      <strong>R{product.price}</strong>
                    </Card.Text>
                    <Card.Text>{product.description}</Card.Text>
                    <Dropdown>
                      <Dropdown.Toggle variant="dark">
                        {selectedOptions[product.id] || "Select an Option"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {product.options.map((option) => (
                          <Dropdown.Item
                            key={option}
                            onClick={() =>
                              handleOptionSelect(option, product.id)
                            }
                          >
                            {option}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button
                      variant="success"
                      className="addToCartButton"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Modal for notification message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Please Note</Modal.Title>
        </Modal.Header>
        {/* Show the relevant message */}
        <Modal.Body>{currentModalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {/* Allow user to login from the modal */}
          {!isLoggedIn && (
            <Button variant="primary" onClick={handleLoginRedirect}>
              Login
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
