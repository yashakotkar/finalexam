import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Navbar.css";
import { isAuth, setAuth } from "./../../utils/auth";

const Navbar = () => {
  const isCurrentPage = {
    orders: false,
    products: false,
    users: false,
  };

  let location = useLocation();
  let navigate = useNavigate();

  console.log("Location", location.pathname.split("/")[1]);
  isCurrentPage[location.pathname.split("/")[1]] = true;

  let isLoggedIn = isAuth();

  let handleLogout = (e) => {
    setAuth(false);
    return navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo-wrapper">
        <Link to="/" className="logo-img">
          <img src="/logo.png" alt="Logo" />
        </Link>
        <p className="logo-name">Kafene</p>
      </div>

      <div className="nav-link-wrapper">
        <Link
          className={
            isCurrentPage["orders"] ? "nav-link nav-link-active" : "nav-link"
          }
          to={isLoggedIn ? "/orders" : "#"}
        >
          Orders
        </Link>
        <Link
          className={
            isCurrentPage["products"] ? "nav-link nav-link-active" : "nav-link"
          }
          to={isLoggedIn ? "/products" : "#"}
        >
          Products
        </Link>
        <Link
          className={
            isCurrentPage["users"] ? "nav-link nav-link-active" : "nav-link"
          }
          to={isLoggedIn ? "/users" : "#"}
        >
          Users
        </Link>
      </div>
      {isLoggedIn && (
        <button className="auth-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
