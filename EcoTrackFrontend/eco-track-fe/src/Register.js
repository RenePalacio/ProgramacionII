import React from 'react';
import './styles.css';

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Montserrat:wght@400;600&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

function App() {
  return (
    <div className="login-container">
      <div className="header">
        <img 
          src="https://i.ibb.co/mGbtJxR/ECOTRACK.png" 
          alt="Logo"
          className="logo"
        />
        
        <h1 className="title">Registrar Cuenta</h1>
      </div>

      <form className="login-form">
        <div className="input-container">
          <input type="text" placeholder="Nombre Completo" className="input-field" required />
        </div>
        <div className="input-container">
          <input type="email" placeholder="Correo Electrónico" className="input-field" required />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Contraseña" className="input-field" required />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Confirmar Contraseña" className="input-field" required />
        </div>
        <button 
            type="submit" 
            className="login-button" 
            style={{ width: '95%' }}
          >
            Registrar
          </button>
      </form>

      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="cloud cloud4"></div>
    </div>
  );
}

export default App;
