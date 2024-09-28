import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClipboardList, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import './styles.css'; 
import MenuDesplegable from './MenuDesplegable'; // Importa el componente del menú

const WeatherApp = () => {
  const navigate = useNavigate(); // useNavigate

  // Función para regresar a la pantalla anterior
  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="weather-app">
      <header className="header">
        <button className="back-button" onClick={handleBack}>Atrás</button>
        <h3>Hola, Hoy es un bello Día para salir</h3>
        <h3>San Salvador</h3>
      </header>
      
      <div className="weather-info">
        <div>
          <h4>Soyapango</h4>
          <p>6°C</p>
        </div>
        <br />
        <h4>Around the world</h4>
        <div>
          <h5>United States</h5>
          <p>California</p>
          <p>6°C</p>
        </div>
        <br />
        <div>
          <h5>China</h5>
          <p>Beijing</p>
          <p>5°C</p>
        </div>
        <br />
        <div>
          <h5>Russia</h5>
          <p>Moscow</p>
          <p>-4°C</p>
        </div>
      </div>

      <footer>
        <nav className="bottom-nav">
          <div className="nav-icon">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Agenda</span>
          </div>
          <div className="nav-icon">
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Tasks</span>
          </div>

          {/* Menú desplegable */}
          <MenuDesplegable />

          <div className="nav-icon">
            <FontAwesomeIcon icon={faBell} />
            <span>Notification</span>
          </div>
          <div className="nav-icon">
            <FontAwesomeIcon icon={faSearch} />
            <span>Search</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default WeatherApp;
