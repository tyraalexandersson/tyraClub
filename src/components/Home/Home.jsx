import { useAppContext } from "../../context";
import "./Home.style.css";

const Home = () => {
  const { username } = useAppContext();

  const userName = username ? username : "Friend";
  //const userName = userProfile.user_name ? userProfile.user_name : "Friend";
  return (
    <main className="homeContainer sectionContain">
      <div className="homeHeaderContainer">
        <img className="headerImg" src="/lgox.png" alt="Tyra club logo" />
        <h1 className="homeHeader">Welcome {userName}!</h1>
        <button className="homeCtaBtn">Find a club!</button>
      </div>

      <div className="homeContent">
        <h2 className="homeContentHeader">What is Tyra Club?</h2>
        <p className="homeContentText">
          Tyra Club is a community of Tyra fans who are passionate about her
          work and legacy. We share news, updates, and discussions about Tyra's
          career, including her modeling, acting, and television endeavors.
        </p>
        <p className="homeContentText">
          Join us to connect with other fans, share your thoughts, and celebrate
          the incredible impact Tyra has had on the world!
        </p>
      </div>

      <div className="homeContent">
        <div className="homeContentBtnBox">
          <button className="homeContentBtn"> Start clubbing!</button>
        </div>
      </div>
    </main>
  );
};
export default Home;
