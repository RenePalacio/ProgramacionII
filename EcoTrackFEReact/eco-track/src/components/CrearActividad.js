import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './styles.css';

const CrearActividadAct = () => {
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
    const [cargando, setCargando] = useState(false);
    
    const navigate = useNavigate(); 
    const idUsuario = localStorage.getItem('idUsuario') || '1';

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
                const response = await axios.get('http://localhost:5000/api/Tipoactividad');
                setTiposActividad(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de actividad', error);
            }
        };
        // Animacion de Estrellas De Fondo
        const crearEstrellasAct = (cantidad) => {
            const contenedorEstrellasAct = document.querySelector('.container-act');

            for (let i = 0; i < cantidad; i++) {
                const estrellaAct = document.createElement('div');
                estrellaAct.className = 'star-act';
                const size = Math.random() * 3 + 1;
                estrellaAct.style.width = `${size}px`;
                estrellaAct.style.height = `${size}px`;
                estrellaAct.style.top = `${Math.random() * 100}vh`;
                estrellaAct.style.left = `${Math.random() * 100}vw`;
                estrellaAct.style.animationDelay = `${Math.random() * 2}s`; 
                contenedorEstrellasAct.appendChild(estrellaAct);
            }
        };

        obtenerTiposActividad();
        document.body.classList.add('estilo3');
     

        const storedLocation = JSON.parse(localStorage.getItem('savedLocation'));
        if (storedLocation) {
            setActividad((prev) => ({ ...prev, ubicacion: storedLocation.address }));
        }

        const currentDate = new Date(); 
        const formattedDate = currentDate.toLocaleDateString('en-CA'); 
        setActividad((prev) => ({ ...prev, fecha: formattedDate }));
        crearEstrellasAct(100); 

        return () => {
            document.body.classList.remove('estilo3');
            const estrellasAct = document.querySelectorAll('.star-act');
            estrellasAct.forEach(estrella => estrella.remove()); 
        };

    }, []);
    

    const handleColorChange = (degradado) => {
        setActividad((prev) => ({
            ...prev,
            color: degradado,
        }));
    };

    const scheduleNotification = (fechaHora) => {
        const notificationTime = new Date(fechaHora);
        notificationTime.setMinutes(notificationTime.getMinutes() - 5);

        const currentTime = new Date().getTime();
        if (notificationTime.getTime() > currentTime) {
            const timeout = notificationTime.getTime() - currentTime;
            setTimeout(() => {
                showExternalNotification(`Tienes una actividad programada a las ${actividad.hora}`);
            }, timeout);
        }
    };

    const showExternalNotification = (mensaje) => {
        const selectedAvatar = localStorage.getItem('selectedAvatar') || 'https://i.ibb.co/SsB90qS/nube.png'
        if ('Notification' in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    const notification = new Notification('Tu Actividad Esta A Punto De Empezar!!', {
                        body: mensaje,
                        icon: selectedAvatar,
                    });
                    notification.onclick = () => {
                        window.focus();
                    };
                }
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    
        // Formatear la fecha y la hora
        const fechaFormateada = `${actividad.fecha}T${actividad.hora}:00`;
        const fechaFormateada2 = `${actividad.fecha}T00:00:00Z`;
        const duracionMinutos = Number(actividad.duracion);
        const horaFormateada = `${actividad.hora}:00`;
    
        const actividadData = {
            idTipoActividad: Number(actividad.idTipoActividad),
            ubicacion: actividad.ubicacion,
            fecha: fechaFormateada2,
            duracion: duracionMinutos,
            hora: horaFormateada,
            notas: actividad.notas,
            idUsuario: Number(idUsuario),
        };
    
        setCargando(true);
    
        try {
            const response = await axios.post('http://localhost:5000/api/actividad', actividadData);
            console.log('Actividad creada:', response.data);
    
            // Programar la notificación en el backend
            const notificacionData = {
                IdActividad: response.data.idActividad,
                Mensaje: `Tienes la actividad programada a las ${actividad.hora}`,
                FechaEnvio: new Date(fechaFormateada).toISOString(),
                Enviado: false
            };
    
            await axios.post('http://localhost:5000/api/Notificacion', notificacionData);
            console.log('Notificación creada');
    
            // Programar la notificación en el frontend
            scheduleNotification(fechaFormateada);
    
            localStorage.setItem(`actividadColor_${response.data.idActividad}`, actividad.color);
            setActividad({
                idTipoActividad: '',
                ubicacion: '',
                fecha: '',
                duracion: '',
                hora: '',
                notas: '',
                color: '#ffffff',
            });
    
            navigate('/home');
        } catch (error) {
            console.error('Error al crear actividad o notificación', error.response?.data || error.message);
        } finally {
            setCargando(false);
        }
    };
    

    return (
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
                            readOnly
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
                    </div>

                    <button type="submit" className="form-button-act" disabled={cargando}>
                        {cargando ? 'Guardando...' : 'Guardar'}
                    </button>
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
    );
};

export default CrearActividadAct;
