import { useAppContext } from "../../../context/contextProvider";
import GroupList from "../Groups/GroupList";
import GroupCreateForm from "../GroupCreateForm/GroupCreateForm";
import "./GroupSection.style.css";

const GroupSection = () => {
  const { groups } = useAppContext();

  return (
    <div className="groups__container">
      <h2 className="groups__title">Your Clubs</h2>
      <GroupList groups={groups} />
      <GroupCreateForm />
    </div>
  );
};

export default GroupSection;
