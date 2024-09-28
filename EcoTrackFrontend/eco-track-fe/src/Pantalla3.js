import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClipboardList, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import MenuDesplegable from './MenuDesplegable'; // Importa el componente del menú

const WelcomeScreen = () => {
  const navigate = useNavigate(); // Hook para redirigir

  return (
    <div className="container">
      {/* Sección del título */}
      <div className="header">
        <h1 className="title">Bienvenido</h1>
      </div>

      {/* Imagen de usuario */}
      <div className="image-container">
        <img
          src="ProgramacionII/EcoTrackFrontend/eco-track-fe/src/pantalla1.PNG"
          alt="Usuario"
          className="logo"
        />
      </div>

      {/* Texto de bienvenida */}
      <div className="welcome-section">
        <h2>Usuario</h2>
        <p>Nos alegra tenerte aquí</p>
      </div>

      {/* Botón de comenzar */}
      <div className="button-container">
        <button
          className="sign-in-button"
          onClick={() => navigate('/Pantalla6')} // Redirige a Pantalla6
        >
          Comencemos
        </button>
      </div>

      {/* Barra inferior con íconos */}
      <div className="bottom-nav">
        <div className="nav-icon">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>Agenda</span>
        </div>
        <div className="nav-icon">
          <FontAwesomeIcon icon={faClipboardList} />
          <span>Tasks</span>
        </div>

        {/* Botón central que despliega el menú */}
        <MenuDesplegable /> {/* Aquí se agrega el menú desplegable */}

        <div className="nav-icon">
          <FontAwesomeIcon icon={faBell} />
          <span>Notification</span>
        </div>
        <div className="nav-icon">
          <FontAwesomeIcon icon={faSearch} />
          <span>Search</span>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
