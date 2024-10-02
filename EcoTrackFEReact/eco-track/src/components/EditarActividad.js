import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Solo importar useParams

const EditarActividad = () => {
    const { id } = useParams();
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

        const obtenerActividad = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/actividad/${id}`);
                console.log('Actividad a editar:', response.data);
                setActividad(response.data);
            } catch (error) {
                console.error('Error al obtener actividad', error);
            }
        };

        obtenerTiposActividad();
        obtenerActividad();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/actividad/${id}`, actividad);
            console.log('Actividad editada:', response.data);
            // Aquí puedes redirigir o mostrar un mensaje de éxito si necesitas usar useNavigate.
        } catch (error) {
            console.error('Error al editar actividad', error);
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

            <button type="submit">Actualizar Actividad</button>
        </form>
    );
};

export default EditarActividad;
