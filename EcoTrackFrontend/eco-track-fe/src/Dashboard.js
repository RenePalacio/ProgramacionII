import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa ambos para la navegación
import './styles.css';

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Montserrat:wght@400;600&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

function App() {
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // Lógica de autenticación
    navigate('/Pantalla3');
  };

  return (
    <div className="login-container">
      <div className="header">
        <img 
          src="https://i.ibb.co/mGbtJxR/ECOTRACK.png" 
          alt="Logo"
          className="logo"
        />
        <h1 className="title">Iniciar Sesión</h1>
      </div>

      {/* Formulario de Inicio de Sesión */}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="email" placeholder="Correo Electrónico" className="input-field" required />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Contraseña" className="input-field" required />
        </div>
        <button type="submit" className="login-button">Iniciar Sesión</button>
      </form>

      <div className="register-prompt">
        <p>No tienes cuenta? <Link to="/register" className="register-link">Regístrate</Link></p>
      </div>

      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="cloud cloud4"></div>
    </div>
  );
}

export default App;
