import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../css/Header.css";
import { logout } from "../store/userSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <Link to="/">HOME</Link>
      <Link to="/products">PRODUCTS</Link>
      <Link to="/about">ABOUT</Link>
      {isLoggedIn ? (
        <>
          <span className="headerUsername">{userDetails?.username}</span>
          <button className="headerLogout" onClick={handleLogout}>
            LOGOUT
          </button>
        </>
      ) : (
        <Link to="/">LOGIN</Link>
      )}
    </nav>
  );
}
