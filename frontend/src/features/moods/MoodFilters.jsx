import { useState } from "react";

const MoodFilters = ({ onFilter }) => {
  const [tag, setTag] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate && endDate < startDate) {
      alert("La fecha de fin no puede ser anterior a la fecha de inicio.");
      return;
    }
    onFilter({ tag, startDate, endDate });
  };

  const clearFilters = () => {
    setTag("");
    setStartDate("");
    setEndDate("");
    onFilter({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col lg:flex-row gap-5 bg-base-200 p-4 rounded-lg shadow mt-4"
    >
      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="select select-bordered w-full lg:w-auto"
      >
        <option value="">Todos los tags</option>
        <option value="Trabajo">Trabajo</option>
        <option value="Familia">Familia</option>
        <option value="Salud">Salud</option>
        <option value="Otros">Otros</option>
        <option value="Amigos">Amigos</option>
        <option value="Amor">Amor</option>
        <option value="Finanzas">Finanzas</option>
        <option value="Estudio">Estudio</option>
        <option value="Sin clasificar">Sin clasificar</option>
      </select>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="input input-bordered w-full lg:w-auto"
        max={today}
        // Evita seleccionar fin menor a inicio
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="input input-bordered w-full lg:w-auto"
        min={startDate || undefined}
        max={today}
      />

      <button type="submit" className="btn btn-primary w-full lg:w-auto">
        Filtrar Registros
      </button>
      <button
        type="button"
        onClick={clearFilters}
        className="btn btn-outline w-full lg:w-auto"
      >
        Limpiar Filtros
      </button>
    </form>
  );
};

export default MoodFilters;
