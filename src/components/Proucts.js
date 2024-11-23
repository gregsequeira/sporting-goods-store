import React, { useState } from "react";
import { Button, Card, Col, Row, Dropdown } from "react-bootstrap";
import products from "./Inventory";

export default function Products() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleOptionSelect = (option, productId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: option,
    }));
  };

  const categories = ["Soccer", "Cricket", "Rugby", "Tennis"];

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
                          <strong>{product.price}</strong>
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
                          // click to cart
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
                      <strong>{product.price}</strong>
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
                      // add to cart click
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
    </div>
  );
}
