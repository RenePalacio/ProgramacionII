import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de tener axios instalado
import './styles.css';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activities, setActivities] = useState([]); // Cambiar a un estado vacío
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Aquí debes usar la URL correcta de tu API
        const response = await axios.get('http://localhost:5000/api/actividades'); // Asegúrate de tener la ruta correcta
        setActivities(response.data); // Suponiendo que response.data es un arreglo de actividades
      } catch (error) {
        console.error('Error al obtener actividades', error);
      }
    };

    fetchActivities();
  }, []); // El efecto solo se ejecutará una vez al cargar el componente

  const openPopup = (task) => {
    setSelectedTask(task);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedTask(null);
  };

  return (
    <div className="home-page">
      {/* Sección de bienvenida */}
      <div className="welcome-section">
        <div className="welcome-icon">
          <img src="/path/to/mascota.png" alt="Mascota" />
        </div>
        <div className="welcome-text">
          <h2>Buenas Tardes, Usuario</h2>
          <p>No te olvides de llevar tu paraguas hoy.</p>
        </div>
      </div>

      {/* Botón de agregar tarea */}
      <div className="add-task-section">
        <button
          className="add-task-btn"
          onClick={() => {
            navigate('/crearAct'); // Redirige a la ruta
          }}
        >
          Crea una Nueva Actividad
        </button>
      </div>

      {/* Lista de actividades */}
      <div className="activities-section">
        <h3>SUS ACTIVIDADES</h3>
        <div className="activities-list">
          {activities.length > 0 ? (
            activities.map((task) => (
              <div className="activity-item" key={task.id} onClick={() => openPopup(task)}>
                <p>{task.nombre}</p> {/* Cambia 'nombre' a la propiedad correcta */}
                <span className="arrow">→</span>
              </div>
            ))
          ) : (
            <p>No hay actividades disponibles.</p> // Mensaje si no hay actividades
          )}
        </div>
      </div>

      {/* Popup de resumen de actividad */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h4>{selectedTask.nombre}</h4> {/* Cambia 'nombre' a la propiedad correcta */}
            <p>{selectedTask.descripcion}</p> {/* Cambia 'descripcion' a la propiedad correcta */}
            <button className="close-btn" onClick={closePopup}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
