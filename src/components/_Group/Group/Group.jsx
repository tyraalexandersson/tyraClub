import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../../context/contextProvider";
import "./Group.style.css";
import { Button } from "../../index";
import { supabase } from "../../../lib/supabaseClient";

const Group = ({ group }) => {
  const { posts, setPosts, fetchPosts, createPost, user } = useAppContext();
  const [message, setMessage] = useState("");
  const [groupPosts, setGroupPosts] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usersMap, setUsersMap] = useState({});
  const [isMember, setIsMember] = useState(false);
  const userId = user.id;

  const checkIfMember = useCallback(() => {
    if (!user || !group?.id) return;

    // Check if the user is a member of the group
    const isMember = group.members_id?.includes(userId);
    setIsMember(isMember);
  }, [userId, group, user]);

  useEffect(() => {
    checkIfMember();
  }, [checkIfMember, user, group]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (isSubmitting || !message.trim()) return;

    setIsSubmitting(true);
    setError(""); // clear previous errors

    const data = await createPost(group.id, message);
    if (!data) {
      setError("Failed to create post. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setPosts((prev) => [...prev, data]);
    setMessage("");
    setError("");
    setIsSubmitting(false);
  };

  const loadPostsForGroup = useCallback(
    async (clubId) => {
      const postsData = await fetchPosts(clubId);
      if (!postsData) {
        setError("Failed to load posts. Please try again.");
        return;
      }
      setPosts(postsData);
    },
    [fetchPosts, setPosts]
  );

  useEffect(() => {
    if (!group?.id) return;

    loadPostsForGroup(group.id);
  }, [group.id, loadPostsForGroup]);

  useEffect(() => {
    if (!group?.id || !Array.isArray(posts)) return;

    const filtered = posts.filter((p) => p.club_id === group.id);
    setGroupPosts(filtered);
  }, [posts, group?.id]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!groupPosts.length) return;

      // get unique author IDs
      const uniqueUserIds = [
        ...new Set(groupPosts.map((post) => post.author_id)),
      ];

      // fetch users by ids
      const { data: users, error } = await supabase
        .from("Users")
        .select("user_id, user_name")
        .in("user_id", uniqueUserIds);

      if (error) {
        console.error("Error fetching user names:", error.message);
        return;
      }

      // create map { user_id: user_name }
      const map = {};
      users.forEach((user) => {
        map[user.user_id] = user.user_name;
      });
      setUsersMap(map);
    };

    fetchUsers();
  }, [groupPosts]);

  const handleJoinGroup = async () => {
    try {
      if (!user) return;

      const userId = user.id;

      // Fetch current members_id array
      const { data: clubData, error: fetchError } = await supabase
        .from("Clubs")
        .select("members_id")
        .eq("id", group.id)
        .single();

      if (fetchError || !clubData) {
        setError("Failed to fetch group data.");
        console.error(fetchError);
        return;
      }

      const currentMembers = clubData.members_id || [];

      if (currentMembers.includes(userId)) {
        setError("You are already a member of this group.");
        return;
      }

      const updatedMembers = [...currentMembers, userId];

      const { error: updateError } = await supabase
        .from("Clubs")
        .update({ members_id: updatedMembers })
        .eq("id", group.id);

      if (updateError) {
        setError("Failed to join group. Please try again.");
        console.error(updateError);
        return;
      }

      setError("");
      setIsMember(true); // 👈 Immediately hide the button!
      alert("Successfully joined the group!");
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="group">
      {error && <p className="error">{error}</p>}
      <h2 className="group__title">{group.club_name}</h2>

      <div className="group__posts">
        {groupPosts.length === 0 ? (
          <p>Ingen har skrivit något än!</p>
        ) : (
          groupPosts.map((post) => (
            <div key={post.id} className="group__post">
              <h3>{usersMap[post.author_id] || post.author_id} säger:</h3>
              <p>{post.message_txt}</p>
              <small>at {new Date(post.created_at).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="group__message-form">
        <textarea
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="group__message-input"
        />
        <Button
          label="POST"
          variant="secondary"
          type="submit"
          className="postBtn"
          onClick={handleSubmit}
        />
      </form>
      {!isMember && (
      <Button
        variant="primary"
        label="Join the group"
        className="joinBtn"
        onClick={handleJoinGroup}
      />
      )}
    </div>
  );
};

export default Group;
