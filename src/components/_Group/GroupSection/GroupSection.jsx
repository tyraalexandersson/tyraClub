import { useParams } from "react-router-dom";
import { useAppContext } from "../../../context/contextProvider";
import GroupActivityList from "../GroupActivityList/GroupActivityList";
import Group from "../Group/Group";
import "./GroupSection.style.css";

const GroupSection = () => {
  const { id } = useParams(); // <-- get group id from URL param
  const { groups } = useAppContext();

  // Find the selected group by id
  const selectedGroup = groups.find((g) => String(g.id) === id);

  return (
    <main className="sectionContain">
      <div className="groupSection__group_container">
        {selectedGroup ? (
          <Group group={selectedGroup} />
        ) : (
          <p>Clubben hittades inte!</p>
        )}
      </div>

      <div className="groupSection_other_container">
        <h2>Ta reda på vad de andra Clubbarna håller på med!</h2>
        <GroupActivityList groups={groups} currentGroupId={id} />
      </div>
    </main>
  );
};

export default GroupSection;
