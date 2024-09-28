import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBriefcase, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import './styles.css'; 
import MenuDesplegable from './MenuDesplegable'; // Importa el componente del menú

const EditarActividad = () => {
  const location = useLocation(); // Obtener el estado pasado
  const navigate = useNavigate(); // Crear una instancia del hook useNavigate
  const { activity } = location.state || { activity: '' }; // Extrae la actividad del estado

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Guardando cambios...");
    // agregar la lógica para guardar los cambios.
  };

  const handleBack = () => {
    navigate(-1); // página anterior
  };

  return (
    <div className="EditarActividad">
      <header>
        <button onClick={handleBack}>Atrás</button> {/* Botón atrás */}
        <h4>Editar una Actividad: {activity}</h4> {/* Muestra la actividad que se está editando */}
      </header>

      <section>
        <h4>Detalles de la Actividad</h4>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" placeholder="Nombre" required /><br /><br />

          <label htmlFor="fecha">Fecha:</label>
          <input type="date" id="fecha" name="fecha" required />

          <label htmlFor="hora">Hora:</label>
          <input type="time" id="hora" name="hora" required /><br /><br />

          <label htmlFor="ubicacion">Ubicación:</label>
          <input type="text" id="ubicacion" name="ubicacion" placeholder="Ubicación" required />
          <h6>Notas</h6>
          <textarea id="descripcion" name="descripcion" placeholder="Descripción" required></textarea><br /><br />

          <button type="submit">Guardar</button>
        </form>
      </section>
      <br />

      {/* Barra inferior íconos */}
      <div className="bottom-nav">
        <div className="nav-icon">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>Agenda</span>
        </div>
        <div className="nav-icon">
          <FontAwesomeIcon icon={faBriefcase} />
          <span>Tasks</span>
        </div>
        {/*menú desplegable */}
        <MenuDesplegable /> 
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
};

export default EditarActividad;
