import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../images/elite.png";

import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const closeMenu = () => setClick(false);

  return (
    <div className="header">
      <nav className="navbar">
        <a href="/" className="logo">
          <img src={logo} alt="Klogo" />
        </a>
        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={30} style={{ color: "#ffffff" }} />
          ) : (
            <FaBars size={30} style={{ color: "#ffffff" }} />
          )}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item text-center">
            <a href="/" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li className="nav-item text-center">
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>
          <li className="nav-item text-center">
            <a href="#testimonials" onClick={closeMenu}>
              SiteMap
            </a>
          </li>
          <li className="nav-item text-center">
            <a href="#demo" onClick={closeMenu}>
              Cart
            </a>
          </li>
          <li className="nav-item text-center">
            <a href="#form" onClick={closeMenu}>
              Registration
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
