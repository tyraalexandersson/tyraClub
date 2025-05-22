import { useState } from "react";
import { useAppContext } from "../../../context/contextProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "../../index";
import "./GroupCreateForm.style.css";

const GroupCreateForm = () => {
  const { createGroup } = useAppContext();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors

    if (!name || !description) {
      setError("Du behöver ha med både namn och beskrivning.");
      return;
    }

    const result = await createGroup(name, description);

    if (result instanceof Error) {
      setError(result.message || "Det gick inte att skapa en ny club nu, försök igen.");
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
        placeholder="Namn på club"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="group-form__input group-form__input_name"
      />
      <textarea
        placeholder="Beskrivning av club"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="group-form__input group-form__input_description"
      />
      <Button
        type="submit"
        label="Skapa Club"
        variant="primary"
        className="btn btn__submit-group"
        onClick={handleSubmit}
      />
      {error && <p className="error">{error}</p>}
    </form>
  );
};
export default GroupCreateForm;
