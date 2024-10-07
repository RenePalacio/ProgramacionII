import React, { useState } from 'react';
import './styles.css'; 

const Perfilusuario = () => {
  const [view, setView] = useState('profile');

  const handleNavigation = (screen) => {
      setView(screen); 
  };

  return (
    <div className="profile-page"> {/* Este div envuelve todo y centra */}
      {view === 'profile' && (
        <div className="profile-container">
          <div className="profile-info">
            <img src="https://i.pinimg.com/564x/06/21/15/062115336c044f8164556d28a615678b.jpg" alt="Profile" className="profile-pic" />
            <div className="profile-details">
              <h2 className="username">username</h2>
              <p className="bio">Organiza tu día de manera inteligente con EcoTrack, ajustado a tus necesidades y al clima.</p>
            </div>
          </div>
          <div className="profile-actions">
            <button className="profile-btn" onClick={() => handleNavigation('settings')}>Configuración</button>
            <button className="profile-btn" onClick={() => handleNavigation('location')}>Ubicación</button>
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
              <input type="text" placeholder="usuario" />
            </div>
            <div>
              <label>Biografía:</label>
              <textarea placeholder="Agrega una biografía..."></textarea>
            </div>
            <button type="button" className="profile-btn" onClick={() => handleNavigation('profile')}>Guardar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Perfilusuario;

