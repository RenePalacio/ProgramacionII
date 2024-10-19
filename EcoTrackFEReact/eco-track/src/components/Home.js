import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Home = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/actividades');
                setActivities(response.data);
            } catch (error) {
                console.error('Error al obtener actividades', error);
            }
        };

        fetchActivities();
    }, []);

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
            <div className="welcome-section">
                <div className="welcome-icon">
                    <img src="/path/to/mascota.png" alt="Mascota" />
                </div>
                <div className="welcome-text">
                    <h2>Buenas Tardes, Usuario</h2>
                    <p>No te olvides de llevar tu paraguas hoy.</p>
                </div>
            </div>

            <div className="add-task-section">
                <button
                    className="add-task-btn"
                    onClick={() => {
                        navigate('/crearAct');
                    }}
                >
                    Crea una Nueva Actividad
                </button>
            </div>

            <div className="activities-section">
                <h3>SUS ACTIVIDADES</h3>
                <div className="activities-list">
                    {activities.length > 0 ? (
                        activities.map((task) => (
                            <div className="activity-item" key={task.id} onClick={() => openPopup(task)}>
                                <p style={{ background: task.color }}>{task.nombre}</p>
                                <span className="arrow">→</span>
                            </div>
                        ))
                    ) : (
                        <p>No hay actividades disponibles.</p>
                    )}
                </div>
            </div>

            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <h4>{selectedTask.nombre}</h4>
                        <p>{selectedTask.descripcion}</p>
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
