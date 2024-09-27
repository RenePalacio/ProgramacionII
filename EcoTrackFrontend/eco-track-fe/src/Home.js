import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = () => {
    navigate('/dashboard'); // Redirige al dashboard
  };

  const handleRegister = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1 className="welcome-title">¡BIENVENIDO!</h1>
        <p className="welcome-message">Hola, qué gusto tenerte por aquí en EcoTrack. Da el salto a tener un horario interactivo y amigable </p>
      </div>

      <div className="button-container">
        <button className="sign-in-button" onClick={handleLogin}>Inicia Sesión</button>
        <button className="register-button" onClick={handleRegister}>Regístrate aquí</button>
      </div>

      {/* Elementos decorativos */}
      <div className="ground"></div>
      <div className="ocean"></div>
    </div>
  );
}

export default Home;
