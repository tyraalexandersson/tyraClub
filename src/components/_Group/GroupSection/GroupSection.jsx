import { useParams } from "react-router-dom";
import { useAppContext } from "../../../context/contextProvider";
import GroupActivityList from "../GroupActivityList/GroupActivityList";
import GroupList from "../Groups/GroupList";
import "./GroupSection.style.css"; 

const GroupSection = () => {
  const { id } = useParams(); // <-- get group id from URL param
  const { groups, allGroups } = useAppContext();
 

  return (
    <main className="sectionContain">    

      <div className="groupSection_other_container">
        <h2>Dina clubbar är aktiva!</h2>
        <GroupActivityList groups={groups} currentGroupId={id} />
      </div>

      <div className="groupSection_all_container">
        <h2>Gå med i en ny club!</h2>
        <GroupList groups={allGroups} />
      </div>
    </main>
  );
};

export default GroupSection;
