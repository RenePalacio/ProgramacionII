import React, { useState } from 'react';
import axios from 'axios';  // Importa axios para hacer la solicitud POST
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para redirecciones
import './styles.css';

// Agregar los estilos de fuente
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Montserrat:wght@400;600&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Definir estado para la actividad
    const [actividad, setActividad] = useState({
        idTipoActividad: '',
        ubicacion: '', 
        fecha: '',
        duracion: '',
        hora: '',
        notas: '',
        color: '#ffffff',
    });

    const navigate = useNavigate();  // Definir navigate para redirección
    const idUsuario = localStorage.getItem('idUsuario') || '1';  // Definir idUsuario desde localStorage

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos requeridos estén presentes
        if (!actividad.idTipoActividad || !actividad.ubicacion || !actividad.fecha || !actividad.hora || !actividad.duracion) {
            console.error('Todos los campos requeridos deben ser llenados.');
            return;
        }

        // Formatear la fecha y hora para enviarlas al backend
        const fechaFormateada = actividad.fecha;  // El input de tipo 'date' ya proporciona la fecha en el formato adecuado
        const horaFormateada = `${actividad.hora}:00`;  // Añadir ':00' para los segundos

        const actividadData = {
            idTipoActividad: Number(actividad.idTipoActividad),  // Asegúrate de que sea un número
            ubicacion: actividad.ubicacion,  // Ubicación ya en formato string
            fecha: fechaFormateada,  // Enviar la fecha en formato 'YYYY-MM-DD'
            duracion: Number(actividad.duracion),  // Convertir duración a número
            hora: horaFormateada,  // Enviar la hora en formato 'HH:mm:ss'
            notas: actividad.notas,
            idUsuario: Number(idUsuario),  // Convertir a número
        };

        try {
            // Enviar la solicitud POST al backend
            const response = await axios.post('http://localhost:5000/api/actividad', actividadData);
            console.log('Actividad creada:', response.data);

            // Guardar el color en localStorage usando el ID de la actividad
            localStorage.setItem(`actividadColor_${response.data.idActividad}`, actividad.color);

            // Reiniciar el formulario después de enviar
            setActividad({
                idTipoActividad: '',
                ubicacion: '',
                fecha: '',
                duracion: '',
                hora: '',
                notas: '',
                color: '#ffffff',
            });

            // Navegar a la página de inicio
            navigate('/home');
        } catch (error) {
            console.error('Datos enviados:', actividadData);
            console.error('Error al crear actividad', error.response?.data || error.message);
            if (error.response?.data?.errors) {
                console.error('Errores de validación:', error.response.data.errors);
            }
        }
    };

    return (
        <div className="login-container">
            <div className="header">
                <img
                    src="https://i.ibb.co/kK9WwPt/Post-instagram-quote-frase-removebg-preview.png"
                    alt="Logo"
                    className="logo"
                />
                <h1 className="title">Registrar Cuenta</h1>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Nombre Completo"
                        className="input-field2"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        className="input-field2"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="input-field2"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Confirmar Contraseña"
                        className="input-field2"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="login-button"
                    style={{ width: '95%' }}
                >
                    Registrar
                </button>
            </form>

            <div className="cloud cloud1"></div>
            <div className="cloud cloud2"></div>
            <div className="cloud cloud3"></div>
            <div className="cloud cloud4"></div>
        </div>
    );
}

export default Register;
