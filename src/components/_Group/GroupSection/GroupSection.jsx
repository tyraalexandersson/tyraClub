import { useParams } from "react-router-dom";
import { useAppContext } from "../../../context/contextProvider";
import GroupActivityList from "../GroupActivityList/GroupActivityList";
import Group from "../Group/Group";
import "./GroupSection.style.css";
import { Button } from "../../index";
import { useState, useEffect, useCallback, use } from "react";
import { supabase } from "../../../lib/supabaseClient";

const GroupSection = () => {
  const { id } = useParams(); // <-- get group id from URL param
  const { groups, user } = useAppContext();
  const [error, setError] = useState("");
  const [isMember, setIsMember] = useState(false);
  const userId = user.id;
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [clubName, setClubName] = useState("");

  // Find the selected group by id from context first
  useEffect(() => {
    const groupFromContext = groups.find((g) => String(g.id) === id);
    setSelectedGroup(groupFromContext);
  }, [groups, id]);

  // Check if the user is a member of the group
  const checkIfMember = useCallback(async () => {
    if (!userId || !id) return;

    try {
      // Fetch the group directly from Supabase
      const { data: clubData, error: fetchError } = await supabase
        .from("Clubs")
        .select("members_id, club_name, club_description")
        .eq("id", id)
        .single();

      if (fetchError || !clubData) {
        console.error("Failed to fetch group:", fetchError?.message);
        setError("Failed to fetch group data.");
        return;
      }

      setSelectedGroup(clubData); // update selected group from Supabase

      const isUserMember = clubData.members_id?.includes(userId);
      setIsMember(isUserMember);
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setError("Something went wrong while checking membership.");
    }
  }, [userId, id]);

  useEffect(() => {
    checkIfMember();
  }, [checkIfMember]);

  const handleJoinGroup = async () => {
    if (!userId || !id) return;

    try {
      // Fetch current members
      const { data: clubData, error: fetchError } = await supabase
        .from("Clubs")
        .select("members_id")
        .eq("id", id)
        .single();

      if (fetchError || !clubData) {
        setError("Failed to fetch group data.");
        console.error(fetchError);
        return;
      }

      const currentMembers = clubData.members_id || [];

      if (currentMembers.includes(userId)) {
        setError("You are already a member of this group.");
        setIsMember(true);
        return;
      }

      const updatedMembers = [...currentMembers, userId];

      const { error: updateError } = await supabase
        .from("Clubs")
        .update({ members_id: updatedMembers })
        .eq("id", id);

      if (updateError) {
        setError("Failed to join group. Please try again.");
        console.error(updateError);
        return;
      }

      setError("");
      setIsMember(true);
      alert("Successfully joined the group!");
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setError("Something went wrong. Please try again.");
    }
  };
  
useEffect(() => {
if(selectedGroup) {
  setClubName(selectedGroup.club_name);
}

}, [selectedGroup]);

  return (
    <main className="sectionContain">
      <div className="groupSection__group_container">
        {selectedGroup ? (
          <Group group={selectedGroup} />
        ) : (
          <>
            {!isMember && (
              <>
                <h1>Du är inte medlem i {clubName}!</h1>
                <p>Gå med i clubben för att börja clubba!</p>
                <Button
                  variant="primary"
                  label="Join the group"
                  className="joinBtn"
                  onClick={handleJoinGroup}
                />
              </>
            )}
          </>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      <div className="groupSection_other_container">
        <h2>Ta reda på vad de andra Clubbarna håller på med!</h2>
        <GroupActivityList groups={groups} currentGroupId={id} />
      </div>
    </main>
  );
};

export default GroupSection;
