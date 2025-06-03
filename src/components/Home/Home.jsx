import { useAppContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { Button } from "../index";
import "./Home.style.css";

const Home = () => {
  const { username } = useAppContext();
  const navigate = useNavigate();

  const userName = username ? username : "Friend";
  //const userName = userProfile.user_name ? userProfile.user_name : "Friend";

  const handleStart = () => {
    navigate("/wall");
  };
  const handleFindClub = () => {
    navigate("/groups/search");
  };
  return (
    <main className="homeContainer sectionContain">
      <div className="homeHeaderContainer">
        <img className="headerImg" src="/lgox.png" alt="Tyra club logo" />
        <h1 className="homeHeader">Hejsan {userName}!</h1>
        <Button
          variant="btn-primary"
          label="Hitta en club!"
          type="button"
          className="homeCtaBtn"
          onClick={handleFindClub}
        />
      </div>

      <div className="homeContent">
        <h2 className="homeContentHeader">Vad är Tyra Club?</h2>
        <p className="homeContentText">
          Tyra Club är en social plattform där du kan skapa och gå med i grupper
          som delar dina intressen. Oavsett om du är intresserad av musik,
          sport, böcker eller något annat, finns det en plats för dig här.
        </p>
        <p className="homeContentText">
          Håll kontakten med dina vänner och dela dina intressen med andra. Här
          finns inga regler, bara frihet att vara dig själv och utforska det du
          älskar.
        </p>
      </div>

      <div className="homeContent">
        <div className="homeContentBtnBox">
          <Button
            variant="btn-secondary"
            label="Starta äventyret!"
            className="homeContentBtn"
            type="button"
            onClick={handleStart}
          />
        </div>
      </div>
    </main>
  );
};
export default Home;
