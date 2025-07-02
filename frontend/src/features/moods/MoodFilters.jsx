// src/features/dashboard/MoodFilters.jsx
import { useState } from "react";

const MoodFilters = ({ onFilter }) => {
  const [tag, setTag] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ tag, startDate, endDate });
  };

  const clearFilters = () => {
    setTag("");
    setStartDate("");
    setEndDate("");
    onFilter({});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 bg-base-200 p-4 rounded-lg shadow mt-4">
      <select value={tag} onChange={(e) => setTag(e.target.value)} className="select select-bordered w-full md:w-auto">
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

      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input input-bordered w-full md:w-auto" />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input input-bordered w-full md:w-auto" />

      <button type="submit" className="btn btn-primary w-full md:w-auto">Filtrar</button>
      <button type="button" onClick={clearFilters} className="btn btn-ghost w-full md:w-auto">Limpiar</button>
    </form>
  );
};

export default MoodFilters;
