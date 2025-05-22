import { useAppContext } from "../../context";
import { useNavigate } from "react-router-dom";
import "./Wall.style.css";


const Wall = () => {
  const { groups, username } = useAppContext();
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    // Logic to create a new group
    console.log("Create a new group");
    navigate("/groups/create");
  }
  const handleSearchGroup = () => {
    // Logic to search for a group
    console.log("Search for a group");
    navigate("/groups/search");
  }
  return (
    <>
      <main className="sectionContain">
        <div className="wall__container">
          <h1 className="wall__title">Welcome to your wall, {username}</h1>
          <p className="wall__description">
            The latest posts from your groups are shown here.
          </p>
        </div>
        <div className="latest__posts">
          {/* Newest posts will be rendered here */}
        </div>
        <div className="groups__container">
          <h2 className="groups__title">Your clubs</h2>
          <div className="groups__list">
            {groups.length === 0 ?(
              <div className="no-groups">
                <p>You are not part of any club yet.</p>
                <p>Join a group to see the latest posts.</p>
              </div>
            ): (
            groups.map((group) => (
              <div key={group.id} className="group__item">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
              </div>
            ))
            )}
          </div>
        </div>
        <div className="btn__container">
          <button className="heart-btn btn__create-group" onClick={handleCreateGroup}>
            <span className="heart-label">Create a new group</span>
          </button>
          <button className="heart-btn btn__join-group" onClick={handleSearchGroup}>
            <span className="heart-label">Join a group</span>
          </button>
        </div>
      </main>
    </>
  );
};
export default Wall;
