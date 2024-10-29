import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Home = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [activities, setActivities] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [greeting, setGreeting] = useState('');
    const [advice, setAdvice] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [userName, setUserName] = useState('Usuario');
    const [isFlipped, setIsFlipped] = useState(false); // Estado para controlar la rotación de la tarjeta

    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem('idUsuario');

        if (!id) {
            console.error('No se encontró idUsuario. Redirigiendo a inicio de sesión...');
            navigate('/login');
            return;
        }

        const fetchUserName = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/Usuario/${id}`);
                setUserName(response.data.nombre || 'Usuario');
            } catch (error) {
                console.error('Error al obtener el nombre del usuario', error);
                navigate('/login');
            }
        };

        const fetchActivities = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/Actividad/${id}`);
                setActivities(response.data);
            } catch (error) {
                console.error('Error al obtener actividades', error);
            }
        };

        fetchUserName();
        fetchActivities();
    }, [navigate]);

    useEffect(() => {
        if (userName) {
            const currentHour = new Date().getHours();
            if (currentHour < 12) {
                setGreeting(`¡Buenos Días, ${userName}!`);
                setAdvice('No te olvides de desayunar alimentos nutritivos.');
            } else if (currentHour < 18) {
                setGreeting(`¡Buenas Tardes, ${userName}!`);
                setAdvice('Recuerda tomar descansos si te sientes estresado.');
            } else {
                setGreeting(`¡Buenas Noches, ${userName}!`);
                setAdvice('Recuerda que debes descansar apropiadamente para amanecer con energías.');
            }
        }
    }, [userName]);

    const fetchWeatherForSelectedTask = async () => {
        if (selectedTask?.idActividad) {
            const savedLocation = JSON.parse(localStorage.getItem('savedLocation'));

            if (savedLocation) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/DatosClima/${selectedTask.idActividad}`);
                    setWeatherData(response.data);
                    alert('Datos climáticos recuperados de la base de datos.');
                } catch (error) {
                    console.error('Error al obtener datos climáticos de la base de datos:', error);
                    const { lat, lon } = savedLocation;

                    try {
                        const response = await axios.post(`http://localhost:5000/api/DatosClima`, {
                            IdActividad: selectedTask.idActividad,
                            Latitude: lat,
                            Longitude: lon,
                        });
                        setWeatherData(response.data);
                        alert('Datos climáticos obtenidos con éxito.');
                    } catch (error) {
                        console.error('Error al obtener datos climáticos:', error);
                        alert('Error al obtener datos climáticos.');
                    }
                }
            } else {
                alert("Debes guardar una ubicación antes de obtener datos climáticos.");
            }
        } else {
            alert("Debe seleccionar una actividad antes de obtener el clima.");
        }
    };

    const openPopup = (task) => {
        setSelectedTask({
            idActividad: task.idActividad,
            idTipoActividad: task.idTipoActividad || '',
            ubicacion: task.ubicacion || '',
            fecha: task.fecha ? task.fecha.split('T')[0] : '',
            duracion: task.duracion || '',
            hora: task.hora.toString(),
            nombreActividad: task.tipoActividad || 'Nombre no disponible',
            notas: task.notas || '',
            color: localStorage.getItem(`actividadColor_${task.idActividad}`) || '#ffffff',
        });

        setWeatherData(null);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedTask(null);
        setWeatherData(null);
        setIsFlipped(false); // Resetear el flip al cerrar el popup
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
            setActivities(prevActivities => 
                prevActivities.filter(task => task.idActividad !== selectedTask.idActividad)
            );
            setShowAlert(false);
            setShowSuccess(true);
            closePopup();
        } catch (error) {
            alert('Error al eliminar la actividad.');
        }
    };

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const getUvRecommendation = (uvIndex) => {
        if (uvIndex < 3) {
            return "Índice UV bajo. No se necesita protección solar.";
        } else if (uvIndex < 6) {
            return "Índice UV moderado. Considera usar protección solar.";
        } else if (uvIndex < 8) {
            return "Índice UV alto. Usa bloqueador solar.";
        } else if (uvIndex < 11) {
            return "Índice UV muy alto. Usa bloqueador solar, busca sombra.";
        } else {
            return "Índice UV extremadamente alto. Evita salir al sol.";
        }
    };

    const showActivity = () => {
        setIsFlipped(false);
    };
    
    const showClimate = () => {
        setIsFlipped(true);
    };

    const [userAvatar, setUserAvatar] = useState(null); // Almacenará la URL del avatar

    useEffect(() => {
        const avatar = localStorage.getItem('selectedAvatar');
        if (avatar) {
            setUserAvatar(avatar);
        }
    }, []);

    // Determinar la clase CSS y la imagen a usar
    const avatarClass = userAvatar ? 'welcome-icon2' : 'welcome-icon';
    const defaultImage = "https://i.ibb.co/8PRP6Qd/dfca5d490a29f43b59c25d1b1acc94ee-removebg-preview.png";

    return (
        <div className="home-page">
            <div className={`welcome-section`}>
                <div className={avatarClass}>
                    {userAvatar ? (
                        <img src={userAvatar} alt="Avatar del usuario" />
                    ) : (
                        <img src={defaultImage} alt="Imagen de bienvenida" />
                    )}
                </div>
                <div className="welcome-message">
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
            </div>

            {showPopup && selectedTask && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()} style={{ background: selectedTask.color }}>
                        <div className="popup-card hover-flip" onClick={(e) => e.stopPropagation()}>
                            <button className="close-btn" aria-label="Cerrar" onClick={closePopup}>
                                x
                            </button>
                            <div className="dual-switch">
                                <button 
                                    id="activityButton" 
                                    className={!isFlipped ? 'active' : ''} 
                                    onClick={showActivity}
                                >
                                    Actividad
                                </button>
                                <button 
                                    id="climateButton" 
                                    className={isFlipped ? 'active' : ''} 
                                    onClick={showClimate}
                                >
                                    Clima
                                </button>
                            </div>
                            <div className={`popup-inner ${isFlipped ? 'flipped' : ''}`} id="popupInner">
                                <div className="popup-front">
                                    <h4>{selectedTask.nombreActividad || 'Nombre no disponible'}</h4>
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
                                            <div className="popup-cell">{selectedTask.duracion || 'No disponible'}</div>
                                        </div>
                                        <div className="popup-row">
                                            <div className="popup-cell">Notas:</div>
                                            <div className="popup-cell">{selectedTask.notas || 'No disponible'}</div>
                                        </div>
                                    </div>
                                    <div className="popup-buttons">
                                        <button className="popup-edit-btn" onClick={handleEdit}>Editar</button>
                                        <button className="popup-delete-btn" onClick={handleDeleteConfirmation}>Eliminar</button>
                                    </div>
                                </div>
                                <div className="popup-back">
                                    <h4>Datos Climáticos</h4>
                                    {weatherData ? (
                                        <div className="weather-data">
                                            <p>Temperatura: {weatherData.temperature}°C</p>
                                            <p>Humedad: {weatherData.humidity}%</p>
                                            <p>Viento: {weatherData.wind} km/h</p>
                                            <p>Índice UV: {weatherData.uvIndex}</p>
                                            <p>{getUvRecommendation(weatherData.uvIndex)}</p>
                                        </div>
                                    ) : (
                                        <p>No se encontraron datos climáticos.</p>
                                    )}
                                    <button className="fetch-weather-btn" onClick={fetchWeatherForSelectedTask}>Obtener datos climáticos</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAlert && (
                <div className="alert-overlay">
                    <div className="alert">
                        <p>{alertMessage}</p>
                        <button onClick={() => setShowAlert(false)}>Cancelar</button>
                        <button onClick={handleDelete}>Aceptar</button>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="success-overlay">
                    <div className="success">
                        <p>Actividad eliminada con éxito.</p>
                        <button onClick={() => setShowSuccess(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
