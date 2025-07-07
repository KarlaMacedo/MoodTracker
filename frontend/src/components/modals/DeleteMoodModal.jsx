const DeleteMoodModal = ({ onCancel, onConfirm }) => {
  return (
    <dialog className="modal modal-open">
        <div className="modal-box">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
            <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-bold mb-2">¿Eliminar emoción?</h3>
                <p className="mb-4 text-gray-600">
                Esta acción no se puede deshacer.
                </p>

                <div className="flex justify-end gap-2">
                <button className="btn btn-outline" onClick={onCancel}>
                    Cancelar
                </button>
                <button className="btn btn-error" onClick={onConfirm}>
                    Eliminar
                </button>
                </div>
            </div>
            </div>
        </div>
    </dialog>
  );
};

export default DeleteMoodModal;
