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
import StatsFilters from "./StatsFilters";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, ChartDataLabels, Legend);


const Stats = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        period: "all",
        category: "",
        startDate: "",
        endDate: "",
    });


    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const { period, category, startDate, endDate } = filters;
                const params = {};
                const now = new Date();

                if (startDate) params.startDate = startDate;
                if (endDate) params.endDate = endDate;

                if (!startDate && !endDate && period !== "all") {
                    let start;
                    if (period === "today") start = formatISO(subDays(now, 0), { representation: 'date' });
                    if (period === "week") start = formatISO(startOfWeek(now), { representation: 'date' });
                    if (period === "month") start = formatISO(startOfMonth(now), { representation: 'date' });
                    if (period === "year") start = formatISO(startOfYear(now), { representation: 'date' });
                    params.startDate = start;
                }

                if (category) params.category = category;

                const res = await api.get("/mood", { params });
                setData(res.data.moods);
            } catch (err) {
                console.error("Error al obtener moods:", err);
            }
        };

        fetchMoods();
    }, [filters]);


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

                <StatsFilters onFilter={setFilters} />

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
