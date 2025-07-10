// src/context/ModalProvider.jsx
import { useState } from "react";
import { ModalContext } from "./ModalContext";
import DeleteMoodModal from "../components/modals/DeleteMoodModal";
import MoodFormModal from "../components/modals/MoodFormModal";
import EmotionsWheelModal from "../components/modals/EmotionsWheelModal";

const ModalProvider = ({ children }) => {
  const [modalStack, setModalStack] = useState([]);

  const openModal = (type, data = null, onConfirm = null) => {
    setModalStack((prev) => [...prev, { type, data, onConfirm }]);
  };

  const closeModal = () => {
    setModalStack((prev) => prev.slice(0, -1));
  };

  const renderModal = () => {
    if (!modalStack.length) return null;
    const modal = modalStack[modalStack.length - 1];

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
            openSecondary={(secondaryType) => openModal(secondaryType, modal)}
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
      case "emotion-wheel":
        return (
          <EmotionsWheelModal onClose={closeModal} />
        );
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
