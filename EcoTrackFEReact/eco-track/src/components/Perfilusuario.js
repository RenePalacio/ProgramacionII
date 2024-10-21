import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './styles.css';

const Perfilusuario = () => {
  const [view, setView] = useState('profile');
  const navigate = useNavigate(); // Usa el hook para navegar

  // Función para crear copos de nieve
  const crearCoposDeNieve = (cantidad) => {
    const contenedorNieve = document.querySelector('.snow-container');

    for (let i = 0; i < cantidad; i++) {
      const copoNieve = document.createElement('div');
      copoNieve.className = 'snowflake';
      const size = Math.random() * 5 + 2; // Tamaño entre 2px y 7px
      copoNieve.style.width = `${size}px`;
      copoNieve.style.height = `${size}px`;
      copoNieve.style.left = `${Math.random() * 100}vw`; // Posición horizontal aleatoria
      copoNieve.style.setProperty('--random', Math.random()); // Variar la duración de la animación
      contenedorNieve.appendChild(copoNieve);
    }
  };

  useEffect(() => {
    crearCoposDeNieve(100); // Llama a la función para crear copos de nieve

    return () => {
      const coposNieve = document.querySelectorAll('.snowflake');
      coposNieve.forEach(copo => copo.remove()); // Limpiar copos de nieve al salir
    };
  }, []);

  const handleNavigation = (screen) => {
    if (screen === 'ubicacion') {
      navigate('/ubicacion'); // Redirige a la vista de ubicación
    } else {
      setView(screen);
    }
  };

  return (
    <div className="profile-page"> {/* Este div envuelve todo y centra */}
      <div className="snow-container"> {/* Contenedor para los copos de nieve */} 
      </div>
      {view === 'profile' && (
        <div className="profile-container">
          <div className="profile-info">
            <img src="https://i.pinimg.com/564x/06/21/15/062115336c044f8164556d28a615678b.jpg" alt="Profile" className="profile-pic" />
            <div className="profile-details">
              <h2 className="nombre">nombre</h2>
              <p className="email">example@gmail.com</p>
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
          <form>
            <div>
              <label>Nombre de usuario:</label>
              <input type="text" placeholder="nombre" />
            </div>
            <div>
              <label>Biografía:</label>
              <textarea placeholder="Escribe tu biografía aquí"></textarea>
            </div>
            <div>
              <label>Contraseña:</label>
              <input type="password" placeholder="********" />
            </div>
            <div className="profile-actions">
              <button type="button" className="profile-btn" onClick={() => handleNavigation('profile')}>Guardar</button>
              <button type="button" className="profile-btn" onClick={() => handleNavigation('profile')}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <footer className="footer1">
        <span>© SummerTime Coders</span>
      </footer>
    </div>
  );
};

export default Perfilusuario;
