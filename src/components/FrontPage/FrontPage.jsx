import "./FrontPage.style.css";

const FrontPage = () => {
  return (
    <div className="header-container">
      <h1 className="header">Welcome to the Tyra Club!</h1>
      <p className="description">
        Your one-stop destination for all things Tyra!
      </p>
      <div className="button-container">
        <button className="explore-button">Explore</button>
        <button className="join-button">Join Now</button>
      </div>
    </div>
  );
};

export default FrontPage;
