import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function App() {
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // Lógica de autenticación si es necesario
    navigate('/Pantalla3');
  };

  return (
    <div className="container">
      {/* Logo y Título */}
      <div className="header">
        <img 
          src="/Imagen de WhatsApp 2024-09-15 a las 22.10.41_9a257935.jpg" // Cambiar por la URL de la imagen del reloj
          alt="Logo"
          className="logo"
        />
        <h1 className="title">Iniciar Sesión</h1>
      </div>

      {/* Formulario de Inicio de Sesión */}
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo Electrónico" className="input-field" required />
        <input type="password" placeholder="Contraseña" className="input-field" required />
        {/* Botón de inicio de sesión con estilo consistente */}
        <button type="submit" className="sign-in-button">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default App;
