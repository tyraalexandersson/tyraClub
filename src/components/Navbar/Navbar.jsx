import "./Navbar.style.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/contextProvider";

const Navbar = () => {
  const { user, logout } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/smallLogo.png" alt="Logo" className="logoNav" />
      </div>
      <div className={`navbar__links ${menuOpen ? "active" : ""}`}>
        <Link to="/">
          <p className="navLink">Hem</p>
        </Link>
        <Link to="/wall">
          <p className="navLink">Vägg</p>
        </Link>
        <Link to="/account">
          <p className="navLink">konto</p>
        </Link>

        {user && (
          <p className="navLink" onClick={handleLogout}>
            Logga ut
          </p>
        )}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};
export default Navbar;
