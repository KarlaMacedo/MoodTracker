import { useEffect, useState } from "react";

const StatsFilters = ({ onFilter }) => {
    const [period, setPeriod] = useState("all");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showDatesFilter, setShowDatesFilter] = useState(false);

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (period === "custom") setShowDatesFilter(true);
        else setShowDatesFilter(false);
    }, [period]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (period === "custom" && (!startDate || !endDate)) return;
        if (startDate && endDate && endDate < startDate) return;
        if (period !== "custom") onFilter({ period, category }) 
            else onFilter({ startDate, endDate, category });    
    };

    const handleClear = () => {
        setPeriod("all");
        setCategory("");
        setStartDate("");
        setEndDate("");
        onFilter({ period: "all", category: "", startDate: "", endDate: "" });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center gap-4 bg-base-200 p-4 rounded-lg shadow mb-8"
        >
            <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="select select-bordered w-full md:w-auto"
            >
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
                <option value="year">Este año</option>
                <option value="custom">Personalizado</option>
                <option value="all">Todo el tiempo</option>
            </select>

            {showDatesFilter && (
                <>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="input input-bordered w-full md:w-auto"
                        max={today}
                    />

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="input input-bordered w-full md:w-auto"
                        min={startDate || undefined}
                        max={today}
                    />
                </>
            )}


            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered w-full md:w-auto"
            >
                <option value="">Todas las categorías</option>
                <option value="Trabajo💼">Trabajo💼</option>
                <option value="Familia🧑‍🧑‍🧒">Familia🧑‍🧑‍🧒</option>
                <option value="Salud🩺">Salud🩺</option>
                <option value="Amigos🫂">Amigos🫂</option>
                <option value="Amor💌">Amor💌</option>
                <option value="Finanzas💰">Finanzas💰</option>
                <option value="Estudio📝">Estudio📝</option>
                <option value="Otros">Otros</option>
                <option value="Sin clasificar">Sin clasificar</option>
            </select>



            <button type="submit" className="btn btn-primary w-full md:w-auto">
                Aplicar filtros
            </button>
            <button
                type="button"
                onClick={handleClear}
                className="btn btn-outline w-full md:w-auto"
            >
                Limpiar filtros
            </button>
        </form>
    );
};

export default StatsFilters;
