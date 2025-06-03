import "./GroupSelected.style.css";
import { useAppContext } from "../../../context/contextProvider";
import Group from "../Group/Group";
import { Button } from "../../index";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const GroupSelected = () => {
  const { id } = useParams();
  const { allGroups, user } = useAppContext();
  const userId = user.id;

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    // Find the group in allGroups by ID
    const group = allGroups.find((g) => String(g.id) === id);
    setSelectedGroup(group);

    if (group) {
      // Check membership from the group data
      setIsMember(group.members_id.includes(userId));
    }
  }, [allGroups, id, userId]);

  const handleJoinGroup = async () => {
    if (!selectedGroup || !userId) return;

    const updatedMembers = [...selectedGroup.members_id, userId];

    const { error } = await supabase
      .from("Clubs")
      .update({ members_id: updatedMembers })
      .eq("id", id);

    if (error) {
      console.error("Failed to join group:", error.message);
      return;
    }

    // Optimistically update context (so groups view refreshes)
    selectedGroup.members_id = updatedMembers;
    setIsMember(true);
    alert("Successfully joined the group!");
  };

  if (!selectedGroup) {
    return (
      <main className="sectionContain">
        <div className="navGroup__title">
          <div className="navGroup">
            <div className="navgroup_Btn" onClick={() => window.history.back()}>
              <ArrowBackIosNewIcon className="backIcon" />
              <p>TILLBAKA</p>
            </div>
          </div>
        </div>
        <div className="groupSection__group_container">
          <p>Loading group data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="sectionContain">
      <div className="navGroup__title">
        <div className="navGroup">
          <div className="navgroup_Btn" onClick={() => window.history.back()}>
            <ArrowBackIosNewIcon className="backIcon" />
            <p>TILLBAKA</p>
          </div>
        </div>
      </div>

      <div className="groupSection__group_container">
        {isMember ? (
          <Group group={selectedGroup} />
        ) : (
          <>
            <h1>Du är inte medlem i {selectedGroup.club_name}!</h1>
            <p>Gå med i clubben för att börja clubba!</p>
            <Button
              variant="primary"
              label="Join the group"
              className="joinBtn"
              onClick={handleJoinGroup}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default GroupSelected;
