import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importar el hook de navegación
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClipboardList, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import './styles.css'; // Asegúrate de que los estilos estén en este archivo
import MenuDesplegable from './MenuDesplegable'; // Importa el componente del menú

const Perfilusuario = () => {
  const navigate = useNavigate(); // Definir el hook useNavigate para la navegación

  const handleEdit = () => {
    console.log("Editando información del usuario...");
  };

  const handleBack = () => {
    navigate(-1); // Retrocede a la pantalla anterior
  };

  return (
    <div className="container">
      
    </div>
  );
};

export default Perfilusuario;
