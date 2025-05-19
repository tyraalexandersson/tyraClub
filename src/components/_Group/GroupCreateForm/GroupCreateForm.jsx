import { useState } from "react";

const GroupCreateForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) return;
    onCreate({ name, description }); // Replace with Supabase later
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="group-form">
      <input
        type="text"
        placeholder="Group name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Group description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="btn btn__submit-group">
        Create Group
      </button>
    </form>
  );
};

export default GroupCreateForm;
