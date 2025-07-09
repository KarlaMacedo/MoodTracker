// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-200 px-4 flex flex-col sm:flex-row">
      <div className="flex justify-start w-full flex-col sm:flex-row">
        <Link to="/dashboard" className="btn btn-ghost text-primary">
          ⭐ MoodTracker
        </Link>
        {location.pathname === "/stats" && (
          <Link to="/dashboard" className="btn btn-ghost text-secondary">🏠 Inicio</Link>
        )}
        {location.pathname === "/dashboard" && (
          <Link to="/stats" className="btn btn-ghost text-secondary">📊 Estadística</Link>
        )}
      </div>
      <div >
        <button onClick={handleLogout} className="btn btn-sm btn-error sm:me-2!">Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Navbar;
