import "./FrontPage.style.css";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/login");
  };

  return (
    <div className="header-container">
      <h1 className="header">Välkommen till Tyra Club!</h1>
      <p className="description">
        Håll kontakten med dina vänner och dela dina intressen med andra. Tyra Club är en plats för att skapa och delta i grupper som delar dina passioner.
      </p>
      <div className="button-container">
        <button className="join-button" onClick={handleJoin}>
          Börja Clubba!
        </button>
      </div>
    </div>
  );
};

export default FrontPage;
