import { useAppContext } from "../../context";
import "./Home.style.css";

const Home = () => {
  const { username } = useAppContext();

  const userName = username ? username : "Friend";
  //const userName = userProfile.user_name ? userProfile.user_name : "Friend";
  return (
    <>
      <div className="header-container">
        <h1 className="header">Welcome {userName} to the Tyra Club!</h1>
      </div>
    </>
  );
};
export default Home;
