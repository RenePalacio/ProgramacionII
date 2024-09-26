import React from 'react';
import './styles.css';

function App() {
  return (
    <div className="login-container">
      {/* Logo y Título */}
      <div className="header">
        <img 
          src="/Imagen de WhatsApp 2024-09-15 a las 22.10.41_9a257935.jpg"  // Cambiar por la URL de la imagen del reloj
          alt="Logo"
          className="logo"
        />
        <h1 className="title">Iniciar Sesión</h1>
      </div>

      {/* Formulario de Inicio de Sesión */}
      <form className="login-form">
        <input type="email" placeholder="Correo Electronico" className="input-field" required />
        <input type="password" placeholder="Contraseña" className="input-field" required />
        <button type="submit" className="login-button">Iniciar Sesion</button>
      </form>

      
        
    </div>
  );
}

export default App;
