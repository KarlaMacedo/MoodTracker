const DeleteMoodModal = ({ onCancel, onConfirm }) => {
  return (
    <dialog className="modal modal-open">
        <div className="modal-box">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
            <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-md">
                <p className="text-lg font-bold mb-3!">¿Eliminar emoción?</p>
                <p className="mb-4 text-gray-600">
                Esta acción <span className="font-bold">no se puede deshacer</span>. ¿Estas seguro de eliminar el registro emocional?
                </p>

                <div className="flex justify-end gap-2 mt-6">
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
