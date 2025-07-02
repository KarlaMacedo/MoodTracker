const MoodList = ({ moods, onEdit, onDelete }) => {
  if (!moods.length) return <p>No hay moods aún.</p>;

  return (
    <ul className="space-y-4">
      {moods.map((mood) => (
        <li key={mood._id} className="card bg-base-100 shadow-md p-4">
          <h4 className="font-semibold">{mood.tag || "Sin clasificar"}</h4>
          <p className="text-gray-600">{mood.text}</p>
          <p className="text-sm text-gray-400">{new Date(mood.createdAt).toLocaleString()}</p>
          <div className="mt-2 flex gap-2">
            <button className="btn btn-xs btn-info" onClick={() => onEdit(mood)}>Editar</button>
            <button className="btn btn-xs btn-error" onClick={() => onDelete(mood._id)}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MoodList;
