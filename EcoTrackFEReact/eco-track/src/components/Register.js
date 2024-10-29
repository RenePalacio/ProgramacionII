import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Montserrat:wght@400;600&display=swap'; 
link.rel = 'stylesheet';
document.head.appendChild(link);

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(''); 
    const [showAlert, setShowAlert] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('estilo1');
        return () => {
            document.body.classList.remove('estilo1');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        const newUser = { nombre, email, password };

        try {
            setLoading(true); // Iniciar la carga
            const checkResponse = await axios.post('http://localhost:5000/api/Usuario/check-email', { email });
            if (checkResponse.data.exists) {
                setError('El correo electrónico ya está vinculado a una cuenta.');
                return;
            }

            const response = await axios.post('http://localhost:5000/api/Usuario', newUser);
            console.log('Usuario creado:', response.data);
            setAlertMessage('Usuario creado con éxito.'); 
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                navigate('/'); 
            }, 3000); 
        } catch (error) {
            console.error('Error al registrar el usuario', error.response?.data || error.message);
            setError('Hubo un error en el registro.');
        } finally {
            setLoading(false); 
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
                        className="input-field"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        className="input-field"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="input-field"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Confirmar Contraseña"
                        className="input-field"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="login-button"
                    style={{ width: '95%' }}
                    disabled={loading} 
                >
                    {loading ? 'Registrando...' : 'Registrar'}
                </button>
                {error && <p className="error-message-register">{error}</p>} 
            </form>

            <p className="login-prompt">
                ¿Ya tienes una cuenta? <a href="/">Inicia Sesión</a>
            </p>

            <div className="cloud cloud1"></div>
            <div className="cloud cloud2"></div>
            <div className="cloud cloud3"></div>
            <div className="cloud cloud4"></div>
            <footer className="footer1">
                <span>© 2024 SummerTime Coders. Todos los derechos reservados.</span>
            </footer>

            {showAlert && (
                <div className="custom-alert-overlay-register">
                    <div className="custom-alert-content-register">
                        <p>{alertMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;
