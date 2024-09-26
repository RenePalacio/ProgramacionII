import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Home() {
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = () => {
    navigate('/dashboard'); // Redirige al dashboard
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">ECO TRACK</h1>
      </header>

      <div className="image-container">
        <img 
          src="/Imagen de WhatsApp 2024-09-15 a las 22.10.41_9a257935.jpg" // Ruta de tu imagen
          alt="Eco Track logo"
          className="logo"
        />
      </div>

      <div className="welcome-section">
        <h2>Bienvenido</h2>
        <p>Hola que gusto tenerte por aquí. Esta es tu app favorita para ser más amigable con el medio ambiente.</p>
      </div>

      <div className="button-container">
        <button className="sign-in-button" onClick={handleLogin}>Inicia Sesión</button>
      </div>

      <div className="sign-up">
        <p>No tienes cuenta? <a href="/sign-up">Regístrate aquí</a></p>
      </div>
    </div>
  );
}

export default Home;

