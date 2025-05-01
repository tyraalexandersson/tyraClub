import "./Navbar.style.css";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context";
import { hamburgerArrow } from "../../assets";

const Navbar = () => {
  const { user, logout } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/smallLogo.png" alt="Logo" className="logoNav" />
      </div>
      <div
        ref={menuRef}
        className={`navbar__links ${menuOpen ? "active" : ""}`}
      >
        <Link to="/" className="navLink">
          Hem
        </Link>
        <Link to="/wall" className="navLink">
          Vägg
        </Link>
        <Link to="/account" className="navLink">
          konto
        </Link>

        {user ? (
          <p className="navLink" onClick={handleLogout}>
            Logga ut
          </p>
        ) : (
          <Link to="/login" className="navLink">
            Logga in
          </Link>
        )}
      </div>
      <div ref={hamburgerRef} className="hamburger" onClick={toggleMenu}>
        {/*  <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span> */}
        <img src={hamburgerArrow} alt="Menu" className="hamburgerIcon" />
      </div>
    </nav>
  );
};
export default Navbar;
