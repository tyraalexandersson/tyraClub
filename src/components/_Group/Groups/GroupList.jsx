import "./GroupList.style.css";

const GroupList = ({ groups }) => {
  if (!groups.length) return <p>Du har inte gått med i någon Club än.</p>;

  return (
    <div className="groups__list">
      {groups.map((group) => (
        <div key={group.id} className="group__item">
          <h3>{group.club_name}</h3>
          <p>{group.club_description}</p>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
