import { useAppContext } from "../../context";
import "./Wall.style.css";
import { useState } from "react";

const Wall = () => {
  const { user } = useAppContext();
  const [groups, setGroups] = useState([]); // swicth to supabase later down the line
  const [posts, setPosts] = useState([]); // swicth to supabase later down the line

  return (
    <>
      <main className="wall">
        <div className="wall__container">
          <h1 className="wall__title">Welcome to your wall, {user.name}</h1>
          <p className="wall__description">
            The latest posts from your groups are shown here.
          </p>
        </div>
        <div className="latest__posts">
          {/* Newest posts will be rendered here */}
        </div>
        <div className="groups__container">
          <h2 className="groups__title">Your groups</h2>
          <div className="groups__list">
            {groups.map((group) => (
              <div key={group.id} className="group__item">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="btn__container">
          <button className="btn__create-group">Create a new group</button>
          <button className="btn__join-group">Join a group</button>
        </div>
      </main>
    </>
  );
};
export default Wall;
