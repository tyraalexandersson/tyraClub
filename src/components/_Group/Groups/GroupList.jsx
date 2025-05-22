import "./GroupList.style.css";
import { useNavigate } from "react-router-dom";

const GroupList = ({ groups }) => {
  const navigate = useNavigate();

  const handleClickGroup = (id) => {
    navigate(`/groups/${id}`);
  };
  if (!groups.length) return <p>Du har inte gått med i någon Club än.</p>;

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
