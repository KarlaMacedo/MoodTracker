const DeleteMoodModal = ({ moodId, onConfirm, onCancel }) => {
  if (!moodId) return null;

  return (
    <dialog className="modal modal-open">
        <div className="modal-box">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                    <h2 className="text-lg font-semibold mb-4">¿Eliminar este mood?</h2>
                    <p className="text-sm text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
                    <div className="flex justify-end gap-2">
                        <button onClick={onCancel} className="btn btn-ghost">Cancelar</button>
                        <button onClick={() => onConfirm(moodId)} className="btn btn-error">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </dialog>
  );
};

export default DeleteMoodModal;
