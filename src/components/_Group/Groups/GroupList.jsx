import "./GroupList.style.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";

const GroupList = ({ groups }) => { 
  const navigate = useNavigate();
  const [allClubs, setAllClubs] = useState([]);
  const [error, setError] = useState("");

  const handleClickGroup = (id) => {
    navigate(`/groups/${id}`);
  };

  // Fetch all clubs if user isn't a member of any group yet
  useEffect(() => {
    const fetchAllClubs = async () => {
      try {
        const { data, error } = await supabase
          .from("Clubs")
          .select("id, club_name, club_description");

        if (error) {
          console.error("Error fetching clubs:", error.message);
          setError("Could not load clubs. Please try again.");
          return;
        }

        setAllClubs(data || []);
      } catch (err) {
        console.error("Unexpected error fetching clubs:", err.message);
        setError("Something went wrong. Please try again.");
      }
    };

    if (!groups.length) {
      fetchAllClubs();
    }
  }, [groups]);

  if (!groups.length) {
    return (
      <div className="groups__list_container">
        <p>Du har inte gått med i någon Club än.</p>
        <p>Gå med i en Club för att se vad de andra Clubbarna håller på med!</p>
        {error && <p className="error">{error}</p>}
        {allClubs.length ? (
          <div className="groups__list">
            {allClubs.map((club) => (
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
