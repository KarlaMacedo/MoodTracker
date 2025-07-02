// src/features/dashboard/AddMood.jsx
import { useState } from "react";
import api from "../../api/api";

const AddMood = ({ onMoodAdded }) => {
  const [text, setText] = useState("");
  const [tag, setTag] = useState("General");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/mood", { text, tag });
      setText("");
      setTag("General");
      onMoodAdded(); // recargar lista
    } catch (err) {
      console.error("Error al crear mood:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-base-200 p-4 rounded-lg shadow">
      <input
        type="text"
        placeholder="¿Cómo te sientes hoy?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input input-bordered"
        required
      />
      <select value={tag} onChange={(e) => setTag(e.target.value)} className="select select-bordered">
        <option>Sin clasificar</option>
        <option>Otros</option>
        <option>Trabajo</option>
        <option>Familia</option>
        <option>Salud</option>
        <option>Amigos</option>
        <option>Amor</option>
        <option>Finanzas</option>
        <option>Estudio</option>
      </select>
      <button className="btn btn-primary" type="submit">Guardar</button>
    </form>
  );
};

export default AddMood;
