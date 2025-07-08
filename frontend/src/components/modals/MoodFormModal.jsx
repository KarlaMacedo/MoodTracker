import { useState, useEffect } from "react";

const MoodFormModal = ({ mood, onSaved, onClose, openSecondary }) => {
  const [text, setText] = useState(mood?.text || "");
  const [category, setCategory] = useState(mood?.category || "Sin clasificar");
  const [emotion, setEmotion] = useState(mood?.emotion || "Sin clasificar");

  useEffect(() => {
    setText(mood?.text || "");
    setCategory(mood?.category || "Sin clasificar");
    setEmotion(mood?.emotion || "Sin clasificar");
  }, [mood]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const moodToSave = {
      ...mood,
      text: text.trim(),
      category,
      emotion
    };

    onSaved(moodToSave);
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
          <div className="bg-base-100 p-6 rounded-lg w-full max-w-md shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="text-xl font-bold mb-4">
                {mood?._id ? "Editar emoción:" : "Nueva emoción:"}
              </p>
              <textarea
                type="textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="textarea textarea-bordered mt-4 h-full "
                placeholder="¿Cómo te sientes?"
                required
              ></textarea>
              <p className="text-xl font-bold mb-4">
                Categoría:
              </p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered"
              >
                <option>Sin clasificar</option>
                <option>Trabajo💼</option>
                <option>Familia🧑‍🧑‍🧒</option>
                <option>Salud🩺</option>
                <option>Amigos🫂</option>
                <option>Amor💌</option>
                <option>Finanzas💰</option>
                <option>Estudio📝</option>
                <option>Otros</option>
              </select>
              <p className="text-xl font-bold mb-4">
                Emoción:
              </p>
              <select
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="select select-bordered"
              >
                <option>Sin clasificar</option>
                <option>Felicidad🙂</option>
                <option>Tristeza😢</option>
                <option>Ira😡</option>
                <option>Miedo😨</option>
                <option>Disgusto🫤</option>
                <option>Sorpresa😲</option>
              </select>

              <p className="text-sm text-center text-gray-600">
                ¿No sabes cuál es tu emoción?{" "}
                <button
                  type="button"
                  className="link text-primary font-bold!"
                  onClick={() => openSecondary("emotion-wheel")}
                >
                  Identifícala!
                </button>
              </p>

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={onClose} className="btn btn-outline">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {mood?._id ? "Guardar cambios" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default MoodFormModal;
