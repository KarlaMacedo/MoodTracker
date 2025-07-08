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
          limit: 10,
        },
      });

      setMoods(data.moods);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.pagination.totalPages,
      }));
    } catch (err) {
      console.error("Error al obtener registros emocionales:", err.response?.data || err.message);
    }
  }, [filters, pagination.currentPage]);

  useEffect(() => {
    fetchMoods();
  }, [fetchMoods]);

  const handleAddMood = () => {
    openModal("add", { text: "", tag: "Sin clasificar" }, async (newMood) => {
      await api.post("/mood", newMood);
      fetchMoods();
      showAlert("Registro emocional creado exitosamente");
    });
  };

  const handleMoodEdited = (mood) => {
    openModal("edit", mood, async (updatedMood) => {
      await api.put(`/mood/${updatedMood._id}`, updatedMood);
      fetchMoods();
      showAlert("Registro emocional editado correctamente");
    });
  };

  const handleMoodDeleted = (id) => {
    openModal("delete", id, async () => {
      await api.delete(`/mood/${id}`);
      fetchMoods();
      showAlert("Registro emocional eliminado correctamente", "warning");
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
      <div className="p-6 mx-auto">
        <div class="flex md:flex-row max-sm:flex-col items-center max-sm:gap-4">
          <div className="basis-5/6">
            <p className="text-2xl font-bold text-center">Tus registros emocionales <span className="text-yellow-500 text-2xl">⭐</span></p>
          </div>
          <div className="basis-1/6 ml-5 flex justify-end max-sm:justify-center">
            <button className="btn btn-primary" onClick={handleAddMood}>
              Agregar emoción
            </button>
          </div>
        </div>
        <div className="mx-auto mt-8 px-4">
          


          <MoodFilters onFilter={handleFilter} />

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
