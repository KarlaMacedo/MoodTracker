import { useState } from "react";
import api from "../../api/api";

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
        <h2 className="text-2xl font-bold mb-4 text-primary text-center">Registro</h2>
        {errorMsg && <div className="alert alert-error mb-4">{errorMsg}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            className="input input-bordered w-full"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
            required
          />
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
          <button type="submit" className={`btn btn-primary w-full ${loading ? "loading" : ""}`} disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
