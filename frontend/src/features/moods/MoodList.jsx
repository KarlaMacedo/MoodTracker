import { useModal } from "../../context/ModalContext";

const MoodList = ({ moods, onEdit, onDelete }) => {
  const { openModal } = useModal();

  if (!moods.length) return <p className="text-center text-gray-500 mt-8">No hay registros emocionales aún.</p>;

  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="container mx-auto px-3 my-8 flex justify-center">
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:gap-25 lg:gap-13 xl:gap-18 gap-6 mt-6">
        {moods.map((mood) => (
          <div
            key={mood._id}
            className="card inset-ring-2 inset-ring-indigo-500/50 w-80 md:w-65 2xl:w-70 2xl:h-53"
          >
            <div className="card-body flex justify-between">
              <div className="flex items-center gap-3 justify-center content-center">
                <span className="text-yellow-500 text-2xl">⭐</span>
                <div className="flex flex-col">
                  <p className="text-md font-semibold text-gray-800">{truncateText(mood.text)}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>
                  <p className="text-sm text-gray-600"><span className="font-semibold">{mood.tag} ·</span> {new Date(mood.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex justify-center gap-5 mt-4">
                  {mood.text.length > 50 && (
                  <button
                    onClick={() => openModal("view", mood)}
                    className="btn btn-sm btn-outline btn-secondary"
                  >
                    Ver
                  </button>
                )}
                  <button
                    onClick={() => onEdit(mood)}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(mood._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodList;
