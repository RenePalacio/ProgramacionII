import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClipboardList, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import './styles.css'; 
import MenuDesplegable from './MenuDesplegable'; // Importa el componente del menú

const CrearActividad = () => {
    // Estados para los inputs
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const navigate = useNavigate(); // useNavigate

    const handleSave = () => {
        alert('Actividad guardada');
    };

    const handleGoToUbicaciones = () => {
        navigate('/ubicaciones'); 
    };

    return (
        <div className="container">
            <header className="header">
                <button className="back-button" onClick={() => navigate('/Pantalla6')}>Atrás</button> {/* Navegación */}
                <h2>Crear una Actividad</h2>
                {/* Botón para ir a ubicaciones a la derecha */}
                <button className="navigate-button" onClick={handleGoToUbicaciones}>
                    Ubicaciones
                </button>
            </header>

            <div className="activity-details">
                <h3>Detalles de la Actividad</h3>
                <div className="input-group">
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        placeholder="Nombre"
                    />
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label>Fecha</label>
                        <input 
                            type="date" 
                            value={fecha} 
                            onChange={(e) => setFecha(e.target.value)} 
                        />
                    </div>
                    <div className="input-group">
                        <label>Hora</label>
                        <input 
                            type="time" 
                            value={hora} 
                            onChange={(e) => setHora(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="input-group">
                    <label>Ubicación</label>
                    <input 
                        type="text" 
                        value={ubicacion} 
                        onChange={(e) => setUbicacion(e.target.value)} 
                        placeholder="Ubicación"
                    />
                </div>
                <div className="input-group">
                    <label>Descripción</label>
                    <textarea 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        placeholder="Descripción"
                    />
                </div>

                <button className="save-button" onClick={handleSave}>Guardar</button>
            </div>

            {/* Barra de navegación inferior */}
            <div className="bottom-nav">
                <div className="nav-icon">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>Agenda</span>
                </div>
                <div className="nav-icon">
                    <FontAwesomeIcon icon={faClipboardList} />
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

export default CrearActividad;
