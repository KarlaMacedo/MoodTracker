import { useState } from "react";
import { ModalContext } from "./ModalContext";
import DeleteMoodModal from "../components/modals/DeleteMoodModal";
import MoodFormModal from "../components/modals/MoodFormModal";
import ViewMoodModal from "../components/modals/ViewMoodModal";

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const openModal = (type, data = null, onConfirm = null) =>
    setModal({ type, data, onConfirm });

  const closeModal = () => setModal(null);

  const renderModal = () => {
    if (!modal) return null;

    switch (modal.type) {
      case "add":
      case "edit":
        return (
          <MoodFormModal
            mood={modal.data}
            onClose={closeModal}
            onSaved={async (newMood) => {
              if (modal.onConfirm) await modal.onConfirm(newMood);
              closeModal();
            }}
          />
        );
      case "delete":
        return (
          <DeleteMoodModal
            moodId={modal.data}
            onCancel={closeModal}
            onConfirm={async () => {
              if (modal.onConfirm) await modal.onConfirm();
              closeModal();
            }}
          />
        );
      case "view":
        return (
          <ViewMoodModal
            mood={modal.data}
            onClose={closeModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
