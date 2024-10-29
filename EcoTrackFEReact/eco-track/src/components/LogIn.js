import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom'; 
import './styles.css';

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Montserrat:wght@400;600&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    document.body.classList.add('estilo1');
    return () => {
      document.body.classList.remove('estilo1');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(null); 

    try {
      const response = await axios.post('http://localhost:5000/api/Usuario/login', { email, password });
      const { idUsuario } = response.data; 

      if (idUsuario) { 
        localStorage.setItem('idUsuario', idUsuario); // Guardar idUsuario en localStorage
        
        // Obtener los datos del usuario
        const userResponse = await axios.get(`http://localhost:5000/api/Usuario/${idUsuario}`);
        const userName = userResponse.data.nombre || 'Usuario';
        localStorage.setItem('userName', userName); 

       
        navigate('/home');
      } else {
        setError('No se pudo obtener el ID de usuario.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      setError('Los datos de acceso no son válidos.'); 
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
        <h1 className="title">Iniciar Sesión</h1>
      </div>

      <form className="login-form" onSubmit={handleLogin}>
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
        <button type="submit" className="login-button">Iniciar Sesión</button>
        {error && <p className="error-message-login">{error}</p>} {/* Mensaje de error */}
      </form>

      <div className="register-prompt">
        <p>No tienes cuenta? <Link to="/register" className="register-link">Regístrate</Link></p>
      </div>

      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="cloud cloud4"></div>
      <footer className="footer1">
                    <span>© 2024 SummerTime Coders. Todos los derechos reservados.</span>
                </footer>


    </div>
  );
}

export default LogIn;
