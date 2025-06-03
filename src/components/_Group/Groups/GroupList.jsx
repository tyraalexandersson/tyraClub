import "./GroupList.style.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppContext } from "../../../context/contextProvider";

const GroupList = ({ groups }) => { 
  const navigate = useNavigate();
  const { allGroups, fetchAllGroups } = useAppContext();
  
  const [error, setError] = useState("");

  const handleClickGroup = (id) => {
    navigate(`/groups/${id}`);
  };

  

  useEffect(() => {
    const loadAllGroups = async () => {
      try {
        //eslint-disable-next-line no-unused-vars
        const clubs = await fetchAllGroups();
      } catch (err) {
        console.error("Error loading all groups:", err.message);
        setError("Could not load groups. Please try again.");
      }
    }
    loadAllGroups();
  },[fetchAllGroups]);

  if (!groups.length) {
    return (
      <div className="groups__list_container">
        <p>Du har inte gått med i någon Club än.</p>
        <p>Gå med i en Club för att se vad de andra Clubbarna håller på med!</p>
        {error && <p className="error">{error}</p>}
        {allGroups.length ? (
          <div className="groups__list">
            {allGroups.map((club) => (
              <div
                key={club.id}
                className="group__item"
                onClick={() => handleClickGroup(club.id)}
                id={club.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleClickGroup(club.id)
                }
              >
                <h3>{club.club_name}</h3>
                <p>{club.club_description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Laddar Clubs...</p>
        )}
      </div>
    );
  }
  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="groups__list">
      {groups.map((group) => (
        <div
          key={group.id}
          className="group__item"
          onClick={() => handleClickGroup(group.id)}
          id={group.id}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleClickGroup(group.id)}
        >
          <h3>{group.club_name}</h3>
          <p>{group.club_description}</p>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
