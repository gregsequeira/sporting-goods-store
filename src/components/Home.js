import React from "react";
import { Button, Container, Row, Col, Figure } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import products from "./Inventory";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-4">
      <h1>PEPE'S SPORTING GOODS</h1>

      <p>
        Welcome to Pepe's Sporting Goods, we bring you a wide range of
        top-quality equipment for every sport, from soccer to cricket, tennis to
        rugby. Whether you're a seasoned athlete or just starting your sporting
        career, we have everything you need to succeed.
      </p>

      <div className="productImages my-4">
        <Row className="justify-content-center">
          {products.slice(0, 6).map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} className="mb-3">
              <Figure>
                <Figure.Image
                  width="100%"
                  height="200"
                  alt={product.name}
                  src={product.image}
                />
                <Figure.Caption>{product.name}</Figure.Caption>
              </Figure>
            </Col>
          ))}
        </Row>
      </div>

      <Button
        variant="primary"
        className="loginbtn"
        onClick={() => navigate("/login")}
      >
        Log In
      </Button>
    </Container>
  );
}
