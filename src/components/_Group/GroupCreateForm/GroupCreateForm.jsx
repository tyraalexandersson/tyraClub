import { useState } from "react";
import { useAppContext } from "../../../context/contextProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "../../index";
import "./GroupCreateForm.style.css";

const GroupCreateForm = () => {
  const { createClub } = useAppContext();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors

    if (!name || !description) {
      setError("Both name and description are required.");
      return;
    }

    const result = await createClub(name, description);

    if (result instanceof Error) {
      setError(result.message || "Failed to create club. Please try again.");
      return;
    }

    if (result?.id) {
      navigate(`/groups/${result.id}`);
      setName("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="group-form">
      <input
        type="text"
        placeholder="Club name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="group-form__input group-form__input_name"
      />
      <textarea
        placeholder="Club description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="group-form__input group-form__input_description"
      />
      <Button
        type="submit"
        label="Create Club"
        variant="primary"
        onClick={handleSubmit}
        className="btn btn__submit-group"
      />
      {error && <p className="error">{error}</p>}
    </form>
  );
};
export default GroupCreateForm;
