import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearActividad = () => {
    const [tiposActividad, setTiposActividad] = useState([]); // Estado para los tipos de actividad
    const [actividad, setActividad] = useState({
        idTipoActividad: '',
        ubicacion: '',
        fecha: '',
        duracion: '',
        notas: '',
    });

    // Obtener tipos de actividad al cargar el componente
    useEffect(() => {
        const obtenerTiposActividad = async () => {
            try {
                const response = await axios.get('/api/tipoactividad'); // Asegúrate de que esta URL sea correcta
                console.log('Tipos de actividad:', response.data); // Imprime los tipos de actividad
                setTiposActividad(response.data); // Guardar los tipos de actividad en el estado
            } catch (error) {
                console.error('Error al obtener tipos de actividad', error);
            }
        };

        obtenerTiposActividad();
    }, []);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/actividad', actividad); // Cambia esta URL si es necesario
            console.log('Actividad creada:', response.data);
            // Puedes agregar lógica adicional aquí, como redirigir al usuario o mostrar un mensaje de éxito
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
                                {tipo.nombre}
                            </option>
                        ))
                    ) : (
                        <option value="">Cargando actividades...</option>
                    )}
                </select>
            </label>

            <label>
                Ubicación:
                <input
                    type="text"
                    value={actividad.ubicacion}
                    onChange={(e) => setActividad({ ...actividad, ubicacion: e.target.value })}
                    required
                />
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
