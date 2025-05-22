import GroupCreateForm from "../GroupCreateForm/GroupCreateForm";
import GroupList from "../Groups/GroupList";
import { useAppContext } from "../../../context/contextProvider";
import { useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import "./GroupCreatePage.style.css";

const GroupCreatePage = () => {
  const { groups, setGroups, user } = useAppContext();

  useEffect(() => {
    const fetchUserClubs = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("Clubs")
        .select("*")
        .contains("members_id", [user.id]); // assuming you're storing member ids as an array

      if (data) setGroups(data);
      else console.error("Failed to fetch user clubs:", error?.message);
    };

    fetchUserClubs();
  }, [user, setGroups]);

  return (
    <main className="sectionContain">
      <div className="groups__page">
        <h1>Create a New Club</h1>
        <GroupCreateForm />
        <GroupList groups={groups} />
      </div>
    </main>
  );
};

export default GroupCreatePage;
