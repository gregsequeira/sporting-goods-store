import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginPage from "./components/Login";
import RegistrationForm from "./components/Registration";
import Products from "./components/Products";
import Cart from "./components/Cart";
import CartInfo from "./components/CartInfo";
import Checkout from "./components/CheckOut";

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.isLoggedIn;

  const showCartInfo =
    isLoggedIn &&
    (location.pathname === "/home" || location.pathname === "/products");

  return (
    <div className="App">
      <Header />
      {showCartInfo && <CartInfo />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
