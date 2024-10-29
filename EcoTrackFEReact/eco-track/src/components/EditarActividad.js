import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const EditarActividad = () => {
    const { id } = useParams(); // Obtenemos el id de la actividad a editar
    const [tiposActividad, setTiposActividad] = useState([]);
    const [actividad, setActividad] = useState({
        idTipoActividad: '',
        ubicacion: '', 
        fecha: '',
        duracion: '',
        hora: '',
        notas: '',
        color: '#ffffff',
    });

    const navigate = useNavigate(); 
    let notificationTimeoutId = null; // Variable para almacenar el ID del timeout

    const corazones = [
        { id: 1, color: 'linear-gradient(to right, #ffadad, #ff6f6f)' },
        { id: 2, color: 'linear-gradient(to right, #add8e6, #87cefa)' },
        { id: 3, color: 'linear-gradient(to right, #b2f2bb, #9ae0a1)' },
        { id: 4, color: 'linear-gradient(to right, #fff9b0, #ffec40)' },
        { id: 5, color: 'linear-gradient(to right, #a1e4f5, #83d6e8)' },
        { id: 6, color: 'linear-gradient(to right, #ffccab, #ff9a66)' },
        { id: 7, color: 'linear-gradient(to right, #d5b5ff, #a77bff)' }
    ];

    useEffect(() => {
        const obtenerTiposActividad = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tipoactividad');
                setTiposActividad(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de actividad', error);
            }
        };

        const obtenerActividad = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/actividad/actividad/${id}`);
                if (response.data) {
                    setActividad({
                        idTipoActividad: response.data.idTipoActividad || '',
                        ubicacion: response.data.ubicacion || '', 
                        fecha: response.data.fecha.split('T')[0] || '',
                        duracion: response.data.duracion || '',
                        hora: response.data.hora.split(':').slice(0, 2).join(':') || '',
                        notas: response.data.notas || '',
                        color: response.data.color || '#ffffff',
                    });
                }
            } catch (error) {
                console.error('Error al obtener actividad', error);
            }
        };

        obtenerTiposActividad();
        obtenerActividad();
        document.body.classList.add('estilo3');
        crearEstrellasAct(100); // Crear estrellas al montar el componente

        // Establecer la fecha actual en el estado
        const fechaActual = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
        setActividad((prev) => ({ ...prev, fecha: fechaActual }));

        return () => {
            document.body.classList.remove('estilo3');
            const estrellasAct = document.querySelectorAll('.star-act');
            estrellasAct.forEach(estrella => estrella.remove()); // Limpiar estrellas al salir
        };
    }, [id]);

    const crearEstrellasAct = (cantidad) => {
        const contenedorEstrellasAct = document.querySelector('.container-act');

        for (let i = 0; i < cantidad; i++) {
            const estrellaAct = document.createElement('div');
            estrellaAct.className = 'star-act';
            const size = Math.random() * 3 + 1; // Tamaño entre 1px y 4px
            estrellaAct.style.width = `${size}px`;
            estrellaAct.style.height = `${size}px`;
            estrellaAct.style.top = `${Math.random() * 100}vh`;
            estrellaAct.style.left = `${Math.random() * 100}vw`;
            estrellaAct.style.animationDelay = `${Math.random() * 2}s`; // Diferente retardo de parpadeo
            contenedorEstrellasAct.appendChild(estrellaAct);
        }
    };

    const handleColorChange = (degradado) => {
        setActividad((prev) => ({
            ...prev,
            color: degradado,
        }));
    };

    const handleUbicacionChange = () => {
        const storedLocation = JSON.parse(localStorage.getItem('savedLocation'));
        if (storedLocation) {
            setActividad((prev) => ({ ...prev, ubicacion: storedLocation.address }));
        }
    };

    const scheduleNotification = (fechaHora) => {
        const notificationTime = new Date(fechaHora);
        notificationTime.setMinutes(notificationTime.getMinutes() - 5);

        const currentTime = new Date().getTime();
        if (notificationTime.getTime() > currentTime) {
            const timeout = notificationTime.getTime() - currentTime;

            // Limpiar el timeout anterior si existe
            if (notificationTimeoutId) {
                clearTimeout(notificationTimeoutId);
            }

            // Programar nueva notificación
            notificationTimeoutId = setTimeout(() => {
                const mensaje = `Tienes una actividad programada a las ${actividad.hora}`;
                showExternalNotification(mensaje);
            }, timeout);
        }
    };

    const showExternalNotification = (mensaje) => {
        const selectedAvatar = localStorage.getItem('selectedAvatar') || 'https://i.ibb.co/SsB90qS/nube.png';
        if ('Notification' in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    const notification = new Notification('Tu Actividad Está A Punto De Empezar!!', {
                        body: mensaje,
                        icon: selectedAvatar,
                    });
                    notification.onclick = () => {
                        window.focus();
                    };
                    console.log('Notificación programada:', mensaje); // Log para verificar la notificación
                }
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos tengan valores
        if (!actividad.idTipoActividad || !actividad.ubicacion || !actividad.duracion || !actividad.hora) {
            console.error('Por favor, complete todos los campos obligatorios.');
            return;
        }

        const actividadData = {
            idTipoActividad: Number(actividad.idTipoActividad),
            ubicacion: actividad.ubicacion,
            fecha: actividad.fecha,
            duracion: Number(actividad.duracion),
            hora: actividad.hora + ':00', // Aseguramos que tenga el formato HH:mm:ss
            notas: actividad.notas,
            color: actividad.color,
            idUsuario: 1 // ID de usuario fijo para pruebas
        };

        console.log('Datos a enviar:', actividadData); // Imprimir datos a enviar para depuración

        try {
            const response = await axios.put(`http://localhost:5000/api/actividad/actividad/${id}`, actividadData);
            console.log('Actividad editada:', response.data);

            // Programar la notificación
            const fechaFormateada = `${actividad.fecha}T${actividad.hora}:00`;
            scheduleNotification(fechaFormateada); // Programar la nueva notificación

            // Guardar el color en localStorage usando el ID de la actividad
            localStorage.setItem(`actividadColor_${id}`, actividad.color);

            navigate('/home');
        } catch (error) {
            console.error('Datos enviados:', actividadData);
            console.error('Error al editar actividad', error.response?.data || error.message);
            if (error.response?.data?.errors) {
                console.error('Errores de validación:', error.response.data.errors);
            }
        }
    };

    return (
        <div style={{ color: actividad.color || '#ffffff' }}>
        <div className="container-act">
            <header className="Ubiheader">
                <h1 className="logo-text">E C O T R A C K</h1>
            </header>
            <div className="image-heart-container-act">
                <div className="image-container-act"></div>
                <div className="heart-selector-act">
                    {corazones.map((corazon) => (
                        <div 
                            key={corazon.id} 
                            className="heart-act" 
                            style={{ 
                                background: corazon.color,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }} 
                            onClick={() => handleColorChange(corazon.color)} 
                        >
                            &#10084;
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="form-container-act" style={{ background: actividad.color }}>
                <form onSubmit={handleSubmit} className="activity-form-act">
                    <div className="input-container-act">
                        <select
                            name="idTipoActividad"
                            value={actividad.idTipoActividad}
                            onChange={(e) => setActividad({ ...actividad, idTipoActividad: e.target.value })}
                            required
                            className="input-act"
                        >
                            <option value="">Tipo De Actividad</option>
                            {tiposActividad.length > 0 ? (
                                tiposActividad.map((tipo) => (
                                    <option key={tipo.idTipoActividad} value={tipo.idTipoActividad}>
                                        {tipo.nombreActividad}
                                    </option>
                                ))
                            ) : (
                                <option value="">Cargando actividades...</option>
                            )}
                        </select>
                    </div>

                    <div className="input-container-act">
                        <input
                            type="date"
                            value={actividad.fecha}
                            readOnly // Evitar que el usuario cambie la fecha
                            className="input-act"
                        />
                    </div>

                    <div className="input-container-act">
                        <input
                            type="time"
                            value={actividad.hora}
                            onChange={(e) => setActividad({ ...actividad, hora: e.target.value })}
                            required
                            className="input-act"
                        />
                    </div>

                    <div className="input-container-act">
                        <input
                            type="number"
                            value={actividad.duracion}
                            onChange={(e) => setActividad({ ...actividad, duracion: e.target.value })}
                            required
                            className="input-act"
                            placeholder="Duración (en minutos)"
                            min="0"
                        />
                    </div>

                    <div className="input-container-act">
                        <textarea
                            value={actividad.notas}
                            onChange={(e) => setActividad({ ...actividad, notas: e.target.value })}
                            className="form-textarea-act"
                            placeholder="Notas"
                        />
                    </div>

                    <div className="input-container-act">
                        <input
                            type="text"
                            value={actividad.ubicacion}
                            readOnly
                            className="input-act"
                            placeholder="Ubicación seleccionada"
                        />
                        <button type="button" onClick={handleUbicacionChange} className="form-button-act2">
                            Actualizar Ubicación
                        </button>
                    </div>

                    <button type="submit" className="form-button-act">Actualizar</button>
                </form>
                
                <footer className="footer">
                    <span>© 2024 SummerTime Coders. Todos los derechos reservados.</span>
                    <span>
                        <a href="/politicadeuso" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>
                            Políticas de Uso
                        </a>
                    </span>
                </footer>
            </div>
        </div>
        </div>
    );
};

export default EditarActividad;
