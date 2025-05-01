import "./Home.style.css";
import { ThemeSelect } from "../index";

const Home = () => {
  return (
    <>
      <div className="header-container">
        <h1 className="header">Welcome to the Tyra Club!</h1>
        <ThemeSelect />
      </div>
    </>
  );
};
export default Home;
