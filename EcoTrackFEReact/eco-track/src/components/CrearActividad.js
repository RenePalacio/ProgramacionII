import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';


const CrearActividad = () => {
    const [tiposActividad, setTiposActividad] = useState([]);
    const [actividad, setActividad] = useState({
        idTipoActividad: '',
        ubicacion: '',
        fecha: '',
        duracion: '',
        notas: '',
        nombre: '',
        color: '#ffffff',
    });

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

        return () => {
            document.body.classList.remove('estilo3');
        };
    }, []);

    const handleColorChange = (color) => {
        setActividad((prev) => ({
            ...prev,
            color: color,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/actividad', actividad);
            console.log('Actividad creada:', response.data);
            setActividad({
                idTipoActividad: '',
                ubicacion: '',
                fecha: '',
                duracion: '',
                notas: '',
                nombre: '',
                color: '#ffffff',
            });
        } catch (error) {
            console.error('Error al crear actividad', error);
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
                    {/* Corazon Rojo */}
                    <div 
                        className="heart-act" 
                        style={{ color: actividad.color === '#f54021' ? '#f54021' : '#f54021' }} 
                        onClick={() => handleColorChange('#f54021')}
                    >
                        &#10084;
                    </div>
                    {/* Corazon Azul */}
                    <div 
                        className="heart-act" 
                        style={{ color: actividad.color === '#8892c6' ? '#8892c6' : '#8892c6' }} 
                        onClick={() => handleColorChange('#8892c6')}
                    >
                        &#10084;
                    </div>
                    {/* Corazon Verde */}
                    <div 
                        className="heart-act" 
                        style={{ color: actividad.color === '#4aa826' ? '#4aa826' : '#4aa826' }} 
                        onClick={() => handleColorChange('#4aa826')}
                    >
                        &#10084;
                    </div>
                    {/* Corazon Amarillo */}
                    <div 
                        className="heart-act" 
                        style={{ color: actividad.color === '#fbe870' ? '#fbe870' : '#fbe870' }} 
                        onClick={() => handleColorChange('#fbe870')}
                    >
                        &#10084;
                    </div>
                    <div 
                        className="heart-act" 
                        style={{ color: actividad.color === '#ffbf75' ? '#ffbf75' : '#ffbf75' }} 
                        onClick={() => handleColorChange('#ffbf75')}
                    >
                        &#10084;
                    </div>
                    <div 
                        className="heart-act" 
                        style={{ color: actividad.color === '#1cf2f6' ? '#1cf2f6' : '#1cf2f6' }} 
                        onClick={() => handleColorChange('#1cf2f6')}
                    >
                        &#10084;
                    </div>
                    <div 
                        className="heart-act" 
                        style={{ color: actividad.color === '#c36ac8' ? '#c36ac8' : '#c36ac8' }} 
                        onClick={() => handleColorChange('#c36ac8')}
                    >
                        &#10084;
                    </div>
                </div>
            </div>
            
            <div className="form-container-act" style={{ backgroundColor: actividad.color }}>
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
                            placeholder="Fecha"
                        />
                    </div>
    
                    <div className="input-container-act">
                        <input
                            type="time"
                            value={actividad.duracion}
                            onChange={(e) => setActividad({ ...actividad, duracion: e.target.value })}
                            required
                            className="input-act"
                            placeholder="Duración"
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
