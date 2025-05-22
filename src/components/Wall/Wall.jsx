import { useAppContext } from "../../context";
import { useNavigate } from "react-router-dom";
import "./Wall.style.css";


const Wall = () => {
  const { groups, username } = useAppContext();
  const navigate = useNavigate();

  const handleCreateGroup = () => {       
    navigate("/groups/create");
  }
  const handleSearchGroup = () => {    
    navigate("/groups/search");
  }
  return (
    <>
      <main className="sectionContain">
        <div className="wall__container">
          <h1 className="wall__title">Det här är din vägg, {username}</h1>
          <p className="wall__description">
            Alla senaste inlägg från dina grupper kommer att visas här.
          </p>
        </div>
        <div className="latest__posts">
          {/* Newest posts will be rendered here */}
        </div>
        <div className="groups__container">
          <h2 className="groups__title">Dina Clubbar</h2>
          <div className="groups__list">
            {groups.length === 0 ?(
              <div className="no-groups">
                <p>Ajdå, du är inte medlem i någon clubb ännu.</p>
                <p>Gå med i en Club för se vad folk gör.</p>
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
            <span className="heart-label">Skapa en ny Club</span>
          </button>
          <button className="heart-btn btn__join-group" onClick={handleSearchGroup}>
            <span className="heart-label">Gå med i en Club</span>
          </button>
        </div>
      </main>
    </>
  );
};
export default Wall;
