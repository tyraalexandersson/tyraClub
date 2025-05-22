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
          <p>Group not found</p>
        )}
      </div>

      <div className="groupSection_other_container">
        <h2>See what your other groups are up to</h2>
        <GroupActivityList groups={groups} currentGroupId={id} />
      </div>
    </main>
  );
};

export default GroupSection;
