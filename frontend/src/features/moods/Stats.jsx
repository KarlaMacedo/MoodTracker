import { useEffect, useState } from "react";
import api from "../../api/api";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { subDays, startOfWeek, startOfMonth, startOfYear, formatISO } from "date-fns";
import Navbar from "../../components/Navbar";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, ChartDataLabels, Legend);


const Stats = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("all");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const params = {};
        const now = new Date();

        // Definir fecha de inicio según el periodo seleccionado
        if (period !== "all") {
          let startDate;
          if (period === "today") startDate = formatISO(subDays(now, 0), { representation: 'date' });
          if (period === "week") startDate = formatISO(startOfWeek(now), { representation: 'date' });
          if (period === "month") startDate = formatISO(startOfMonth(now), { representation: 'date' });
          if (period === "year") startDate = formatISO(startOfYear(now), { representation: 'date' });

          params.startDate = startDate;
        }

        if (category) params.category = category;

        const res = await api.get("/mood", { params });
        setData(res.data.moods);
      } catch (err) {
        console.error("Error al obtener moods:", err);
      }
    };
    fetchMoods();
  }, [period, category]);

  // Agrupar por emoción
  const emotionCount = data.reduce((acc, mood) => {
    acc[mood.emotion] = (acc[mood.emotion] || 0) + 1;
    return acc;
  }, {});

  const emotionChart = {
    labels: Object.keys(emotionCount),
    datasets: [
      {
        data: Object.values(emotionCount),
        backgroundColor: [
          "#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA", "#9CA3AF"
        ],
      },
    ],
  };

  return (
    <>
        <Navbar />
        <div className="p-6 w-full mx-auto h-full flex flex-col mb-16!">
            <p className="text-2xl font-bold mb-17! text-center">📊 Estadísticas emocionales</p>

            {/* FILTROS */}
            <div className="flex flex-col md:flex-row gap-4 mb-16 justify-start bg-base-200 p-4 rounded-lg shadow">
                <select className="select select-bordered" value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
                <option value="year">Este año</option>
                <option value="all">Todo el tiempo</option>
                </select>

                <select className="select select-bordered" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Todas las categorías</option>
                <option value="Trabajo💼">Trabajo</option>
                <option value="Familia🧑‍🧑‍🧒">Familia</option>
                <option value="Salud🩺">Salud</option>
                <option value="Amigos🫂">Amigos</option>
                <option value="Amor💌">Amor</option>
                <option value="Finanzas💰">Finanzas</option>
                <option value="Estudio📝">Estudio</option>
                <option value="Otros">Otros</option>
                <option value="Sin clasificar">Sin clasificar</option>
                </select>
                <button
                onClick={() => {
                    setPeriod("all");
                    setCategory("");
                }}
                className="btn btn-outline mt-2"
                >
                    Limpiar filtros
                </button>
            </div>

            {/* GRÁFICAS */}
            <div className="h-full w-full flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
                    <div className="bg-white rounded-xl shadow p-4 h-80">
                        <p className="text-lg font-semibold text-center mb-6!">Emociones predominantes</p>
                        <Bar
                            data={emotionChart}
                            options={{
                            plugins: {
                                legend: { display: false },
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            }}
                        />
                    </div>
                    
                    <div className="bg-white rounded-xl shadow p-4 mb-6">
                        <p className="text-lg font-semibold text-center mb-6!">Porcentaje por emoción</p>
                        <Pie
                            data={emotionChart}
                            options={{
                                plugins: {
                                legend: {
                                    display: true,
                                    position: "top",
                                    labels: {
                                    color: "#444",
                                    boxWidth: 20,
                                    padding: 10
                                    }
                                },
                                datalabels: {
                                    color: "#444",
                                    font: {
                                    weight: "bold",
                                    },
                                    formatter: (value, context) => {
                                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return `${percentage}%`;
                                    },
                                },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Stats;
