import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/contextProvider";
import { Link } from "react-router-dom";
import "./GroupActivityList.style.css";

const GroupActivityList = ({ groups, currentGroupId }) => {
  const { fetchPosts } = useAppContext();
  const [groupActivity, setGroupActivity] = useState({});

  useEffect(() => {
    const loadActivity = async () => {
      const activityMap = {};

      for (const group of groups) {
        const groupPosts = await fetchPosts(group.id);
        // later filter this based on last read timestamp, etc.
        activityMap[group.id] = groupPosts.length;
      }

      setGroupActivity(activityMap);
    };

    loadActivity();
  }, [groups, fetchPosts]);

  if (!groups.length) return (
    <>
      <p>Du är inte medlem i någon club än!</p>
      <p>Gå med i en club för att se de senaste inläggen.</p>
      <p>Du kan också skapa en ny club.</p>
      <Link to="/groups/create" className="btn btn__create-group">
        Skapa en ny club
      </Link>
      <Link to="/groups/search" className="btn btn__join-group">
        Gå med i en club
      </Link>
    </>
  );

  return (
    <div className="activityList_group-activity-list">
      {groups.map((group) => {
        if (group.id === currentGroupId) return null; // Skip the current group
        const postCount = groupActivity[group.id] || 0;
        const message =
          postCount === 0
            ? "No new messages"
            : `${postCount} new message${postCount > 1 ? "s" : ""}`;

        return (
          <Link
            to={`/groups/${group.id}`}
            key={group.id}
            className="group-activity-item"
          >
            <h3 className="activity_list_header">{group.club_name}</h3>
            <p className="activity_list_p">{message}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default GroupActivityList;
