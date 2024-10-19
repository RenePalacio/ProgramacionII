import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './styles.css';

const CrearActividad = () => {
    const [tiposActividad, setTiposActividad] = useState([]);
    const [actividad, setActividad] = useState({
        idTipoActividad: '',
        ubicacion: '', 
        fecha: '', // La fecha será ingresada en formato 'DD/MM/YYYY'
        duracion: '', // Duración en minutos
        hora: '',
        notas: '',
        color: '#ffffff', // Manteniendo el color
    });
    
    const navigate = useNavigate(); 

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

        obtenerTiposActividad();
        document.body.classList.add('estilo3');

        // Cargar la ubicación guardada del localStorage
        const storedLocation = JSON.parse(localStorage.getItem('savedLocation'));
        if (storedLocation) {
            setActividad((prev) => ({ ...prev, ubicacion: storedLocation.address }));
        }

        return () => {
            document.body.classList.remove('estilo3');
        };
    }, []);

    const handleColorChange = (degradado) => {
        setActividad((prev) => ({
            ...prev,
            color: degradado,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convertir la fecha al formato 'YYYY-MM-DD'
        const [dia, mes, anio] = actividad.fecha.split('/'); // Suponiendo que la fecha viene en 'DD/MM/YYYY'
        const fechaFormateada = `${anio}-${mes}-${dia}`; // Convertimos a 'YYYY-MM-DD'

        const actividadData = {
            idTipoActividad: actividad.idTipoActividad,
            ubicacion: actividad.ubicacion,
            fecha: fechaFormateada, // Usamos la fecha formateada
            duracion: "01:00:00", // Asegúrate de que sea un número
            hora: actividad.hora,
            notas: actividad.notas,
            idUsuario: 1 // Usar un ID de usuario ficticio para pruebas
        };

        try {
            const response = await axios.post('http://localhost:5000/api/actividad', actividadData);
            console.log('Actividad creada:', response.data);

            // Limpiar el formulario
            setActividad({
                idTipoActividad: '',
                ubicacion: '',
                fecha: '',
                duracion: '',
                hora: '',
                notas: '',
                color: '#ffffff', // Reiniciamos el color
            });

            // Redirigir a Home después de guardar la actividad
            navigate('/home'); 
        } catch (error) {
            console.error('Datos enviados:', actividadData); // Mostrar los datos que intentas enviar
            console.error('Error al crear actividad', error.response?.data || error.message);
            // Imprimir los errores de validación específicos
            if (error.response?.data?.errors) {
                console.error('Errores de validación:', error.response.data.errors);
            }
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
                            type="text"
                            value={actividad.fecha} // Asegúrate de que sea 'DD/MM/YYYY'
                            onChange={(e) => setActividad({ ...actividad, fecha: e.target.value })}
                            required
                            className="input-act"
                            placeholder="Fecha (DD/MM/YYYY)"
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

                    <button type="submit" className="form-button-act">Guardar</button>
                </form>
                
                <footer className="footer1">
                    <span>© SummerTime Coders</span>
                </footer>
            </div>
        </div>
    );
};

export default CrearActividad;
