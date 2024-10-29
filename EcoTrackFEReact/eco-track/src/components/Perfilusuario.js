import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Perfilusuario = () => {
  const [view, setView] = useState('profile');
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: localStorage.getItem('nombre') || '',
    email: localStorage.getItem('email') || ''
  });
  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem('selectedAvatar') || null
  );
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const defaultAvatars = [
    'https://i.ibb.co/m4pNnPQ/conejo1.png',
    'https://i.ibb.co/ZKzzkS8/conejo2.png',
    'https://i.ibb.co/yYvjtwX/conejo3.png',
    'https://i.ibb.co/sqf0Q76/conejo4.png',
    'https://i.ibb.co/9ndh3Bw/conejo5.png',
    'https://i.ibb.co/5vJ20hf/conejo6.png',
    'https://i.ibb.co/jz7rHd1/conejo7.png',
    'https://i.ibb.co/QFC8p2J/conejo8.png',
    'https://i.ibb.co/xfwf6SS/conejo9.png'
  ];

  // Función para crear copos de nieve
  const crearCoposDeNieve = (cantidad) => {
    const contenedorNieve = document.querySelector('.snow-container');

    for (let i = 0; i < cantidad; i++) {
      const copoNieve = document.createElement('div');
      copoNieve.className = 'snowflake';
      const size = Math.random() * 5 + 2; 
      copoNieve.style.width = `${size}px`;
      copoNieve.style.height = `${size}px`;
      copoNieve.style.left = `${Math.random() * 100}vw`; 
      copoNieve.style.setProperty('--random', Math.random()); 
      contenedorNieve.appendChild(copoNieve);
    }
  };

  useEffect(() => {
    crearCoposDeNieve(100); 

    return () => {
      const coposNieve = document.querySelectorAll('.snowflake');
      coposNieve.forEach(copo => copo.remove()); 
    };
  }, []);

  useEffect(() => {
    const idUsuario = localStorage.getItem('idUsuario');
    if (!idUsuario) {
      navigate('/Error');
      return;
    }

    const fetchUserName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Usuario/${idUsuario}`);
        setUsuario({
          nombre: response.data.nombre || 'Nombre no disponible',
          email: response.data.email || 'Email no disponible'
        });
      } catch (error) {
        console.error('Error al obtener los datos del usuario', error);
        navigate('/Error');
      }
    };

    fetchUserName();
  }, [navigate]);

  const handleNavigation = (screen) => {
    if (screen === 'ubicacion') {
      navigate('/ubicacion');
    } else {
      setView(screen);
    }
  };

  const handleAvatarChange = (direction) => {
    const newIndex = avatarIndex + direction * 3;
    if (newIndex >= 0 && newIndex < defaultAvatars.length) {
      setAvatarIndex(newIndex);
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    localStorage.setItem('selectedAvatar', avatar);
  };

  const handleSave = async () => {
    const idUsuario = localStorage.getItem('idUsuario');

    // Validaciones para asegurarte de que los campos no estén vacíos
    if (!usuario.nombre.trim() || !usuario.email.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const userData = {
      nombre: usuario.nombre.trim(),
      email: usuario.email.trim(),
    };

    console.log('Datos a enviar:', userData);

    try {
      await axios.put(`http://localhost:5000/api/Usuario/${idUsuario}`, userData);
      localStorage.setItem('nombre', usuario.nombre);
      localStorage.setItem('email', usuario.email);
      setAlertMessage('Usuario editado con éxito.'); 
      setShowAlert(true); 
      setTimeout(() => {
        setShowAlert(false);
        handleNavigation('profile'); 
      }, 3000); 
    } catch (error) {
      console.error('Error al guardar los datos del usuario', error.response?.data || error);
      alert('Error al guardar los datos. Por favor intenta nuevamente.');
    }
  };

  return (
    <div className="profile-page">
      <div className="snow-container"></div>
      {view === 'profile' && (
        <div className="profile-container">
          <div className="profile-info">
            <img src={selectedAvatar || defaultAvatars[0]} alt="Profile" className="profile-pic" />
            <div className="profile-details">
              <h2 className="nombre">{usuario.nombre}</h2>
              <p className="email">{usuario.email}</p>
            </div>
          </div>
          <div className="profile-actions">
            <button className="profile-btn" onClick={() => handleNavigation('ubicacion')}>Ubicación</button>
            <button className="profile-btn" onClick={() => handleNavigation('editProfile')}>Editar Perfil</button>
          </div>
        </div>
      )}

      {view === 'editProfile' && (
        <div className="edit-profile-container">
          <h2>Editar Perfil</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Nombre de usuario:</label>
              <input
                type="text"
                value={usuario.nombre}
                onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                value={usuario.email}
                onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
              />
            </div>
            <div>
              <label>Selecciona un avatar:</label>
              <div className="avatar-selection">
                <button type="button" onClick={() => handleAvatarChange(-1)} className="avatar-button">❮</button>
                <div className="avatar-options">
                  {defaultAvatars.slice(avatarIndex, avatarIndex + 3).map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                      onClick={() => handleAvatarSelect(avatar)}
                    />
                  ))}
                </div>
                <button type="button" onClick={() => handleAvatarChange(1)} className="avatar-button">❯</button>
              </div>
            </div>
            <div className="profile-actions">
              <button type="button" className="profile-btn" onClick={handleSave}>Guardar</button>
              <button type="button" className="profile-btn" onClick={() => handleNavigation('profile')}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {showAlert && (
        <div className="custom-alert-overlay-editprofile">
          <div className="custom-alert-content-editprofile">
            <p>{alertMessage}</p>
          </div>
        </div>
      )}

      <footer className="footerprofile">
        <span>© 2024 SummerTime Coders. Todos los derechos reservados.</span>
        <span>
          <a href="/politicadeuso" style={{ color: 'black', textDecoration: 'none', marginLeft: '10px' }}>
            Políticas de Uso
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Perfilusuario;
