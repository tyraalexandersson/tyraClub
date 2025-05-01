import { useAppContext } from "context/contextProvider";
import "./Wall.style.css";


const Wall = () => {
  const { user } = useAppContext();
  return (
    <>
      <main className="wall">
        <div className="wall__container">
          <h1 className="wall__title">Welcome to your wall, {user.name}</h1>
          <p className="wall__description">
            This is where you can see all your posts and updates.
          </p>
        </div>
        <div className="wall__posts">{/* Posts will be rendered here */}</div>
      </main>
    </>
  );
};
export default Wall;
