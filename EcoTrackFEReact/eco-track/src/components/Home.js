import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Home = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [activities, setActivities] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [greeting, setGreeting] = useState('');
    const [advice, setAdvice] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [userName, setUserName] = useState('Usuario');
    const [isFlipped, setIsFlipped] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [alertColor, setAlertColor] = useState('#ffffff');
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

    useEffect(() => {
        const avatar = localStorage.getItem('selectedAvatar');
        if (avatar) {
            setUserAvatar(avatar);
        }
    }, []);

    const fetchWeatherForSelectedTask = async () => {
        if (selectedTask?.idActividad) {
            const savedLocation = JSON.parse(localStorage.getItem('savedLocation'));

            if (savedLocation) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/DatosClima/${selectedTask.idActividad}`);
                    setWeatherData(response.data);
                    showAlertWithMessage('Datos climáticos recuperados de la base de datos.');
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
                        showAlertWithMessage('Datos climáticos obtenidos con éxito.');
                    } catch (error) {
                        console.error('Error al obtener datos climáticos:', error);
                        showAlertWithMessage('Error al obtener datos climáticos.');
                    }
                }
            } else {
                showAlertWithMessage("Debes guardar una ubicación antes de obtener datos climáticos.");
            }
        } else {
            showAlertWithMessage("Debe seleccionar una actividad antes de obtener el clima.");
        }
    };
        // Agrega este estado al inicio del componente
        const [cloudCount, setCloudCount] = useState(0); // Estado para el número de nubes

        // Agrega este useEffect para establecer la cantidad de nubes según las actividades
        useEffect(() => {
            setCloudCount(activities.length > 0 ? Math.min(activities.length, 10) : 0);
        }, [activities]);

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
        setIsFlipped(false);
    };

    const handleEdit = () => {
        navigate(`/editarAct/${selectedTask.idActividad}`);
        closePopup();
    };

    const handleDeleteConfirmation = () => {
        const color = selectedTask ? selectedTask.color : '#ffffff';
        setAlertColor(color);
        showAlertWithMessage('¿Estás seguro de que deseas eliminar esta actividad?');
        setShowConfirmation(true);
    };

    const handleDelete = async () => {
        if (!selectedTask) return;

        try {
            await axios.delete(`http://localhost:5000/api/Actividad/actividad/${selectedTask.idActividad}`);
            setActivities(prevActivities => 
                prevActivities.filter(task => task.idActividad !== selectedTask.idActividad)
            );
            handleAlertClose();
            closePopup();
            showAlertWithMessage('Actividad eliminada con éxito.');
        } catch (error) {
            console.error('Error al eliminar la actividad:', error);
            showAlertWithMessage('Error al eliminar la actividad.');
        }
    };

    const handleAlertClose = () => {
        setShowAlert(false);
        setShowConfirmation(false);
    };

    

    const showAlertWithMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
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

    const weatherImages = {
        "cielo despejado": "https://i.ibb.co/pKp3H4H/sun.png",
        "pocas nubes": "https://i.ibb.co/mSBrFr0/weather.png",
        "nubes dispersas": "https://i.ibb.co/0ZwxD8b/sun-1.png",
        "nubes rotas": "https://i.ibb.co/L6h5Rhr/cloud.png",
        "lluvia": "https://i.ibb.co/tpQHBTZ/rainy-day.png",
        "tormenta eléctrica": "https://i.ibb.co/2Z6k0Y9/rainy.png",
        "nieve": "https://i.ibb.co/wz32MSP/snow.png",
        "niebla": "https://i.ibb.co/VtmXm4f/mist.png",
        "lluvia ligera": "https://i.ibb.co/8DVyWw8/weather-1.png",
        "nublado": "https://i.ibb.co/CszDjV9/414825.png",
        "neblina": "https://i.ibb.co/5KmWDwn/haze.png",
    };
    const activityImages = {
        "Aer�bicos": "https://i.ibb.co/Yd7R1bb/squats.png",
        "Escalada": "https://i.ibb.co/42kQ5kp/rock.png",
        "Baile": "https://i.ibb.co/wWhVPwQ/traditional-dance.png",
        "Senderismo": "https://i.ibb.co/Lhy7gYJ/hiking.png",
        "Pilates": "https://i.ibb.co/smg9KBV/pilates.png",
        "Entrenamiento de fuerza": "https://i.ibb.co/dWqHNfN/fitness.png",
        "Yoga": "https://i.ibb.co/HVqF5Md/meditation.png",
        "Ciclismo": "https://i.ibb.co/WcRNWQ9/bike.png",
        "Nadar": "https://i.ibb.co/sKtH5s2/swimming.png",
        "Correr": "https://i.ibb.co/30Gd00M/running.png",
    };
    

    const avatarClass = userAvatar ? 'welcome-icon2' : 'welcome-icon';
    const defaultImage = "https://i.ibb.co/8PRP6Qd/dfca5d490a29f43b59c25d1b1acc94ee-removebg-preview.png";

    return (
        <div className="home-page">
            <div className="welcome-section">
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
                                    onClick={() => setIsFlipped(false)}
                                >
                                    Actividad
                                </button>
                                <button 
                                    id="climateButton" 
                                    className={isFlipped ? 'active' : ''} 
                                    onClick={() => setIsFlipped(true)}
                                >
                                    Clima
                                </button>
                            </div>
                            <div className={`popup-inner ${isFlipped ? 'flipped' : ''}`}>
                                <div className="popup-front">
                                <h4 className='popup-h4A'>{selectedTask.nombreActividad || 'Nombre no disponible'}</h4>
                                    <img 
                                        src={activityImages[selectedTask?.nombreActividad]} 
                                        alt={selectedTask?.nombreActividad} 
                                        className="activity-icon" 
                                    />
                                    <div className="popup-table">
                                        <div className="popup-row">
                                            <div className="popup-cell"><strong>Hora</strong>: {selectedTask.hora || 'No disponible'}</div>
                                        </div>
                                        <div className="popup-row">
                                            <div className="popup-cell"><strong>Ubicación:</strong> {selectedTask.ubicacion || 'No disponible'}</div>
                                        </div>
                                        <div className="popup-row">
                                            <div className="popup-cell"><strong>Fecha:</strong> {selectedTask.fecha || 'No disponible'}</div>
                                        </div>
                                        <div className="popup-row">
                                            <div className="popup-cell"><strong>Duración:</strong> {selectedTask.duracion || 'No disponible'}</div>
                                        </div>
                                        <div className="popup-row">
                                            <div className="popup-cell"><strong>Notas:</strong> {selectedTask.notas || 'No disponible'}</div>
                                        </div>
                                    </div>
                                    <div className="popup-buttons">
                                        <button className="edit-task-btn" onClick={handleEdit}>Editar</button>
                                        <button className="delete-task-btn" onClick={handleDeleteConfirmation}>Eliminar</button>
                                    </div>
                                </div>
                                <div className="popup-back">
                                    <h4 className='popup-h4C'>Datos Climáticos</h4>
                                    {weatherData ? (
                                        <div className="weather-data">
                                            <img 
                                                src={weatherImages[weatherData?.descripcion]} 
                                                alt={weatherData.descripcion} 
                                                className="weather-icon" 
                                            />
                                            <p className='p-temp'><strong>Temperatura:</strong></p>
                                            <p className='p2-cell' style={{ fontSize: '42px' }}>
                                                {weatherData?.temperatura !== undefined ? `${weatherData.temperatura} °C` : 'No disponible'}
                                            </p>
                                            <p className='p-desc'><strong>Descripción:</strong> {weatherData?.descripcion || 'No disponible'}</p>
                                            <p className='p-hum'><strong>Humedad:</strong></p>
                                            <p className='p2-cell' style={{ fontSize: '42px' }}>{weatherData?.humedad !== undefined ? `${weatherData.humedad}%` : 'No disponible'}</p>
                                            <p className='p-uv'><strong>Índice UV:</strong> {weatherData?.indiceUV !== undefined ? weatherData.indiceUV : 'No disponible'}</p>
                                            <p className='p-uv2'><strong>Recomendación UV:</strong> {weatherData?.indiceUV !== undefined ? getUvRecommendation(weatherData.indiceUV) : 'No disponible'}</p>
                                        </div>
                                    ) : (
                                        <p className='p1'>No se encontraron datos climáticos.</p>
                                    )}
                                    <button className="api-task-btn" onClick={fetchWeatherForSelectedTask}>Obtener datos climáticos</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmation && (
                <div className="custom-alert-overlay" onClick={handleAlertClose}>
                    <div className="custom-alert-content" style={{ background: alertColor }} onClick={(e) => e.stopPropagation()}>
                        <p>{alertMessage}</p>
                        <div className="alert-buttons">
                            <button className="delete-task-btn1"  onClick={handleAlertClose}>Cancelar</button>
                            <button className="delete-task-btn1"  onClick={handleDelete}>Aceptar</button>
                        </div>
                    </div>
                </div>
            )}

            {showAlert && (
                <div className="custom-alert-overlay-home " onClick={handleAlertClose}>
                    <div className="custom-alert-content-home">
                        <p>{alertMessage}</p>
                    </div>
                </div>
            )}
        {[...Array(cloudCount)].map((_, index) => (
            <div key={index} className={`cloud cloud${index + 1}`}></div>
        ))}
        </div>
    );
};

export default Home;
