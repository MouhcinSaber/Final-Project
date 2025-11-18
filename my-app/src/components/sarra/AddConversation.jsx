import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addConversation } from "../../store/conversationsSlice";

const AddConversation = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
    const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addConversation({ title }));
      setTitle("");
    }
    };
    return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Conversation Title"
        required
      />
      <button type="submit">Add Conversation</button>
    </form>
  );
}
export default AddConversation;
