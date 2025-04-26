import "./Navbar.style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h1>Tyra Club</h1>
      </div>
      <div className="navbar__links">
        <a href="#">
          <p className="navLink">Hem</p>
        </a>
        <a href="/wall">
          <p className="navLink">Vägg</p>
        </a>
        <a href="/logout">
          <p className="navLink">Logga ut</p>
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
