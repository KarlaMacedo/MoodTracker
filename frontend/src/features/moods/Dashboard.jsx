import { useEffect, useState, useCallback } from "react";
import api from "../../api/api";
import MoodList from "./MoodList";
import MoodFilters from "./MoodFilters";
import Navbar from "../../components/Navbar";
import Alert from "../../components/Alert";
import { useModal } from "../../context/ModalContext";

const Dashboard = () => {
  const [alert, setAlert] = useState(null);
  const [moods, setMoods] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [filters, setFilters] = useState({
    tag: "",
    startDate: "",
    endDate: "",
  });

  const { openModal } = useModal();

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const fetchMoods = useCallback(async () => {
    try {
      const { data } = await api.get("/mood", {
        params: {
          tag: filters.tag,
          startDate: filters.startDate,
          endDate: filters.endDate,
          page: pagination.currentPage,
          limit: 5,
        },
      });

      setMoods(data.moods);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.pagination.totalPages,
      }));
    } catch (err) {
      console.error("Error al obtener moods:", err.response?.data || err.message);
    }
  }, [filters, pagination.currentPage]);

  useEffect(() => {
    fetchMoods();
  }, [fetchMoods]);

  const handleAddMood = () => {
    openModal("add", { text: "", tag: "Sin clasificar" }, async (newMood) => {
      await api.post("/mood", newMood);
      fetchMoods();
      showAlert("Mood creado exitosamente");
    });
  };

  const handleMoodEdited = (mood) => {
    openModal("edit", mood, async (updatedMood) => {
      await api.put(`/mood/${updatedMood._id}`, updatedMood);
      fetchMoods();
      showAlert("Mood editado correctamente");
    });
  };

  const handleMoodDeleted = (id) => {
    openModal("delete", id, async () => {
      await api.delete(`/mood/${id}`);
      fetchMoods();
      showAlert("Mood eliminado correctamente", "warning");
    });
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  return (
    <>
      {alert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
        </div>
      )}

      <Navbar />
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Mis registros emocionales</h1>

        <div className="max-w-xl mx-auto mt-8 px-4">
          <h2 className="text-2xl font-bold mb-4">Registrar nuevo mood</h2>
          <button className="btn btn-primary mb-4" onClick={handleAddMood}>
            Agregar emoción
          </button>

          <h3 className="text-xl font-semibold mt-8 mb-2">Filtros</h3>
          <MoodFilters onFilter={handleFilter} />

          <h3 className="text-xl font-semibold mt-8 mb-2">Tus moods</h3>
          <MoodList moods={moods} onEdit={handleMoodEdited} onDelete={handleMoodDeleted} />

          <div className="mt-4 flex justify-between">
            <button
              onClick={() =>
                setPagination((p) => ({ ...p, currentPage: Math.max(1, p.currentPage - 1) }))
              }
              disabled={pagination.currentPage === 1}
              className="btn btn-sm"
            >
              Anterior
            </button>
            <button
              onClick={() =>
                setPagination((p) => ({ ...p, currentPage: p.currentPage + 1 }))
              }
              disabled={pagination.currentPage >= pagination.totalPages}
              className="btn btn-sm"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
