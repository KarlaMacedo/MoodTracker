import './App.css'
import { useState, useEffect } from 'react';
import Login from './features/auth/Login.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
          <h1 className="text-3xl font-bold text-primary">Bienvenida al Dashboard 🎉</h1>
        </div>
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

export default App
