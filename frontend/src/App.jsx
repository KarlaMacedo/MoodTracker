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

        const moodNew = await api.post("/mood", {
          text: "Estoy triste",
          tag: "Familia"
        });
        console.log("Mood creado:", moodNew.data);

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
    </>
  )
}

export default App
