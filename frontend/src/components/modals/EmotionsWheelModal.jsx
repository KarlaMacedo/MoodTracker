const EmotionWheelModal = ({ onClose }) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <p className="font-bold text-lg mb-4! text-center">Rueda de las emociones</p>
        <img
          src="../../../public/ruedaEmociones.jpeg"
          alt="Rueda de las emociones"
          className="w-full rounded-lg shadow-lg"
        />
        <div className="modal-action mt-4">
          <button onClick={onClose} className="btn btn-outline w-full">Volver al formulario</button>
        </div>
      </div>
    </dialog>
  );
};

export default EmotionWheelModal;
