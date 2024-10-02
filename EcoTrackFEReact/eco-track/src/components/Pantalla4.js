import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar el hook de navegación
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClipboardList, faBell, faCog, faStar, faSearch, faCloudSun } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono del clima
import './styles.css'; // Asegúrate de que los estilos estén en este archivo
import MenuDesplegable from './MenuDesplegable'; // Importa el componente del menú

const Inicio = () => {
    const navigate = useNavigate(); // Definir el hook useNavigate para la navegación

    // Función que navega a la pantalla de creación de actividad
    const handleNewActivity = () => {
        navigate('/CrearActividad'); // Navegar a la ruta de la pantalla de crear actividad
    };

    // Función que navega a la pantalla de edición de actividad
    const handleEditActivity = (activity) => {
        navigate('/EditarActividad', { state: { activity } }); // Navegar a la ruta de edición de actividad
    };

    const handleActivityClick = (activity) => {
        alert(`Actividad seleccionada: ${activity}`);
    };

    // Función para navegar a Pantalla3
    const handleBack = () => {
        navigate('/Pantalla3'); // Navega a la ruta de Pantalla3
    };

    // Función para navegar al Perfilusuario de usuario
    const handleGoToProfile = () => {
        navigate('/Perfilusuario'); // Cambia a la ruta de tu Perfilusuario de usuario
    };

    // Función para navegar a la pantalla de clima
    const handleGoToWeather = () => {
        navigate('/WeatherApp'); // Cambia a la ruta de tu componente Clima
    };

    return (
        <div className="container">
            <header className="header">
                <div className="header-content">
                    <img src="public/Inicio.PNG" alt="User" className="header-image" />
                    <div className="header-text">
                        <p>Buenas Tardes, Usuario</p>
                        <p>No te Olvides de Llevar Tu Paraguas Hoy</p>
                    </div>
                    <FontAwesomeIcon icon={faCog} className="settings-icon" />
                </div>
            </header>

            {/* Contenedor para los botones de navegación */}
            <div className="navigation-buttons">
                {/* Botón de Atrás que lleva a Pantalla3 */}
                <button className="back-button" onClick={handleBack}>Atrás</button>

                {/* Botón de Clima */}
                <button onClick={handleGoToWeather} className="weather-button">
                    <FontAwesomeIcon icon={faCloudSun} /> Clima
                </button>
            </div>

            {/* Botón para ir al Perfilusuario de usuario */}
            <div className="profile-button-container">
                <button className="action-button" onClick={handleGoToProfile}>
                    Ir a Mi Perfilusuario
                </button>
            </div>

            <div className="new-activity">
                <button className="action-button" onClick={handleNewActivity}>
                    Crea una Nueva Actividad
                </button>
            </div>

            <div className="activities">
                <h4>SUS ACTIVIDADES</h4>
                {['Correr', 'Caminar', 'Nadar'].map((activity, index) => (
                    <div className="activity-item" key={index}>
                        <button className="activity-button" onClick={() => handleActivityClick(activity)}>
                            {activity} 
                            <FontAwesomeIcon icon={faStar} className="activity-icon" />
                        </button>
                        {/* Botón de Editar que redirige a la pantalla de edición */}
                        <button className="edit-button" onClick={() => handleEditActivity(activity)}>
                            Editar
                        </button>
                    </div>
                ))}
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

                {/* Reemplazar el botón central por el menú desplegable */}
                <MenuDesplegable /> {/* El menú se desplegará al presionar este botón */}

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

export default Inicio;
