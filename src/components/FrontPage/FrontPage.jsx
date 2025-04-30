import "./FrontPage.style.css";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/login");
  };

  return (
    <div className="header-container">
      <h1 className="header">Welcome to the Tyra Club!</h1>
      <p className="description">
        Your one-stop destination for all things Tyra!
      </p>
      <div className="button-container">
        <button className="join-button" onClick={handleJoin}>
          Join the Community!
        </button>
      </div>
    </div>
  );
};

export default FrontPage;
