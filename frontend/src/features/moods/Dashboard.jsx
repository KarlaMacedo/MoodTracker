import { useEffect, useState } from "react";
import api from "../../api/api";
import MoodList from "./MoodList";
import MoodFilters from "./MoodFilters";
import AddMood from "./AddMood";
import Navbar from "../../components/Navbar";
import Alert from "../../components/Alert";

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

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const fetchMoods = async () => {
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
  };

  useEffect(() => {
    fetchMoods();
  }, [filters, pagination.currentPage]);

  const handleMoodAdded = () => {
    showAlert("Mood creado exitosamente");
    fetchMoods();
  };

  const handleMoodEdited = async (mood) => {
    const newText = prompt("Edita el texto del mood:", mood.text);
    const newTag = prompt("Edita la categoría:", mood.tag || "");
    if (newText && newTag) {
      try {
        await api.put(`/mood/${mood._id}`, { text: newText, tag: newTag });
        showAlert("Mood editado correctamente");
        fetchMoods();
      } catch (err) {
        console.error("Error al obtener moods:", err.response?.data || err.message);
        showAlert("Error al editar mood", "error");
      }
    }
  };

  const handleMoodDeleted = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este mood?")) return;
    try {
      await api.delete(`/mood/${id}`);
      showAlert("Mood eliminado correctamente", "warning");
      fetchMoods();
    } catch (err) {
      console.error("Error al obtener moods:", err.response?.data || err.message);
      showAlert("Error al eliminar mood", "error");
    }
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
          <AddMood onMoodAdded={handleMoodAdded} />

          <h3 className="text-xl font-semibold mt-8 mb-2">Filtros</h3>
          <MoodFilters onFilter={handleFilter} />

          <h3 className="text-xl font-semibold mt-8 mb-2">Tus moods</h3>
          <MoodList
            moods={moods}
            onEdit={handleMoodEdited}
            onDelete={handleMoodDeleted}
          />

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
