import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import { PiUserCircleGearBold } from "react-icons/pi";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [searchActive, setSearchActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  // If user is logged in, redirect to '/mypage'
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/mypage");
    }
  }, [isLoggedIn, navigate]);

  return (
    <header>
      <div className="Header-Top">
        <div className="Header-Content">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <div className="menu-toggle" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <ul
            className={`menu-list ${menuActive ? "menu-active" : ""}`}
            id="menu-mobile"
          >
            <li>
              <Link className="link" to="/online-class">
                Online Class
              </Link>
            </li>
            <li>
              <Link className="link" to="/mentor-service">
                Mentor Service
              </Link>
            </li>
            <li>
              <Link className="link" to="/community">
                Community
              </Link>
            </li>
            <li>
              <Link className="link" to="/contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="Search-Login">
            <div className={`Search ${searchActive ? "active" : ""}`}>
              <input type="text" placeholder="Search" />
              <button onClick={toggleSearch}>Search</button>
            </div>
            <div className="LogReg">
              {isLoggedIn ? (
                <Link to="/mypage">
                  <PiUserCircleGearBold />
                </Link>
              ) : (
                <Link to="/login">
                  <span className="login">Login</span>
                </Link>
              )}
              {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
            </div>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
