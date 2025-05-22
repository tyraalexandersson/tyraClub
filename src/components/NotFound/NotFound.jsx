import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./NotFound.style.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="sectionContain">
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Ooops!</h1>
        <p>Detta är inte sidan du letar efter.</p>
        <div className="notfoundImg">
          <img
            src="/catwader.png"
            alt="404 Not Found"
            style={{ width: "300px", height: "auto" }}
          />
        </div>
        <Button label="Go Back" variant="primary" className="notfoundBtn" onClick={() => navigate(-1)} />
      </div>
    </main>
  );
};

export default NotFound;
