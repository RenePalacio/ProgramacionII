import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { useParams, useNavigate } from 'react-router-dom'; // Incluye useNavigate

const EditarActividad = () => { // Eliminar la prop location
    const { id } = useParams(); // Obtenemos el id de la actividad a editar
    const [tiposActividad, setTiposActividad] = useState([]);
    const [actividad, setActividad] = useState({
        idTipoActividad: '',
        ubicacion: '', // Inicializa como vacío
        fecha: '',
        duracionHoras: '',
        duracionMinutos: '',
        hora: '',
        notas: '',
        nombre: '',
        color: '#ffffff',
    });

    const navigate = useNavigate(); // Inicializa useNavigate

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
                const response = await axios.get(`http://localhost:5000/api/actividad/${id}`);
                setActividad(response.data);
            } catch (error) {
                console.error('Error al obtener actividad', error);
            }
        };

        obtenerTiposActividad();
        obtenerActividad();
        document.body.classList.add('estilo3');

        // Cargar la ubicación guardada desde localStorage
        const storedLocation = JSON.parse(localStorage.getItem('savedLocation'));
        if (storedLocation) {
            setActividad((prev) => ({ ...prev, ubicacion: storedLocation.address }));
        }

        return () => {
            document.body.classList.remove('estilo3');
        };
    }, [id]);

    const handleColorChange = (degradado) => {
        setActividad((prev) => ({
            ...prev,
            color: degradado,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/actividad/${id}`, actividad);
            console.log('Actividad editada:', response.data);
            // Redirigir a Home o a la página de actividades después de editar
            navigate('/home');
        } catch (error) {
            console.error('Error al editar actividad', error);
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
                        <input
                            type="text"
                            value={actividad.nombre}
                            onChange={(e) => setActividad({ ...actividad, nombre: e.target.value })}
                            required
                            className="input-name-act"
                            placeholder="Nombre de la Actividad"
                        />
                    </div>
    
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
                            onChange={(e) => setActividad({ ...actividad, fecha: e.target.value })}
                            required
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

                    <div className="input-container-act" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <input
                            type="number"
                            value={actividad.duracionHoras}
                            onChange={(e) => setActividad({ ...actividad, duracionHoras: e.target.value })}
                            required
                            className="input-act"
                            placeholder="Horas"
                            min="0"
                            style={{ marginRight: '10px', flex: 1 }}
                        />
                        <input
                            type="number"
                            value={actividad.duracionMinutos}
                            onChange={(e) => setActividad({ ...actividad, duracionMinutos: e.target.value })}
                            required
                            className="input-act"
                            placeholder="Minutos"
                            min="0"
                            style={{ flex: 1 }}
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
                    
                    {/* Campo para mostrar la ubicación */}
                    <div className="input-container-act">
                        <input
                            type="text"
                            value={actividad.ubicacion}
                            readOnly // Campo de solo lectura para la ubicación
                            className="input-act"
                            placeholder="Ubicación seleccionada"
                        />
                    </div>

                    <button type="submit" className="form-button-act">Actualizar</button>
                </form>
                <footer className="footer1">
                    <span>© SummerTime Coders</span>
                </footer>
            </div>
        </div>
    );
};

export default EditarActividad;
