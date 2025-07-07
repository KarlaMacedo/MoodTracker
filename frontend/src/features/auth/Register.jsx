import { useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

function Register({ onRegisterSuccess }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      onRegisterSuccess();
    } catch (err) {
      console.error("Error en registro:", err);
      setErrorMsg(err.response?.data?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-xl">
        
        {errorMsg && <div className="alert alert-error mb-4">{errorMsg}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4  mb-4">
          <p className="text-2xl font-bold mb-4 text-primary text-center">Registro</p>
          <p className="text-xl font-bold mb-4">
            Nombre:
          </p>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            className="input input-bordered w-full m-8"
            value={form.username}
            onChange={handleChange}
            required
          />
          <p className="text-xl font-bold mb-4">
            Correo:
          </p>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
            required
          />
          <p className="text-xl font-bold mb-4">
            Contraseña:
          </p>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <button type="submit" className={`btn btn-primary btn-lg mt-8! w-full ${loading ? "loading" : ""}`} disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          ¿Ya tienes cuenta? <Link to="/login" className="text-primary hover:underline font-bold">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
