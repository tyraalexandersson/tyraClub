import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../../context/contextProvider";
import "./Group.style.css";
import { Button } from "../../index";
import { supabase } from "../../../lib/supabaseClient";

const Group = ({ group }) => {
  const { posts, setPosts, fetchPosts, createPost } = useAppContext();
  const [message, setMessage] = useState("");
  const [groupPosts, setGroupPosts] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usersMap, setUsersMap] = useState({});

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
    </div>
  );
};

export default Group;
