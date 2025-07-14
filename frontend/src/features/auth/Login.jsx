import { useState } from "react";
import api from "../../api/api.js";
import { Link } from "react-router-dom";

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
      onLoginSuccess();
    } catch (err) {
      console.error("Error login:", err);
      setErrorMsg(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <p className="text-5xl font-bold mb-20! text-center text-primary">
        ⭐ MoodTracker
      </p>
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-xl mb-20">

        {errorMsg && <div className="alert alert-error mb-4">{errorMsg}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4  mb-4">
          <p className="text-2xl font-bold mb-4 text-center text-primary">Iniciar sesión</p>
          <p className="text-xl font-bold mb-4">
            Correo:
          </p>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-xl font-bold mb-4">
            Contraseña:
          </p>
          <input
            type="password"
            placeholder="Contraseña"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary btn-lg w-full mt-8!">
            Iniciar sesión
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          ¿No tienes cuenta? <Link to="/register" className="text-primary hover:underline font-bold">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
