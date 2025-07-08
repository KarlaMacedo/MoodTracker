const ViewMoodModal = ({ mood, onClose }) => {
  if (!mood) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
          <div className="bg-base-100 p-6 rounded-lg w-full max-w-md shadow-lg">
            <p className="font-bold text-lg mb-2">⭐ {mood.category}  ·  {mood.emotion}</p>
            <p className="text-sm text-gray-500 mb-4!">{new Date(mood.createdAt).toLocaleString()}</p>
            <p className="whitespace-pre-line">{mood.text}</p>

            <div className="modal-action">
                <button className="btn btn-outline" onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ViewMoodModal;
