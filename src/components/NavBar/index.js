import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu, IoIosCloseCircle } from "react-icons/io";
import Cookies from "js-cookie";
import logo from "../Images/logo.png";
import "./index.css";

const NavBar = ({ active = true }) => {
  const [displayItems, setDisplayItems] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0); // State for visitor count
  const navigate = useNavigate();
  const hasFetched = useRef(false); // Track if the API call has been made

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true; // Mark as fetched
      const fetchVisitorCount = async () => {
        try {
          const apiUrl = `https://tastyfoods-apis.onrender.com/visitors-count`;
          const response = await fetch(apiUrl); // Replace with your API
          const data = await response.json();
          setVisitorCount(data.visitors_count);
        } catch (error) {
          console.error("Failed to fetch visitor count:", error);
          setVisitorCount(67); // Placeholder value
        }
      };

      fetchVisitorCount();
    }
  }, []);

  const onClickLogout = async () => {
    await Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  const change = () => {
    setDisplayItems((prevDisplayItems) => !prevDisplayItems);
  };

  return (
    <Fragment>
      <nav className="nav">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="row">
            <img className="navbar-logo" src={logo} alt="website logo" />
            <h1 className="navbar-text">Tasty Kitchens</h1>
          </div>
        </Link>
        <ul className="nav-list-lg">
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className={active ? "active" : "not-active"}>Home</li>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <li className={!active ? "active" : "not-active"}>Cart</li>
          </Link>
          <li className="visitor-count">Visitors: {visitorCount}</li>{" "}
          {/* Visitor count */}
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </ul>
        <IoMdMenu size={25} onClick={change} className="ham" />
      </nav>
      <nav className={displayItems ? "nav-row" : "nav-items-2"}>
        <ul className="nav-list-lg2">
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className={active ? "active" : "not-active"}>Home</li>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <li className={!active ? "active" : "not-active"}>Cart</li>
          </Link>
          <li className="visitor-count">Visitors: {visitorCount}</li>{" "}
          {/* Visitor count */}
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </ul>
        <IoIosCloseCircle size={25} className="ham" onClick={change} />
      </nav>
    </Fragment>
  );
};

export default NavBar;
