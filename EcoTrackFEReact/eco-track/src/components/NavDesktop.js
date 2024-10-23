import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const NavDesktop = () => {
  const navigate = useNavigate(); // Usa el hook para navegar

  // Manejador de navegación simplificado
  const handleNavigation = (path) => {
    navigate(path); // Redirige a la ruta deseada
  };

  return (
    <nav className="navbar">
      <ul className="navbar__menu">
        <li className="navbar__item">
          <a href="#0" onClick={() => handleNavigation('/home')}>
            <img src="https://i.ibb.co/dWgGY3g/home.png" alt="Home" />
          </a>
        </li>
        <li className="navbar__item">
          <a href="#0" onClick={() => handleNavigation('/crearAct')}>
            <img src="https://i.ibb.co/FVDzvhW/add.png" alt="CrearAct" />
          </a>
        </li>
        <li className="navbar__item">
          <a href="#0" onClick={() => handleNavigation('/perfil')}>
            <img src="https://i.ibb.co/ZdxnPqy/user-skill-gear.png" alt="Perfil" />
          </a>
        </li>
        <li className="navbar__item">
        <a href="#0" onClick={() => handleNavigation('/')}>
            <img src="https://i.ibb.co/M5FZPMv/exit.png" alt="Cerrar Sesion" />
          </a>
        </li>
      </ul>

      {/* CSS interno simplificado */}
      <style >{`
        :root {
          --border-radius: 10px;
          --spacer: 1rem;
          --primary: #000;
          --text: #6a778e;
          --link-height: calc(var(--spacer) * 3.5);
          --timing: 250ms;
          --transition: var(--timing) ease all;
        }


        .navbar {
          position: fixed;
          top: 4rem; /* Ajusta esta distancia para separarla más de la parte superior */
          left: 1rem;
          background: #000;
          border-radius: 10px;
          padding: 3rem 0;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.03);
          height: auto; 
          width: 70px; /* Ajusta el ancho */
          z-index: 1000;
        }

        .navbar__menu {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column; /* Alinea los íconos en columna */
          align-items: center; /* Centra los íconos horizontalmente */
        }

        .navbar__item {
          margin-bottom: 1rem; /* Añade espacio entre los botones */
        }

        .navbar__item a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px; /* Ajusta el tamaño del botón */
          height: 50px;
          color: #000;
          transition: 250ms ease all;
        }

        .navbar__item img {
          width: 24px; /* Ajusta el tamaño de la imagen */
          height: 24px; /* Mantén el aspecto proporcional */
        }

        .navbar__item a:hover {
          color: #fff;
          background-color: #3ebd53;
          border-radius: 50%; /* Haz los botones redondeados */
        }

        /* Ocultar el navbar en pantallas pequeñas */
        @media (max-width: 768px) {
          .navbar {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavDesktop;
