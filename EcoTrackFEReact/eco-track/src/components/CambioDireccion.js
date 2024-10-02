import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const EditarDireccion = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [direccion, setDireccion] = useState(''); // Aquí puedes inicializar con una dirección existente

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Dirección editada: ' + direccion);
    // Aquí podrías agregar lógica para guardar la dirección editada en una base de datos.
    navigate('/Inicio'); // Redirigir a la pantalla 6 después de editar
  };

  return (
    <div className="container">
      <header className="header">
        {/* Cambia a navigate(-1) para regresar a la pantalla anterior */}
        <button className="back-button" onClick={() => navigate(-1)}>Atrás</button> {/* Navegación */}
        <h2>Editar Dirección</h2>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Dirección</label>
          <input 
            type="text" 
            value={direccion} 
            onChange={(e) => setDireccion(e.target.value)} 
            placeholder="Ingrese la nueva dirección"
            required 
          />
        </div>
        <button type="submit" className="save-button">Guardar</button>
      </form>
    </div>
  );
};

export default EditarDireccion;
