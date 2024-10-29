import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const AgregarDireccion = () => {
  const navigate = useNavigate(); 
  const [direccion, setDireccion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Dirección agregada: ' + direccion);
    
    navigate('/Pantalla6'); 
  };

  return (
    <div className="container">
      <header className="header">
        {/* Cambiar a navigate(-1) para regresar a la pantalla anterior */}
        <button className="back-button" onClick={() => navigate(-1)}>Atrás</button> {/* Navegación */}
        <h2>Agregar Dirección</h2>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Dirección</label>
          <input 
            type="text" 
            value={direccion} 
            onChange={(e) => setDireccion(e.target.value)} 
            placeholder="Ingrese la dirección"
            required 
          />
        </div>
        <button type="submit" className="save-button">Guardar</button>
      </form>
    </div>
  );
};

export default AgregarDireccion;
