import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css'; 

const Home = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [activities, setActivities] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false); // Para el Success Alert
    const [alertMessage, setAlertMessage] = useState('');
    const [greeting, setGreeting] = useState('');
    const [advice, setAdvice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const setGreetingMessage = () => {
            const currentHour = new Date().getHours();
            if (currentHour < 12) {
                setGreeting('¡Buenos Días, Usuario!');
                setAdvice('No te olvides de desayunar alimentos nutritivos.');
            } else if (currentHour < 18) {
                setGreeting('¡Buenas Tardes, Usuario!');
                setAdvice('Recuerda tomar descansos si te sientes estresado.');
            } else {
                setGreeting('¡Buenas Noches, Usuario!');
                setAdvice('Recuerda que debes descansar apropiadamente para amanecer con energías.');
            }
        };

        setGreetingMessage();

        const fetchActivities = async () => {
            const idUsuario = localStorage.getItem('idUsuario') || '1';
            try {
                const response = await axios.get(`http://localhost:5000/api/actividad/${idUsuario}`);
                console.log("Actividades obtenidas:", response.data);
                setActivities(response.data);
            } catch (error) {
                console.error('Error al obtener actividades', error);
            }
        };

        fetchActivities();
    }, []);

    const openPopup = (task) => {
        console.log("Datos de la actividad seleccionada:", task);
        setSelectedTask({
            idActividad: task.idActividad,
            idTipoActividad: task.idTipoActividad || '',
            ubicacion: task.ubicacion || '', 
            fecha: task.fecha ? task.fecha.split('T')[0] : '',
            duracion: task.duracion || '',
            hora: task.hora ? task.hora.split(':')[0] + ':' + task.hora.split(':')[1] : '',
            notas: task.notas || '',
            color: localStorage.getItem(`actividadColor_${task.idActividad}`) || '#ffffff',
        });
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedTask(null);
    };

    const handleEdit = () => {
        navigate(`/editarAct/${selectedTask.idActividad}`);
        closePopup();
    };

    const handleDeleteConfirmation = () => {
        setAlertMessage('¿Estás seguro de que deseas eliminar esta actividad?');
        setShowAlert(true);
    };

    const handleDelete = async () => {
        if (!selectedTask) return;

        try {
            await axios.delete(`http://localhost:5000/api/Actividad/actividad/${selectedTask.idActividad}`);
            setActivities((prevActivities) => 
                prevActivities.filter(task => task.idActividad !== selectedTask.idActividad)
            );
            setShowAlert(false);
            setShowSuccess(true); // Mostrar el Success Alert
            closePopup();
        } catch (error) {
            console.error('Error al eliminar la actividad', error);
            setShowAlert(false);
            alert('Error al eliminar la actividad.');
        }
    };

    const CustomAlert = ({ message, onConfirm, onCancel, color }) => (
        <div className="custom-alert-overlay" onClick={onCancel}>
            <div className="custom-alert-content" style={{ background: color }} onClick={(e) => e.stopPropagation()}>
                <h4>¡Atención!</h4>
                <p>{message}</p>
                <button className="confirm-btn" onClick={onConfirm}>Aceptar</button>
                <button className="cancel-btn" onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    );

    const SuccessAlert = ({ message, onClose }) => (
        <div className="success-alert-overlay" onClick={onClose}>
            <div className="success-alert-content" onClick={(e) => e.stopPropagation()}>
                <h4>{message}</h4>
                <button className="close-success-btn" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );

    return (
        <div className="home-page">
            <style>
                {`
                .cloud3 {
                    display: none;
                }
                @media (max-width: 600px) {
                    .cloud1 {
                        position: absolute;
                        top: 10%;
                        left: 5%;
                        z-index: 1;
                        opacity: 0.6;
                    }

                    .cloud2 {
                        display: none;
                    }

                    .cloud3 {
                        position: absolute;
                        top: 50%;
                        left: -40%;
                        z-index: 1;
                        opacity: 0.4;
                    }

                    .cloud4 {
                        position: absolute;
                        top: 70%;
                        left: 60%;
                        z-index: 1;
                        opacity: 0.3;
                    }

                    .cloud5, .cloud6, .cloud7, .cloud8 {
                        display: none;
                    }
                }
                `}
            </style>

            <div className="welcome-section">
                <div className="welcome-icon">
                    <img src="https://i.ibb.co/8PRP6Qd/dfca5d490a29f43b59c25d1b1acc94ee-removebg-preview.png" alt="Mascota" />
                </div>
                <div className="welcome-text">
                    <h2>{greeting}</h2>
                    <p>{advice}</p>
                </div>
            </div>

            <div className="add-task-section">
                <button className="add-task-btn" onClick={() => navigate('/crearAct')}>
                    Crea una Nueva Actividad
                </button>
            </div>

            <div className="activities-section">
                <h3>SUS ACTIVIDADES</h3>
                <div className="activities-list">
                    {activities.length > 0 ? (
                        activities.map((task) => {
                            const color = localStorage.getItem(`actividadColor_${task.idActividad}`) || '#ffffff';
                            return (
                                <div 
                                    className="activity-item" 
                                    key={task.idActividad} 
                                    onClick={() => openPopup(task)} 
                                    style={{ background: color }}
                                >
                                    <p>
                                        {task.tipoActividad || 'Nombre no disponible'} - Hora: {task.hora}
                                    </p>
                                    <span className="arrow">→</span>
                                </div>
                            );
                        })
                    ) : (
                        <p>No hay actividades disponibles.</p>
                    )}
                </div>
                <footer className="footer">
        <span>© SummerTime Coders</span>
      </footer>
            </div>

            {showPopup && selectedTask && (
    <div className="popup-overlay" onClick={closePopup}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()} style={{ background: selectedTask.color }}>
            <button className="close-btn" aria-label="Cerrar" onClick={closePopup}>
                x
            </button>
            <h4>{selectedTask.idTipoActividad || 'Nombre no disponible'}</h4>

            <div className="popup-table">
                <div className="popup-row">
                    <div className="popup-cell">Hora:</div>
                    <div className="popup-cell">{selectedTask.hora || 'No disponible'}</div>
                </div>
                <div className="popup-row">
                    <div className="popup-cell">Ubicación:</div>
                    <div className="popup-cell">{selectedTask.ubicacion || 'No disponible'}</div>
                </div>
                <div className="popup-row">
                    <div className="popup-cell">Fecha:</div>
                    <div className="popup-cell">{selectedTask.fecha || 'No disponible'}</div>
                </div>
                <div className="popup-row">
                    <div className="popup-cell">Duración:</div>
                    <div className="popup-cell">{selectedTask.duracion || 'No disponible'} minutos</div>
                </div>
                <div className="popup-row">
                    <div className="popup-cell">Notas:</div>
                    <div className="popup-cell">{selectedTask.notas || 'No hay notas'}</div>
                </div>
            </div>

            <h5>Datos del Clima</h5>
            <div className="popup-table">
                <div className="popup-row">
                    <div className="popup-cell">Temperatura:</div>
                    <div className="popup-cell">{selectedTask.temperatura ? `${selectedTask.temperatura} °C` : 'No disponible'}</div>
                </div>
                <div className="popup-row">
                    <div className="popup-cell">Rayos UV:</div>
                    <div className="popup-cell">{selectedTask.rayosUV || 'No disponible'}</div>
                </div>
                <div className="popup-row">
                    <div className="popup-cell">Probabilidad de Lluvia:</div>
                    <div className="popup-cell">{selectedTask.probabilidadLluvia || 'No disponible'}</div>
                </div>
                <div className="popup-row">
                    <div className="popup-cell">Calidad del Aire:</div>
                    <div className="popup-cell">{selectedTask.calidadAire || 'No disponible'}</div>
                </div>
                <div className="popup-row">
                    <div className="popup-cell">Polvo:</div>
                    <div className="popup-cell">{selectedTask.polvo || 'No disponible'}</div>
                </div>
            </div>

            <div className="edit-delete-buttons">
                <button className="edit-task-btn" onClick={handleEdit}>Editar</button>
                <button className="delete-task-btn" onClick={handleDeleteConfirmation}>Eliminar</button>
            </div>
        </div>
    </div>
    
)}


            {showAlert && selectedTask && (
                <CustomAlert
                    message={alertMessage}
                    onConfirm={handleDelete}
                    onCancel={() => setShowAlert(false)}
                    color={selectedTask.color}
                />
            )}

            {showSuccess && (
                <SuccessAlert
                    message="Actividad eliminada exitosamente."
                    onClose={() => setShowSuccess(false)}
                />
            )}

            {/* Nubes */}
            <div className="cloud cloud1"></div>
            <div className="cloud cloud2"></div>
            <div className="cloud cloud3"></div>
            <div className="cloud cloud4"></div>
            <div className="cloud cloud5"></div>
            <div className="cloud cloud6"></div>
            <div className="cloud cloud7"></div>
            <div className="cloud cloud8"></div>
        </div>
        
    );
    

};

export default Home;
