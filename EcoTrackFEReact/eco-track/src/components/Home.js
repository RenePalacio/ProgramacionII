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

    const navigate = useNavigate();

    // Configurar mensaje de saludo basado en la hora del día
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

        // Obtener las actividades del usuario
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

    // Obtener los datos del clima
    const getWeatherData = async (latitude, longitude, idActividad) => {
        const apiKey = '658bf0af8b7d9dd388caa996c55f7d99';
        try {
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            );

            // Guardar los datos del clima y almacenarlos en el localStorage
            const weather = weatherResponse.data;
            setWeatherData(weather);
            localStorage.setItem(`weatherData_${idActividad}`, JSON.stringify(weather));

            console.log("Datos del clima:", weather);
        } catch (error) {
            console.error('Error al obtener datos del clima:', error);
        }
    };

    // Abrir el popup de actividad seleccionada
    const openPopup = (task) => {
        console.log("Datos de la actividad seleccionada:", task);
        setSelectedTask({
            idActividad: task.idActividad,
            idTipoActividad: task.idTipoActividad || '',
            ubicacion: task.ubicacion || '', 
            fecha: task.fecha ? task.fecha.split('T')[0] : '', // Ajusta el formato si es necesario
            duracion: task.duracion || '',
            hora: task.hora.toString(), // Asegúrate de que sea una cadena para mostrar correctamente
            nombreActividad: task.tipoActividad || 'Nombre no disponible', 
            notas: task.notas || '',
            color: localStorage.getItem(`actividadColor_${task.idActividad}`) || '#ffffff',
        });

        // Obtener los datos del clima almacenados en el localStorage
        const storedWeatherData = localStorage.getItem(`weatherData_${task.idActividad}`);
        if (storedWeatherData) {
            setWeatherData(JSON.parse(storedWeatherData));
        } else {
            setWeatherData(null);
        }

        setShowPopup(true);
    };
    
    const fetchWeatherForSelectedTask = () => {
        const storedLocation = JSON.parse(localStorage.getItem('savedLocation'));
    
        // Verificación detallada del contenido de storedLocation
        console.log("Ubicación almacenada en localStorage:", storedLocation);
    
        if (storedLocation && storedLocation.position) {
            const lat = storedLocation.position[0]; // Extraer la latitud del arreglo 'position'
            const lon = storedLocation.position[1]; // Extraer la longitud del arreglo 'position'
            const address = storedLocation.address;
    
            // Validar que lat y lon sean números válidos
            if (!isNaN(lat) && !isNaN(lon)) {
                if (selectedTask && selectedTask.idActividad) {
                    console.log("Obteniendo datos del clima para la ubicación:", address);
    
                    // Imprimir lo que se enviará a la API
                    console.log(`Enviando a la API: latitud = ${lat}, longitud = ${lon}, idActividad = ${selectedTask.idActividad}`);
    
                    // Llamar a la API usando latitud y longitud
                    getWeatherData(lat, lon, selectedTask.idActividad);
                } else {
                    console.error("No hay tarea seleccionada o falta idActividad.");
                    alert("Debe seleccionar una actividad antes de obtener el clima.");
                }
            } else {
                console.error("Latitud o longitud inválida. Valores recibidos:", lat, lon);
                alert("Ubicación inválida. No se puede obtener el clima.");
            }
        } else {
            console.error("No se pudo encontrar la ubicación o las coordenadas en el localStorage.");
            alert("Ubicación no encontrada.");
        }
    };
    
    
    
    // Cerrar el popup
    const closePopup = () => {
        setShowPopup(false);
        setSelectedTask(null);
        setWeatherData(null); // Limpiar datos del clima al cerrar el pop-up
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

    const translateWeatherDescription = (description) => {
        const translations = {
            "clear sky": "cielo despejado",
            "few clouds": "pocas nubes",
            "scattered clouds": "nubes dispersas",
            "broken clouds": "nubes rotas",
            "shower rain": "lluvia ligera",
            "rain": "lluvia",
            "thunderstorm": "tormenta eléctrica",
            "snow": "nieve",
            "mist": "niebla",
            "light rain": "lluvia ligera",
            "overcast clouds": "nublado",
            "haze": "neblina",
            "fog": "niebla",
        };

        return translations[description] || description; 
    };
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

    return (
        <div className="home-page">
            {/* Aquí se coloca todo el contenido del JSX */}
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
                        <h4>{selectedTask.nombreActividad || 'Nombre no disponible'}</h4>

                        {/* Datos de la actividad */}
                        <div className="popup-table">
                            <div className="popup-row">
                                <div className="popup-cell">Hora:</div>
                                <div className="popup-cell">{selectedTask.hora || 'No disponible'}</div>
                            </div>
                            <div className="popup-row">
                                <div className="popup-cell">Ubicación:</div>
                                {/* Mostrar la ubicación guardada */}
                                <div className="popup-cell">
                                    {localStorage.getItem('savedLocation') 
                                        ? JSON.parse(localStorage.getItem('savedLocation')).address 
                                        : 'Ubicación no disponible'}
                                </div>
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

                        {/* Sección para los datos del clima */}
                        <h5>Datos del Clima</h5>
                        <div className="popup-table">
                            <div className="popup-row">
                                <div className="popup-cell">Temperatura:</div>
                                <div className="popup-cell">{weatherData?.main?.temp ? `${weatherData.main.temp} °C` : 'No disponible'}</div>
                            </div>
                            <div className="popup-row">
                                <div className="popup-cell">Humedad:</div>
                                <div className="popup-cell">{weatherData?.main?.humidity ? `${weatherData.main.humidity}%` : 'No disponible'}</div>
                            </div>
                            <div className="popup-cell">Descripción:</div>
                            <div className="popup-cell">
                                {weatherData?.weather?.length > 0 
                                    ? translateWeatherDescription(weatherData.weather[0].description) 
                                    : 'No disponible'}
                            </div>
                        </div>

                        <div className="edit-delete-buttons">
                            <button className="edit-task-btn" onClick={handleEdit}>Editar</button>
                            <button className="delete-task-btn" onClick={handleDeleteConfirmation}>Eliminar</button>
                            <button className="api-task-btn" onClick={fetchWeatherForSelectedTask}>APIS</button>
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
