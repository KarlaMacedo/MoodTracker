import { useState } from "react";
import api from "../../api/api.js";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLoginSuccess(); // callback para redirigir o cambiar vista
    } catch (err) {
      console.error("Error login:", err);
      setErrorMsg(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">Iniciar sesión</h2>
        {errorMsg && <div className="alert alert-error mb-4">{errorMsg}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
