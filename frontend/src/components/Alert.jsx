const Alert = ({ message, type = "info", onClose }) => {
  return (
    <div className={`alert alert-${type} shadow-lg w-fit`}>
      <span>{message}</span>
      <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost ml-2">✕</button>
    </div>
  );
};

export default Alert;
