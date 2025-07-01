import './App.css'
import api from "./api.js";
import { useEffect, useRef } from 'react';

function App() {
  const ranEffect = useRef(false);

  useEffect(() => {
    if (ranEffect.current) return;
    ranEffect.current = true;
    const doLogin = async () => {
      try {
        const res = await api.post("/auth/login", {
          email: "cei@correo.com",
          password: "password"
        });
        localStorage.setItem("token", res.data.token);
        console.log("Login exitoso");

        // const moodNew = await api.post("/mood", {
        //   text: "Estoy triste",
        //   tag: "Familia"
        // });
        // console.log("Mood creado:", moodNew.data);

        const moodsRes = await api.get("/mood");
        console.log("Moods:", moodsRes.data);
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
      }
    };

    doLogin();
  }, []);

  return (
    <>
      <div>
        <h1>Mood Tracker</h1>
        <p>Abre la consola para ver login y los registros emocionales (si hay token)</p>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
        <div className="p-8 bg-white shadow-xl rounded-xl">
          <h1 className="text-3xl font-bold text-center text-primary mb-4">Mood Tracker</h1>
          <button className="btn btn-primary w-full">¡Botón con DaisyUI!</button>
        </div>
      </div>
      <div className="bg-red-500 text-white p-10 text-4xl font-bold text-center">
        ¿Funciona Tailwind?
      </div>
      <div className="p-10 space-y-6">
        <h1 className="text-3xl font-bold text-center text-primary">¿Tailwind funciona?</h1>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Botón Tailwind puro
        </button>

        <button className="btn btn-primary">
          Botón DaisyUI
        </button>
      </div>


    </>
  )
}

export default App
