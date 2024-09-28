import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const EditarDireccion = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [direccion, setDireccion] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Dirección editada: ' + direccion);
    // lógica para guardar la dirección editada en una base de datos.
    navigate('/Pantalla6'); // Redirigir a la pantalla 6 después de editar
  };

  return (
    <div className="container">
      <header className="header">
        {/* regresar a la pantalla anterior */}
        <button className="back-button" onClick={() => navigate(-1)}>Atrás</button> 
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
