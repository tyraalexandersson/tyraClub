import GroupList from "../index";
import GroupCreateForm from "../index";

import "./GroupSection.style.css";

const GroupSection = ({ groups, setGroups }) => {
  const handleCreateGroup = (newGroup) => {
    const newId = crypto.randomUUID(); // Replace with Supabase ID later
    const fullGroup = { id: newId, ...newGroup };
    setGroups((prev) => [...prev, fullGroup]);
  };

  return (
    <div className="groups__container">
      <h2 className="groups__title">Your groups</h2>
      <GroupList groups={groups} />
      <GroupCreateForm onCreate={handleCreateGroup} />
    </div>
  );
};

export default GroupSection;
// This component is responsible for rendering the group section.