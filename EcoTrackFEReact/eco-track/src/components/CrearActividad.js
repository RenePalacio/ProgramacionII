import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearActividad = () => {
    const [tiposActividad, setTiposActividad] = useState([]);
    const [actividad, setActividad] = useState({
        idTipoActividad: '',
        ubicacion: '',
        fecha: '',
        duracion: '',
        notas: '',
    });

    useEffect(() => {
        const obtenerTiposActividad = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tipoactividad'); 
                console.log('Tipos de actividad:', response.data);
                setTiposActividad(response.data); 
            } catch (error) {
                console.error('Error al obtener tipos de actividad', error);
            }
        };

        obtenerTiposActividad();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/actividad', actividad); 
            console.log('Actividad creada:', response.data);
        } catch (error) {
            console.error('Error al crear actividad', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Tipo de Actividad:
                <select
                    name="idTipoActividad"
                    value={actividad.idTipoActividad}
                    onChange={(e) => setActividad({ ...actividad, idTipoActividad: e.target.value })}
                    required
                >
                    <option value="">Selecciona una actividad</option>
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
            </label>

            <label>
                Fecha:
                <input
                    type="date"
                    value={actividad.fecha}
                    onChange={(e) => setActividad({ ...actividad, fecha: e.target.value })}
                    required
                />
            </label>

            <label>
                Duración:
                <input
                    type="time"
                    value={actividad.duracion}
                    onChange={(e) => setActividad({ ...actividad, duracion: e.target.value })}
                    required
                />
            </label>

            <label>
                Notas:
                <textarea
                    value={actividad.notas}
                    onChange={(e) => setActividad({ ...actividad, notas: e.target.value })}
                />
            </label>

            <button type="submit">Crear Actividad</button>
        </form>
    );
};

export default CrearActividad;
