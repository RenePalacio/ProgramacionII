import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClipboardList, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import MenuDesplegable from './MenuDesplegable'; // Importa el componente del menú

const Pantalla6 = () => {
    const navigate = useNavigate();

    // Función para navegar a la pantalla para agregar una nueva dirección
    const handleAddAddress = () => {
        navigate('/AgregarDireccion');
    };

    // Función para navegar a la pantalla para editar información
    const handleEditInfo = () => {
        navigate('/EditarDireccion'); 
    };

    // Función para regresar a la pantalla anterior
    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className="container">
            <header className="header">
                <div className="header-content">
                    <h2>Ubicaciones Guardadas</h2>
                    {/* Botón para retroceder */}
                    <button className="back-button" onClick={handleBack}>
                        Atrás
                    </button>
                </div>
            </header>

            {/* Botones para agregar y editar dirección */}
            <div className="action-buttons">
                <button className="action-button" onClick={handleAddAddress}>
                    Agregar Dirección
                </button>
                <button className="action-button" onClick={handleEditInfo}>
                    Editar Dirección
                </button>
            </div>

            {/* Sección de mapas */}
            <div className="map-section">
                <h3>Mapas de Ubicaciones</h3>
                <div className="maps-container">
                    {/* Ejemplo de ubicación guardada 1 */}
                    <iframe
                        width="300"
                        height="150"
                        frameBorder="0" style={{ border: 0 }}
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-89.2760%2C13.6578%2C-89.1719%2C13.7606&amp;layer=mapnik"
                        allowFullScreen
                        title="Mapa de San Salvador"
                    ></iframe>
                    <p>San Salvador, El Salvador</p>

                    {/* Ejemplo de ubicación guardada 2 */}
                    <iframe
                        width="300"
                        height="150"
                        frameBorder="0" style={{ border: 0 }}
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-89.1073%2C13.7212%2C-89.0366%2C13.7642&amp;layer=mapnik"
                        allowFullScreen
                        title="Mapa de Soyapango"
                    ></iframe>
                    <p>Soyapango, San Salvador</p>
                </div>
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
                {/* menú desplegable */}
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

export default Pantalla6;
