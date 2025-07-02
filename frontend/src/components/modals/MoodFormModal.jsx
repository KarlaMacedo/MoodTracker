// src/components/modals/MoodFormModal.jsx
import { useState, useEffect } from "react";
import api from "../../api/api";

const MoodFormModal = ({ mood, onClose, onSaved }) => {
  const isEdit = Boolean(mood._id);
  const [text, setText] = useState(mood.text || "");
  const [tag, setTag] = useState(mood.tag || "Sin clasificar");

  useEffect(() => {
    setText(mood.text || "");
    setTag(mood.tag || "Sin clasificar");
  }, [mood]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/mood/${mood._id}`, { text, tag });
      } else {
        await api.post("/mood", { text, tag });
      }
      onSaved(isEdit); // refetch moods
      onClose();
    } catch (err) {
      console.error("Error guardando mood:", err.response?.data || err.message);
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">{isEdit ? "Editar mood" : "Nuevo mood"}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="¿Cómo te sientes?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <select className="select select-bordered w-full" value={tag} onChange={(e) => setTag(e.target.value)}>
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
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Guardar cambios" : "Crear mood"}
            </button>
            <button type="button" className="btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default MoodFormModal;
