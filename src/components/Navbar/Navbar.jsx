import "./Navbar.style.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h1>Tyra Club</h1>
      </div>
      <div className="navbar__links">
        <Link to="/">
          <p className="navLink">Hem</p>
        </Link>
        <Link to="/wall">
          <p className="navLink">Vägg</p>
        </Link>
        <Link to="/logout">
          <p className="navLink">Logga ut</p>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
