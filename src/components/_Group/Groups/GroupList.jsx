import './GroupList.style.css';

const GroupList = ({ groups }) => {
  if (!groups.length) return <p>You haven't joined any groups yet.</p>;

  return (
    <div className="groups__list">
      {groups.map((group) => (
        <div key={group.id} className="group__item">
          <h3>{group.name}</h3>
          <p>{group.description}</p>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
// This component is responsible for rendering the list of groups.