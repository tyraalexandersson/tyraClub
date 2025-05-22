import "./GroupList.style.css";
import { useNavigate } from "react-router-dom";

const GroupList = ({ groups }) => {
  const navigate = useNavigate();

  const handleClickGroup = (e) => {
    navigate(`/groups/${e.currentTarget.id}`);
  };
  if (!groups.length) return <p>Du har inte gått med i någon Club än.</p>;

  return (
    <div className="groups__list">
      {groups.map((group) => (
        <div key={group.id} className="group__item" onClick={handleClickGroup}>
          <h3>{group.club_name}</h3>
          <p>{group.club_description}</p>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
