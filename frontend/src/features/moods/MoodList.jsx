const MoodList = ({ moods, onEdit, onDelete }) => {
  if (!moods.length) return <p className="text-center text-gray-500 mt-8">No hay registros emocionales aún.</p>;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {moods.map((mood) => (
          <div
            key={mood._id}
            className="card shadow-md bg-gradient-to-br from-purple-100 via-green-100 to-yellow-100 rounded-xl border border-gray-200"
          >
            <div className="card-body">
              <div className="flex items-start gap-2">
                <span className="text-yellow-500 text-xl">⭐</span>
                <div className="flex flex-col">
                  <p className="text-md font-semibold text-gray-800">{mood.text}</p>
                  <p className="text-sm text-gray-600">{mood.tag} · {new Date(mood.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => onEdit(mood)}
                  className="btn btn-sm btn-outline btn-info"
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
        ))}
      </div>
    </div>
  );
};

export default MoodList;
