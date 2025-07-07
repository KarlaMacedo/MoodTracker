// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-200 px-4">
      <div className="flex-1">
        <Link to="/dashboard" className="btn btn-ghost text-xl text-primary">
          ⭐ MoodTracker
        </Link>
      </div>
      <div>
        <button onClick={handleLogout} className="btn btn-sm btn-error">Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Navbar;
