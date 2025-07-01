import './App.css'
import { useState, useEffect } from 'react';
import Login from './features/auth/Login.jsx';
import Register from './features/auth/Register.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <h1 className="text-3xl font-bold text-primary">Bienvenida al Dashboard 🎉</h1>
      </div>
    );
  }

  return (
    <>
      {showRegister ? (
        <>
          <Register onRegisterSuccess={() => setIsAuthenticated(true)} />
          <p className="text-center mt-4">
            ¿Ya tienes cuenta?{" "}
            <button
              className="btn btn-link btn-sm"
              onClick={() => setShowRegister(false)}
            >
              Inicia sesión
            </button>
          </p>
        </>
      ) : (
        <>
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
          <p className="text-center mt-4">
            ¿No tienes cuenta?{" "}
            <button
              className="btn btn-link btn-sm"
              onClick={() => setShowRegister(true)}
            >
              Regístrate
            </button>
          </p>
        </>
      )}
    </>
  );
}

export default App
