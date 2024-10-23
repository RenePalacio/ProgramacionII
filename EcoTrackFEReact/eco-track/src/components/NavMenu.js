import React from 'react'; // Asegúrate de importar useState
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const NavMenu = () => {
  const navigate = useNavigate(); // Usa el hook para navegar

  // Manejador de navegación simplificado
  const handleNavigation = (path) => {
    navigate(path); // Redirige a la ruta deseada
  };

  return (
    <nav className="nav">
      <input id="menu" type="checkbox" />
      <label htmlFor="menu">
        <img src="https://i.ibb.co/m9r4Kdg/apps.png" alt="Menu Icon" />
      </label>
      <ul className="menu">
        <li>
          <a href="#0" onClick={() => handleNavigation('/perfil')}>
            <img src="https://i.ibb.co/ZdxnPqy/user-skill-gear.png" alt="Perfil" />
          </a>
        </li>
        <li>
          <a href="#0" onClick={() => handleNavigation('/home')}>
            <img src="https://i.ibb.co/dWgGY3g/home.png" alt="Home" />
          </a>
        </li>
        <li>
          <a href="#0" onClick={() => handleNavigation('/crearAct')}>
            <img src="https://i.ibb.co/FVDzvhW/add.png" alt="CrearAct" />
          </a>
        </li>
        <li>
          <a href="#0" onClick={() => handleNavigation('/')}>
            <img src="https://i.ibb.co/M5FZPMv/exit.png" alt="Cerrar Sesion" />
          </a>
        </li>
      </ul>

      {/* Estilos CSS internos */}
      <style >{`
        :root {
          --white: #ffffff;
          --violet: #1b221a;
          --dark-violet: #000000;
          --black: #21232a;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .nav {
          position: fixed;
          bottom: 0;
          left: 10;
          width: 100%;
          background: var(--white);
          border-radius: 25px 25px 0 0;
          padding: 10px 20px;
          box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .nav [type="checkbox"] {
          display: none;
        }

        .nav label {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%; /* Hacer el botón circular */
          overflow: hidden; /* Evitar que la imagen sobresalga */
          background: var(--violet); /* Fondo para el botón */
          cursor: pointer;
          transition: background-color 0.3s;
          z-index: 1;
        }

        .nav label:hover {
          background: var(--dark-violet);
        }

        .nav label img {
          width: 24px; /* Ajusta el tamaño de la imagen */
          height: 24px; /* Mantén el aspecto proporcional */
        }

        .menu {
          display: none;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          justify-content: center; /* Centrar los elementos */
          align-items: center;
        }

        .nav [type="checkbox"]:checked ~ .menu {
          display: flex;
        }

        .menu li {
          list-style: none;
          opacity: 0; 
          transition: opacity 0.5s ease, transform 0.5s ease;
          margin: 0 10px; /* Espaciado entre los botones */
        }

        .nav [type="checkbox"]:checked ~ .menu li {
          opacity: 1;
          transform: translateY(0); 
        }

        .menu li a {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--violet);
          border-radius: 50%;
          width: 45px;
          height: 45px;
          text-decoration: none;
          transition: background 0.3s, transform 0.3s;
        }

        .menu li a:hover {
          background: var(--dark-violet);
          transform: scale(1.1); 
        }

        .menu li a img {
          width: 24px;
          height: 24px;
        }

        /* Ajustes de las posiciones de los botones */
        .nav [type="checkbox"]:checked ~ .menu li:nth-child(1) {
          transform: translateX(-50px);
        }

        .nav [type="checkbox"]:checked ~ .menu li:nth-child(2) {
          transform: translateX(-45px);
        }

        .nav [type="checkbox"]:checked ~ .menu li:nth-child(3) {
          transform: translateX(45px);
        }

        .nav [type="checkbox"]:checked ~ .menu li:nth-child(4) {
          transform: translateX(50px);
        }

        @media (min-width: 769px) {
          .nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavMenu;
