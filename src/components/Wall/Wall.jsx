import { useAppContext } from "../../context";
import { useNavigate } from "react-router-dom";
import "./Wall.style.css";
import GroupList from "../_Group/Groups/GroupList";

const Wall = () => {
  const { groups, username } = useAppContext();
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    navigate("/groups/create");
  };
  const handleSearchGroup = () => {
    navigate("/groups/search");
  };
  return (
    <>
      <main className="sectionContain">
        <div className="wall__container">
          <h1 className="wall__title">Det här är din vägg, {username}</h1>
          <p className="wall__description">
            Här kan du se dina senaste inlägg och aktiviteter i dina Clubbar.
          </p>
        </div>
       
        <div className="groups__container">
          <h2 className="groups__title">Dina Clubbar</h2>
          <div className="groups__list">
            <GroupList groups={groups} />
          </div>
        </div>
        <div className="btn__container">
          <button
            className="heart-btn btn__create-group"
            onClick={handleCreateGroup}
          >
            <span className="heart-label">Skapa en ny Club</span>
          </button>
          <button
            className="heart-btn btn__join-group"
            onClick={handleSearchGroup}
          >
            <span className="heart-label">Gå med i en Club</span>
          </button>
        </div>
      </main>
    </>
  );
};
export default Wall;
