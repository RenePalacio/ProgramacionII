import React, { useEffect } from 'react';  // Agregué useEffect para manipular el estilo del body
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import './styles.css';

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Montserrat:wght@400;600&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

function App() {
  useEffect(() => {
    // Agregar la clase 'estilo1' al body cuando se renderiza esta página
    document.body.classList.add('estilo1');

    // Eliminar la clase 'estilo1' al desmontar el componente
    return () => {
      document.body.classList.remove('estilo1');
    };
  }, []);

  return (
    <div className="login-container">
      <div className="header">
        <img 
          src="https://i.ibb.co/kK9WwPt/Post-instagram-quote-frase-removebg-preview.png" 
          alt="Logo"
          className="logo"
        />
        
        <h1 className="title">Iniciar Sesión</h1>
      </div>

      <form className="login-form">
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
